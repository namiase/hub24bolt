export interface ICustomer {
  id: string;
  identifier: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  country: string;
  state: string;
  address: string;
  contracts: IContract[];
  createdAt: string;
  status: 'active' | 'inactive';
}

export interface IContract {
  id: string;
  contractNumber: string;
  serviceType: 'cash' | 'cod' | 'credit';
  createdAt: string;
  status: 'active' | 'inactive';
}

export interface ICountry {
  id: string;
  name: string;
  states: IState[];
}

export interface IState {
  id: string;
  name: string;
  countryId: string;
}