export interface ICreateSale {
  selling_value: number
  down_payment: number
  description: string
  realtors: string[]
  id_client_buyer: string
  id_property: string
}

export interface ISale extends ICreateSale {
  property: string
}

export interface ISalesExtId {
  id: string
}