export interface IAgency {
    name:string
    email:string
    phone_number:string
    password:string
  }

export interface IAgencyExtId extends IAgency{
  id:string
}