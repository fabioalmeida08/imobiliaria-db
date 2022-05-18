export interface ICreateSale {
  selling_value: number;
  down_payment: number;
  description: string;
  realtors: string[];
  client_buyer: string;
  property: string;
}
