import { DeleteResult } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { IAgency, IAgencyExtId } from "../../../interfaces/agency";
import { IClient, ICreateClient } from "../../../interfaces/client";
import { CreateProperty } from "../../../interfaces/properties";
import { IRealtors, IRealtorsExtId } from "../../../interfaces/realtor";
import CreateAgencyService from "../../../services/agency/createAgency.service";
import CreateClientService from "../../../services/clients/createClient.service";
import CreatePropertyService from "../../../services/properties/createProperty.service";
import DeletePropertyService from "../../../services/properties/deleteProperty.service";
import ListPropertiesService from "../../../services/properties/listProperties.service";
import ListPropertiesByQueryService, {
  ReturnedPropertyList,
} from "../../../services/properties/listPropertiesByQuery.service";
import ShowPropertyService from "../../../services/properties/showProperty.service";
import UpdatePropertyService from "../../../services/properties/updateProperty.service";
import CreateRealtorService from "../../../services/realtors/createRealtor.service";

describe("Properites Services", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) => console.log(err));
  });

  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy().catch((err) => console.log(err));
  });

  const agency: IAgency = {
    name: "nelton",
    email: "nelton@mail.com",
    phone_number: "1234567890122",
    password: "12345678",
  };

  const createAgency = async () => {
    const newAgency = await CreateAgencyService.execute(agency);

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
  const createRealtor = async (realtor: IRealtors) => {
    const newRealtor = await CreateRealtorService.execute(realtor);

    realtorCreated = newRealtor;

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

    return property;
  };

  it("Should be able to create a new property", async () => {
    const property = await instanceProperty();

    const newProperty = await CreatePropertyService.execute(property);

    createdProperty = newProperty;
    expect(newProperty).toHaveProperty("id");
  });

  it("Should return a list of properties with all elements", async () => {
    const properties = await ListPropertiesService.execute(realtorCreated.id);

    expect(properties[0]).toHaveProperty("id");
  });

  it("Should return one property with all elements", async () => {
    const property = await ShowPropertyService.execute(
      createdProperty.id,
      realtorCreated.id
    );

    expect(property).toBeTruthy();

    expect(property).toHaveProperty("id");
  });

  it("Should return the updated property", async () => {
    const updatedProperty = await UpdatePropertyService.execute({
      id: createdProperty.id,
      state: "Novo estado",
    });

    expect(updatedProperty.state).toBe("Novo estado");
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

    const query = { price_menor: 250000 };

    const filteredProperty = await ListPropertiesByQueryService.execute(
      query,
      realtorCreated.id
    );

    expect(filteredProperty[0]).toHaveProperty("id");
    expect(filteredProperty.length).toBe(1);
    expect(Number(filteredProperty[0].price)).toBeLessThanOrEqual(250000);
  });

  it("Should delete one property", async () => {
    const deleteProperty = await DeletePropertyService.execute(
      createdProperty.id
    );

    expect(deleteProperty).toBeInstanceOf(DeleteResult);
  });
});
