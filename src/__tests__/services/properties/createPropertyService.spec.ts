import { DeleteResult } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Property } from "../../../entities/property.entity";
import AppError from "../../../errors/appError";
import { IClient, ICreateClient } from "../../../interfaces/client";
import { CreateProperty } from "../../../interfaces/properties";
import { IRealtors, IRealtorsExtId } from "../../../interfaces/realtor";
import CreateClientService from "../../../services/clients/createClient.service";
import CreatePropertyService from "../../../services/properties/createProperty.service";
import DeletePropertyService from "../../../services/properties/deleteProperty.service";
import ListPropertiesService from "../../../services/properties/listProperties.service";
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
  const createRealtor = async () => {
    const realtor: IRealtors = {
      name: "Gorimar",
      email: "gorimar@mail.com",
      phone_number: "1234567890122",
      password: "gorimar123",
    };

    const newRealtor = await CreateRealtorService.execute(realtor);

    realtorCreated = newRealtor;

    return realtorCreated;
  };

  let createdProperty: Property;
  const instanceProperty = async () => {
    const client = await createClient();
    const realtor = await createRealtor();

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

  it("Should return a list of properties with selected elements", async () => {
    const properties = await ListPropertiesService.execute(undefined);

    expect(Object.keys(properties[0]).length).toBe(9);
  });

  it("Should return a list of properties with all elements", async () => {
    const properties = await ListPropertiesService.execute(realtorCreated.id);

    expect(properties[0]).toHaveProperty("id");
  });

  it("Should return one property with selected elements", async () => {
    const property = await ShowPropertyService.execute(
      createdProperty.id,
      undefined
    );
    expect(property).toBeTruthy();
    if (property) {
      expect(Object.keys(property).length).toBe(9);
    }
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

  it("Should delete one property", async () => {
    const deleteProperty = await DeletePropertyService.execute(
      createdProperty.id
    );

    expect(deleteProperty).toBeInstanceOf(DeleteResult);
  });
});
