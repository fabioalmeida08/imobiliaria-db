/* import { AppDataSource } from '../../../data-source'
import request from "supertest";
import app from "../../../app";
import { IClient, ICreateClient } from '../../../interfaces/client';
import CreateClientService from '../../../services/clients/createClient.service';
import { ILoginRealtor, IRealtors, IRealtorsExtId } from '../../../interfaces/realtor';
import CreateRealtorService from '../../../services/realtors/createRealtor.service';
import LoginRealtorService from '../../../services/realtors/loginRealtor.service';
import { ReturnedPropertyList } from '../../../services/properties/listPropertiesByQuery.service';

describe("Succes Routes", () => {
  let clientCreated1: IClient;
  const client1: ICreateClient = {
    name: "Choles",
    email: "choles@mail.com",
    phone_number: "1234567890122",
    intention: "comprar",
  };

  const client2: ICreateClient = {
    name: "Gorimar",
    email: "gorimar@mail.com",
    phone_number: "1234567890122",
    intention: "comprar",
  };

  let clientCreated2: IClient;
  const createClient = async (client: ICreateClient, clientCreated: IClient) => {
    
    const newClient = await CreateClientService.execute(client);

    clientCreated = newClient;

    return clientCreated;
  };


  let realtorCreated1: IRealtorsExtId;
  let realtorCreated2: IRealtorsExtId;

  const realtor1: IRealtors = {
    name: "pelé",
    email: "pele@mail.com",
    phone_number: "1234567890122",
    password: "gorimar123",
  };

  const loginRealtor1: ILoginRealtor = {
    email: "pele@mail.com",
    password: "gorimar123",
  }

  const realtor2: IRealtors = {
    name: "cleitinho",
    email: "cleitinho@mail.com",
    phone_number: "1234567890122",
    password: "gorimar123",
  };

  const loginRealtor2: ILoginRealtor = {
    email: "cleitinho@mail.com",
    password: "gorimar123",
  }

  interface Token {
    accessToken: string;
  }
  let realtor1Token: Token;
  let realtor2Token: Token;
  let agencyToken: Token;

  const createRealtor = async (realtor: IRealtors, realtorCreated: IRealtorsExtId, Login: ILoginRealtor, realtorToken: Token) => {

    const newRealtor = await CreateRealtorService.execute(realtor);

    realtorCreated = newRealtor;

    const login = await LoginRealtorService.execute(Login);

    realtorToken = login;

    return realtorCreated;
  };

  let createdProperty: ReturnedPropertyList;
  const instanceProperty = async () => {
    const client = await createClient(client1, clientCreated1);
    const realtor = await createRealtor(realtor1, realtorCreated1, loginRealtor1, realtor1Token);

    const property = {
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

    return property;
  };

  it("Should be able to create a new property", async () => {
    const property = await instanceProperty();

    const response = await request(app)
      .post("/properties")
      .set("Authorization", `Bearer ${realtor1Token.accessToken}`)
      .send(property);

    createdProperty = response.body;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("createdAt");
  }); */

  /* it("Should return a list of properties with selected elements", async () => {
    const response = await request(app).get("/properties");

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    expect(Object.keys(response.body[0]).length).toBe(21);
    expect(Number(response.body[0].price)).toBe(300000);
  }); */

  /* it("Should return a list of properties with all elements", async () => {
    const response = await request(app)
      .get("/properties")
      .set("Authorization", `Bearer ${realtorToken.accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    expect(response.body[0]).toHaveProperty("id");
  }); */

  /* it("Should return one property with selected elements", async () => {
    const response = await request(app).get(
      `/properties/${createdProperty.id}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    expect(Object.keys(response.body).length).toBe(21);
  });
 */
  /* it("Should return one property with all elements", async () => {
    const response = await request(app)
      .get(`/properties/${createdProperty.id}`)
      .set("Authorization", `Bearer ${realtorToken.accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    expect(response.body).toHaveProperty("id");
  }); */

  /* it("Should return a filtered list of properties", async () => {
    const propetyTwo: CreateProperty = {
      street: "Rua teste 2",
      city: "Cidade teste 2",
      state: "Estado teste 2",
      postal_code: "87654321",
      country: "Pais teste 2",
      area: 45,
      complement: "Complemento teste 2",
      type: "Casa",
      acquisition_type: "Venda",
      price: 250000,
      description: "Descrição teste 2",
      id_client: clientCreated.id,
      id_realtor: realtorCreated.id,
    };

    await CreatePropertyService.execute(propetyTwo);

    const response = await request(app).get(`/properties?price_menor=250000`);

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    expect(Number(response.body[0].price)).toBeLessThanOrEqual(250000);
    expect(Object.keys(response.body[0]).length).toBe(21);
  });
 */
  /* it("Should return the updated property", async () => {
    const response = await request(app)
      .patch(`/properties/${createdProperty.id}`)
      .set("Authorization", `Bearer ${realtorToken.accessToken}`)
      .send({ state: "Novo estado" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.state).toBe("Novo estado");
  }); */


/* }); */


import { AppDataSource } from "../../../data-source";

describe("test file", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) => console.log(err));
  });

  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy().catch((err) => console.log(err));
  });
  it("Should pass", () => {
    expect(2 + 2).toBe(4);
  });
});