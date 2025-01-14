import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { IClient, IClientId, ICreateClient } from "../../../interfaces/client";
import CreateClientService from "../../../services/clients/createClient.service";
import {
  ILoginRealtor,
  IRealtors,
  IRealtorsExtId,
  IRealtorsId,
} from "../../../interfaces/realtor";
import CreateRealtorService from "../../../services/realtors/createRealtor.service";
import LoginRealtorService from "../../../services/realtors/loginRealtor.service";
import { ReturnedPropertyList } from "../../../services/properties/listPropertiesByQuery.service";
import { CreateProperty, testIdProperty } from "../../../interfaces/properties";
import CreatePropertyService from "../../../services/properties/createProperty.service";
import { ICreateSale, ISale } from "../../../interfaces/sales";
import {
  IAgency,
  IAgencyExtId,
  IAgencyLogin,
  IAgencyToken,
} from "../../../interfaces/agency";

describe("Succes Routes", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) => console.log(err));
  });
  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy().catch((err) => console.log(err));
  });

  // client

  let clientCreated1: IClient;
  const client1: ICreateClient = {
    name: "choles",
    email: "choles@mail.com",
    phone_number: "1234567890122",
    intention: "venda",
  };

  const client2: ICreateClient = {
    name: "Gorimar",
    email: "gorimar@mail.com",
    phone_number: "12456789012",
    intention: "comprar",
  };

  let clientCreated2: IClient;

  // create client

  const createClient = async (
    client: ICreateClient,
    clientCreated: IClient
  ) => {
    const newClient = await CreateClientService.execute(client);
    clientCreated = newClient;

    return clientCreated;
  };

  // realtor

  let realtorCreated1: IRealtorsExtId;
  let realtorCreated2: IRealtorsExtId;

  const loginRealtor1: ILoginRealtor = {
    email: "pele@mail.com",
    password: "gorimar123",
  };

  const loginRealtor2: ILoginRealtor = {
    email: "cleitinho@mail.com",
    password: "gorimar123",
  };

  interface Token {
    accessToken: string;
  }
  let realtor1Token: Token;
  let realtor2Token: Token;

  // agency

  const agency: IAgency = {
    name: "nelton",
    email: "nelton@mail.com",
    phone_number: "1234567890122",
    password: "12345678",
  };

  const login: IAgencyLogin = {
    email: "nelton@mail.com",
    password: "12345678",
  };

  let agencyId: IAgencyExtId;

  let agencyToken: IAgencyToken;

  // create and login realtor

  const createRealtor = async (
    realtor: IRealtors,
    realtorCreated: IRealtorsExtId,
    Login: ILoginRealtor,
    realtorToken: Token
  ) => {
    const newRealtor = await CreateRealtorService.execute(realtor);

    realtorCreated = newRealtor;

    const login = await LoginRealtorService.execute(Login);

    realtorToken = login;

    return realtorCreated;
  };

  /// Agency test

  it("Should create a new agency", async () => {
    const response = await request(app).post("/agency").send(agency);
    agencyId = response.body;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("createdAt");
  });

  it("Should login agency", async () => {
    const response = await request(app).post("/agency/login").send(login);
    agencyToken = response.body.accessToken;

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  // create property

  let proprietyTest: testIdProperty;
  let createdProperty: ReturnedPropertyList;
  const instanceProperty = async () => {
    const client = await createClient(client1, clientCreated1);
    const realtor1: IRealtors = {
      name: "pelé",
      email: "pele@mail.com",
      phone_number: "123456789012",
      password: "gorimar123",
      agency_id: agencyId.id,
    };
    const realtor = await createRealtor(
      realtor1,
      realtorCreated1,
      loginRealtor1,
      realtor1Token
    );

    const property: CreateProperty = {
      street: "Rua teste",
      city: "Cidade teste",
      state: "Estado teste",
      postal_code: "12345678",
      country: "Pais teste",
      area: 50.87,
      complement: "Complemento teste",
      type: "Apartamento",
      acquisition_type: "Venda",
      price: 300000,
      description: "Descrição teste",
      id_client: client.id,
      id_realtor: realtor.id,
    };

    const proprieties = await CreatePropertyService.execute(property);

    return proprieties;
  };

  let sales: ICreateSale;
  let createSales: ISale;

  // create sales

  it("Should be able to create a new Sales", async () => {
    const property = await instanceProperty();
    const client = await createClient(client2, clientCreated2);
    const realtor2: IRealtors = {
      name: "cleitinho",
      email: "cleitinho@mail.com",
      phone_number: "123456789012",
      password: "gorimar123",
      agency_id: agencyId.id,
    };
    const realtor = await createRealtor(
      realtor2,
      realtorCreated2,
      loginRealtor2,
      realtor2Token
    );

    sales = {
      selling_value: 300000,
      down_payment: 80000,
      description: "test test test",
      realtors: [realtor.id],
      id_client_buyer: client.id,
      id_property: property.id,
    };

    const response = await request(app)
      .post("/sales")
      .set("Authorization", `Bearer ${agencyToken}`)
      .send(sales);

    createSales = response.body;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("createdAt");
  });

  // list sales

  it("Should return a list of sales with all elements", async () => {
    const response = await request(app)
      .get("/sales")
      .set("Authorization", `Bearer ${agencyToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    expect(response.body[0]).toHaveProperty("id");
    expect(Number(response.body[0].selling_value)).toBe(300000);
  });

  // show sales

  it("Should return a list of sales with selected elements", async () => {
    const response = await request(app)
      .get(`/sales/${createSales.id}`)
      .set("Authorization", `Bearer ${agencyToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    expect(Number(response.body.selling_value)).toBe(300000);
  });

  // update sales

  it("Should return the updated sales", async () => {
    const response = await request(app)
      .patch(`/sales/${createSales.id}`)
      .set("Authorization", `Bearer ${agencyToken}`)
      .send({ description: "Novo test novo test novo test" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.description).toBe("Novo test novo test novo test");
  });
});
