import { Agency } from "../../entities/agency.entity";

export interface IRealtors {
  name: string;
  phone_number: string;
  email: string;
  password: string;
  agency_id: string;
}

export interface IRealtorsTwo {
  name: string;
  phone_number: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRealtorsExtId extends IRealtorsTwo {
  id: string;
  agency: Agency;
}

export interface ILoginRealtor {
  email: string;
  password: string;
}

export interface IRealtorToken {
  accessToken: string;
}

export interface IRealtorsId {
  id: string;
}
