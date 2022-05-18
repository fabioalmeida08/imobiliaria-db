import { AppDataSource } from "../../../data-source";
import {
  ILoginRealtor,
  IRealtors,
  IRealtorsExtId,
  IRealtorToken,
} from "../../../interfaces/realtor";
import CreateRealtorService from "../../../services/realtors/createRealtor.service";
import ListOneRealtorService from "../../../services/realtors/listOneRealtor.service";
import ListRealtorService from "../../../services/realtors/listRealtor.service";
import LoginRealtorService from "../../../services/realtors/loginRealtor.service";

beforeAll(async () => {
  await AppDataSource.initialize().catch((err) => console.log(err));
});
afterAll(async () => {
  await AppDataSource.destroy().catch((err) => console.log(err));
});
describe("Realtors Services", () => {
  const realtor: IRealtors = {
    name: "Gorimar",
    email: "gorimar@mail.com",
    phone_number: "1234567890122",
    password: "gorimar123",
  };
  const loginrealtor: ILoginRealtor = {
    email: "gorimar@mail.com",
    password: "gorimar123",
  };
  let token: IRealtorToken;
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
  it("Should to login realtor", async () => {
    const logRealtor = await LoginRealtorService.execute(loginrealtor);

    token = logRealtor
    expect(token).toHaveProperty("accessToken");
  });
});
