export interface CreateProperty {
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  area: number;
  complement: string;
  type: string;
  acquisition_type: string;
  price: number;
  description: string;
  id_client: string;
  id_realtor: string;
}

export interface UpdateProperty {
  id: string;
  street?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  area?: number;
  complement?: string;
  availability?: boolean;
  type?: string;
  acquisition_type?: string;
  price?: number;
  bathroom_number?: number;
  bedroom_number?: number;
  parking_spaces?: number;
  elevator?: number;
  party_hall?: boolean;
  party_area?: boolean;
  gtill?: boolean;
  swimming_pool?: boolean;
  gym?: boolean;
  playground?: boolean;
  sports_court?: boolean;
  description?: string;
  id_client?: string;
  id_realtor?: string;
}

export interface testIdProperty {
  id: string;
}