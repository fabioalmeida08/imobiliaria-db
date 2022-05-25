import request from "supertest";
import { DeleteResult } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import { IAgency, IAgencyExtId, IAgencyLogin, IAgencyToken } from "../../../interfaces/agency";
import { ICreateRealtorPassword, ILoginRealtor, IRealtors, IRealtorsExtId } from "../../../interfaces/realtor";
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

  const agency: IAgency = {
    name: "Gorimar",
    email: "gorimar54@mail.com",
    phone_number: "1234567890122",
    password: "12345678"
  };

  const login: IAgencyLogin ={
      email: "gorimar54@mail.com",
      password: "12345678"
  }
  
  let agencyId: IAgencyExtId;

  let token: IAgencyToken;
  
  
  // realtor
  const realtor: IRealtors = {
    name: "Chris",
    email: "chriseuamomarvael@mail.com",
    phone_number: "1234567890122",
    password: "marvelS2",
  };
  const updatedRealtor: IRealtors = {
    name: "Samu",
    email: "chriseuamomarvael@mail.com",
    phone_number: "1234567890122",
    password: "marvelS2",
  };
  let realtorCreated: ICreateRealtorPassword;

  
  /// Agency test 
  
  it("Should create a new agency", async () => {
    const response = await request(app).post("/agency").send(agency);

    id = response.body.id;
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("createdAt");
  });
  
  it("Should login agency", async () => {
    const response = await request(app).post("/agency/login").send(login);
    token = response.body.accessToken
    agencyId = response.body.id
    
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  })

  /// create realtor 

  it("Should be able to create a new realtor", async () => {
    const newRealtor = await CreateRealtorService.execute(realtor);

    realtorCreated = newRealtor;
    expect(newRealtor).toHaveProperty("id");
  });

  /// Realtor test create
  it("Should be able to list a realtor", async () => {
    const responseRealtor = await request(app).get("/realtor").set("Authorization", `Bearer ${token}`);

    expect(responseRealtor.status).toBe(200)
    expect(responseRealtor.body).toHaveLength(1);
  });

  it("Should be able to update a realtor", async () => {
    const response = await request(app).patch(`/realtor/${realtorCreated.id}`).send(updatedRealtor).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200)
    expect(response.body.name).toBe("Samu");
  });

  it("Should be able to delete a realtor", async () => {
    const response = await request(app).delete(`/realtor/${realtorCreated.id}`).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204)
  });
})
