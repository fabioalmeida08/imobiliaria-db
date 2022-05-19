export interface ICreateClient {
  name: string
  email: string
  phone_number: string
  intention: string
}

export interface IClient extends ICreateClient {
  id: string
}

export interface IUpdatedClient extends Partial<ICreateClient>{}
