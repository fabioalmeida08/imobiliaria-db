import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  ICreateClient,
  IClient,
  IUpdatedClient,
} from "../../../interfaces/client";
import {
  IAgency,
  IAgencyExtId,
  IAgencyLogin,
  IAgencyToken,
} from "../../../interfaces/agency";
import { IRealtors, IRealtorsExtId } from "../../../interfaces/realtor";
import CreateRealtorService from "../../../services/realtors/createRealtor.service";

beforeAll(async () => {
  await AppDataSource.initialize().catch((err) => console.log(err));
});

afterAll(async () => {
  await AppDataSource.dropDatabase();
  await AppDataSource.destroy().catch((err) => console.log(err));
});
describe("Succes Routes", () => {
  let id: string;

  const client: ICreateClient = {
    name: "choles",
    email: "choles@mail.com",
    phone_number: "1234567890122",
    intention: "comprar",
  };

  // agency

  const agency: IAgency = {
    name: "Gorimar",
    email: "gorimar54@mail.com",
    phone_number: "1234567890122",
    password: "12345678",
  };

  const login: IAgencyLogin = {
    email: "gorimar54@mail.com",
    password: "12345678",
  };

  let agencyId: IAgencyExtId;

  let token: IAgencyToken;

  let realtorCreated: IRealtorsExtId;

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
    token = response.body.accessToken;

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  // create realtor

  it("Should be able to create a new realtor", async () => {
    const realtor: IRealtors = {
      name: "Chris",
      email: "chriseuamomarvael@mail.com",
      phone_number: "1234567890122",
      password: "marvelS2",
      agency_id: agencyId.id,
    };
    const newRealtor = await CreateRealtorService.execute(realtor);

    realtorCreated = newRealtor;
    expect(newRealtor).toHaveProperty("id");
  });

  // create client

  it("Should create a new client", async () => {
    const response = await request(app)
      .post("/clients")
      .auth(`${token}`, { type: "bearer" })
      .send(client);

    id = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("createdAt");
  });

  // list client

  it("Should list clients", async () => {
    const response = await request(app)
      .get("/clients")
      .auth(`${token}`, { type: "bearer" });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    expect(response.body[0]).toHaveProperty("id");
  });

  // show client

  it("Should be able to list a user by id", async () => {
    const response = await request(app)
      .get(`/clients/${id}`)
      .auth(`${token}`, { type: "bearer" });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("choles");
    expect(response.body.email).toBe("choles@mail.com");
  });

  // update client

  it("Should be able to update a user", async () => {
    const updatedClient: IUpdatedClient = {
      name: "Goro",
      email: "goro@mail.com",
    };
    const response = await request(app)
      .patch(`/clients/${id}`)
      .auth(`${token}`, { type: "bearer" })
      .send(updatedClient);

    expect(response.status).toBe(200);
    expect(response.body.id).toEqual(id);
    expect(response.body.name).toBe("Goro");
    expect(response.body.email).toBe("goro@mail.com");
    expect(response.body.intention).toBe("comprar");
  });

  describe("Error cases routes", () => {
    const clientMissingFields: IUpdatedClient = {
      email: "gorimar54@mail.com",
      phone_number: "1234567890122",
    };

    const client: ICreateClient = {
      name: "Gorimar",
      email: "gorimar33@mail.com",
      phone_number: "1234567890122",
      intention: "comprar",
    };

    it("Should not let a register without a field", async () => {
      const response = await request(app)
        .post("/clients")
        .auth(`${token}`, { type: "bearer" })
        .send(clientMissingFields);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
    });

    it("Should not be able to create a client with same email", async () => {
      const response = await request(app)
        .post("/clients")
        .auth(`${token}`, { type: "bearer" })
        .send(client);
      const res2 = await request(app)
        .post("/clients")
        .auth(`${token}`, { type: "bearer" })
        .send(client);

      expect(res2.status).toBe(400);
      expect(res2.body).toContain("Already Exists");
    });
  });
});
