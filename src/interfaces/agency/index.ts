import { IdName } from "../../services/properties/listPropertiesByQuery.service"

export interface IAgency {
    name:string
    email:string
    phone_number:string
    password:string
  }

export interface IAgencyExtId extends IAgency{
  id:string
}

export interface IAgencyLogin {
  email:string
  password:string
}

export interface IAgencyToken{
  accessToken : string
}

export interface IUpdatedAgency extends Partial<IAgency>{}

export interface IReturnAgency extends IAgencyExtId {
  realtors: IdName[]
}