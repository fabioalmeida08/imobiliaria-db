import { AppDataSource } from "../../../data-source";
import { IAgency, IAgencyExtId, IAgencyLogin, IAgencyToken, IUpdatedAgency } from "../../../interfaces/agency";
import request from "supertest";
import app from "../../../app";

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

    // create agency
    
    it("Should create a new agency", async () => {
      const response = await request(app).post("/agency").send(agency);
  
      id = response.body.id;
  
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("createdAt");
    });

    // login agency
  
    it("Should login agency", async () => {
      const response = await request(app).post("/agency/login").send(login);
      token = response.body.accessToken
      agencyId = response.body.id

      expect(response.status).toBe(200);
      expect(response.body).toBeTruthy();
    });

    // list agency

    it("Should list agency", async () => {
        const response = await request(app).get("/agency").set("Authorization", `Bearer ${token}`);
    
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });

    // update agency
  
    it("Should be able to update a user", async () => {
      const updatedagency: IUpdatedAgency = {
        name: "Goro",
        email: "goro@mail.com",
      };
      const response = await request(app)
        .patch(`/agency/${agencyId}`)
        .send(updatedagency)
        .set("Authorization", `Bearer ${token}`)
  
      expect(response.status).toBe(200);
      expect(response.body.id).toEqual(id);
      expect(response.body.name).toBe("Goro");
      expect(response.body.email).toBe("goro@mail.com");
    });
  
  });