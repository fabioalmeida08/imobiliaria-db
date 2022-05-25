import { AppDataSource } from "../../../data-source";
import request from "supertest";
import { IClient, ICreateClient } from "../../../interfaces/client";
import { CreateProperty } from "../../../interfaces/properties";
import { IRealtors, IRealtorsExtId } from "../../../interfaces/realtor";
import CreateClientService from "../../../services/clients/createClient.service";
import CreateRealtorService from "../../../services/realtors/createRealtor.service";
import app from "../../../app";
import LoginRealtorService from "../../../services/realtors/loginRealtor.service";
import CreatePropertyService from "../../../services/properties/createProperty.service";
import CreateAgencyService from "../../../services/agency/createAgency.service";
import LoginAgencyService from "../../../services/agency/agencyLogin.service";
import { ReturnedPropertyList } from "../../../services/properties/listPropertiesByQuery.service";
import { IAgency, IAgencyExtId } from "../../../interfaces/agency";

beforeAll(async () => {
  await AppDataSource.initialize().catch((err) => console.log(err));
});

afterAll(async () => {
  await AppDataSource.dropDatabase();
  await AppDataSource.destroy().catch((err) => console.log(err));
});

describe("Succes Routes", () => {
  let agencyId: IAgencyExtId;
  const agency: IAgency = {
    name: "nelton",
    email: "nelton@mail.com",
    phone_number: "1234567890122",
    password: "12345678",
  };

  const createAgency = async () => {
    const newAgency = await CreateAgencyService.execute(agency);

    agencyId = newAgency;

    return newAgency;
  };

  let clientCreated: IClient;
  const createClient = async () => {
    const client: ICreateClient = {
      name: "Gorimar",
      email: "gorimar@mail.com",
      phone_number: "1234567890122",
      intention: "comprar",
    };

    const newClient = await CreateClientService.execute(client);

    clientCreated = newClient;

    return clientCreated;
  };

  let realtorCreated: IRealtorsExtId;
  interface Token {
    accessToken: string;
  }
  let realtorToken: Token;
  const createRealtor = async (realtor: IRealtors) => {
    const newRealtor = await CreateRealtorService.execute(realtor);

    realtorCreated = newRealtor;

    const login = await LoginRealtorService.execute({
      email: "gorimar@mail.com",
      password: "gorimar123",
    });

    realtorToken = login;

    return realtorCreated;
  };

  let createdProperty: ReturnedPropertyList;
  const instanceProperty = async () => {
    const agency = await createAgency();
    const client = await createClient();
    const realtorValues: IRealtors = {
      name: "Gorimar",
      email: "gorimar@mail.com",
      phone_number: "1234567890122",
      password: "gorimar123",
      agency_id: agency.id,
    };
    const realtor = await createRealtor(realtorValues);

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
      .set("Authorization", `Bearer ${realtorToken.accessToken}`)
      .send(property);

    createdProperty = response.body;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("createdAt");
  });

  it("Should return a list of properties with selected elements", async () => {
    const response = await request(app).get("/properties");

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    expect(Object.keys(response.body[0]).length).toBe(21);
    expect(Number(response.body[0].price)).toBe(300000);
  });

  it("Should return a list of properties with all elements", async () => {
    const response = await request(app)
      .get("/properties")
      .set("Authorization", `Bearer ${realtorToken.accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    expect(response.body[0]).toHaveProperty("id");
  });

  it("Should return one property with selected elements", async () => {
    const response = await request(app).get(
      `/properties/${createdProperty.id}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    expect(Object.keys(response.body).length).toBe(21);
  });

  it("Should return one property with all elements", async () => {
    const response = await request(app)
      .get(`/properties/${createdProperty.id}`)
      .set("Authorization", `Bearer ${realtorToken.accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    expect(response.body).toHaveProperty("id");
  });

  it("Should return a filtered list of properties", async () => {
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

  it("Should return the updated property", async () => {
    const response = await request(app)
      .patch(`/properties/${createdProperty.id}`)
      .set("Authorization", `Bearer ${realtorToken.accessToken}`)
      .send({ state: "Novo estado" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.state).toBe("Novo estado");
  });

  it("Should delete one property", async () => {
    const loginAgency = await LoginAgencyService.execute({
      email: "nelton@mail.com",
      password: "12345678",
    });

    const response = await request(app)
      .delete(`/properties/${createdProperty.id}`)
      .set("Authorization", `Bearer ${loginAgency.accessToken}`);

    expect(response.status).toBe(204);
  });

  describe("Erros cases routes", () => {
    let newCreatedProperty: ReturnedPropertyList;
    const propertyThree = {
      street: "Rua teste 3",
      city: "Cidade teste 3",
      state: "Estado teste 3",
      postal_code: "12345678",
      country: "Pais teste 3",
      area: 66,
      complement: "Complemento teste 3",
      type: "Apartamento",
      acquisition_type: "Venda 3",
      price: 400000,
      description: "Descrição teste 3",
    };

    let newRealtorToken: Token;

    it("Should not create without a field", async () => {
      const response = await request(app)
        .post("/properties")
        .set("Authorization", `Bearer ${realtorToken.accessToken}`)
        .send(propertyThree);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
    });

    it("Should not create without authorization", async () => {
      const response = await request(app)
        .post("/properties")
        .send({ ...propertyThree, id_client: clientCreated.id });

      expect(response.status).toBe(401);
      expect(response.body).toContain("Missing authorization token");
    });

    it("Should not update without authorization", async () => {
      const loginAgency = await LoginAgencyService.execute({
        email: "nelton@mail.com",
        password: "12345678",
      });

      const newRealtor: IRealtors = {
        name: "Goleiro Cassio",
        email: "cassiooo@mail.com",
        phone_number: "1234567890122",
        password: "casiooo123",
        agency_id: loginAgency.id,
      };
      const createNewRealtor = await CreateRealtorService.execute(newRealtor);

      const newLogin = await LoginRealtorService.execute({
        email: "cassiooo@mail.com",
        password: "casiooo123",
      });
      newRealtorToken = newLogin;

      const newProperty = await CreatePropertyService.execute({
        ...propertyThree,
        id_client: clientCreated.id,
        id_realtor: createNewRealtor.id,
      });
      newCreatedProperty = newProperty;

      const response = await request(app)
        .patch(`/properties/${newProperty.id}`)
        .send({ city: "Nova cidade" });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Missing authorization token");
    });

    it("Should not update without the correct authorization", async () => {
      const response = await request(app)
        .patch(`/properties/${newCreatedProperty.id}`)
        .set("Authorization", `Bearer ${realtorToken.accessToken}`)
        .send({ city: "Nova Cidade" });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe(
        "Only the responsible realtor can access this feature"
      );
    });

    it("Should not delete without authorization", async () => {
      const response = await request(app).delete(
        `/properties/${newCreatedProperty.id}`
      );

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Missing authorization token");
    });

    it("Should not delete without the correct authorization", async () => {
      const response = await request(app)
        .delete(`/properties/${newCreatedProperty.id}`)
        .set("Authorization", `Bearer ${newRealtorToken.accessToken}`);

      expect(response.status).toBe(401);
      expect(response.body.message).toBe(
        "Only the admin can access this feature"
      );
    });
  });
});
