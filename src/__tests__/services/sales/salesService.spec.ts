import { AppDataSource } from "../../../data-source";
import CreateSaleService from "../../../services/sales/createSale.service";
import { ICreateSale, ISalesExtId } from "../../../interfaces/sales";
import CreateClientService from "../../../services/clients/createClient.service";
import { IClient, ICreateClient } from "../../../interfaces/client";
import CreateRealtorService from "../../../services/realtors/createRealtor.service";
import { IRealtors, IRealtorsExtId } from "../../../interfaces/realtor";
import { Property } from "../../../entities/property.entity";
import { CreateProperty } from "../../../interfaces/properties";
import CreatePropertyService from "../../../services/properties/createProperty.service";
import ListSalesService from "../../../services/sales/listSales.service";
import ShowSaleService from "../../../services/sales/showSale.service";
import {
  IAgency,
  IAgencyExtId,
  IAgencyLogin,
  IAgencyToken,
} from "../../../interfaces/agency";
import request from "supertest";
import app from "../../../app";
import CreateAgencyService from "../../../services/agency/createAgency.service";
import LoginAgencyService from "../../../services/agency/agencyLogin.service";
import { Realtor } from "../../../entities/realtor.entity";

describe("Sales Services", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) => console.log(err));
  });
  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy().catch((err) => console.log(err));
  });

  let sales: ICreateSale;
  let salesCreated: ISalesExtId;

  const client1: ICreateClient = {
    name: "choles",
    email: "choles@mail.com",
    phone_number: "1234567890122",
    intention: "venda",
  };

  const client2: ICreateClient = {
    name: "gorimar",
    email: "gorimar@mail.com",
    phone_number: "1234567890122",
    intention: "comprar",
  };

  const agency: IAgency = {
    name: "nelton",
    email: "nelton@mail.com",
    phone_number: "1234567890122",
    password: "12345678",
  };

  let agencyId: IAgencyExtId;

  const createAgency = async () => {
    const newAgency = await CreateAgencyService.execute(agency);

    agencyId = newAgency;
    return agencyId;
  };

  let clientCreated: IClient;
  const createClient = async (client: ICreateClient) => {
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

  const instanceProperty = async () => {
    const agency = await createAgency();
    const client = await createClient(client1);
    const realtor1: IRealtors = {
      name: "vitoria",
      email: "vitoria@mail.com",
      phone_number: "1234567890122",
      password: "vitoria123",
      agency_id: agency.id,
    };
    const realtor = await createRealtor(realtor1);

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

  it("Should be able to create a new Sales", async () => {
    const property = await instanceProperty();

    const client = await createClient(client2);
    const realtor2: IRealtors = {
      name: "cleitinho",
      email: "cleitinho@mail.com",
      phone_number: "1234567890122",
      password: "cleitinho123",
      agency_id: agencyId.id,
    };
    const realtor = await createRealtor(realtor2);

    const newProperty = await CreatePropertyService.execute(property);

    sales = {
      selling_value: 200000,
      down_payment: 60000,
      description: "aaahhhaaahhhaaa hahhah ahahahah ahahhahaa",
      realtors: [realtor.id],
      id_client_buyer: client.id,
      id_property: newProperty.id,
    };

    const newSales = await CreateSaleService.execute(sales);

    salesCreated = newSales;
    expect(newSales).toHaveProperty("id");
  });

  it("Should return a list of Sales", async () => {
    const allSales = await ListSalesService.execute();

    expect(allSales).toHaveLength(1);
  });

  it("Should return a list of Sales", async () => {
    const showSales = await ShowSaleService.execute(salesCreated.id);

    expect(showSales).toHaveProperty("id");
  });
});
