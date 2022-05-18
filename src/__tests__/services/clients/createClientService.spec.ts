import { AppDataSource } from "../../../data-source";
import CreateClientService from "../../../services/clients/createClient.service";
import ListAllClients from "../../../services/clients/listAllClient.service";
import ListClient from "../../../services/clients/listClient.service";
import { ICreateClient, IClient } from "../../../interfaces/client";

describe("Client Services", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) => console.log(err));
  });
  afterAll(async () => {
    await AppDataSource.destroy().catch((err) => console.log(err));
  });
  const client: ICreateClient = {
    name: "Gorimar",
    email: "gorimar@mail.com",
    phone_number: "1234567890122",
    intention: "comprar",
  };

  let clientCreated: IClient;

  it("Should be able to create a new client", async () => {
    const newClient = await CreateClientService.execute(client);

    clientCreated = newClient;
    expect(newClient).toHaveProperty("id");
  });

  it("Should return a list of clients", async () => {
    const allClients = await ListAllClients.execute();

    expect(allClients).toHaveLength(1);
  });

  it("Should return a client by id", async () => {
    const client = await ListClient.execute(clientCreated.id);
    expect(client).toBeDefined();
    expect(client).toHaveProperty("id");
  });
});
