export interface IRealtors {
  name: string;
  phone_number: string;
  email: string;
  password: string;
}

export interface IRealtorsExtId extends IRealtors {
  id: string;
}

export interface ILoginRealtor {
  email: string;
  password: string;
}

export interface IRealtorToken{
  accessToken : string
}

export interface IRealtorsId {
  id: string;
}

export interface ICreateRealtorPassword {
  name: string;
  phone_number: string;
  email: string;
  password?: string;
  id : string
}