import { AppDataSource } from "../../../data-source";
import { describe, beforeAll, afterAll, it, expect } from "@jest/globals";
import { IRealtors, IRealtorsExtId } from "../../../interfaces/realtor";
import CreateRealtorService from "../../../services/realtors/createRealtor.service";
import ListOneRealtorService from "../../../services/realtors/listOneRealtor.service";
import ListRealtorService from "../../../services/realtors/listRealtor.service";

describe("Realtors Services", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) => console.log(err));
  });
  afterAll(async () => {
    await AppDataSource.destroy().catch((err) => console.log(err));
  });
  const realtor: IRealtors = {
    name: "Gorimar",
    email: "gorimar@mail.com",
    phone_number: "1234567890122",
    password: "gorimar123",
  };

  let realtorCreated: IRealtorsExtId;

  it("Should be able to create a new realtor", async () => {
    const newRealtor = await CreateRealtorService.execute(realtor);

    realtorCreated = newRealtor;
    expect(newRealtor).toHaveProperty("id");
  });

  it("Should return a list of realtors", async () => {
    const allRealtors = await ListRealtorService.execute();

    expect(allRealtors).toHaveLength(1);
  });

  it("Should return a client by id", async () => {
    const realtor = await ListOneRealtorService.execute(realtorCreated.id);
    expect(realtor).toBeDefined();
    expect(realtor).toHaveProperty("id");
  });
});
