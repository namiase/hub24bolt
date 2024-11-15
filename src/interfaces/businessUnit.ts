export interface IBusinessUnit {
  code: string;
  name: string;
  phone: string;
  email: string;
  contractCount: number;
  type: string;
  status: string;
  createdAt: string;
}

export interface IBusinessUnitFilter {
  search?: string;
  type?: string;
  code?: string;
  name?: string;
  status?: string;
  createdAtFrom?: string;
  createdAtTo?: string;
  page: number;
  pageSize: number;
}

export interface IBusinessUnitType {
  id: string;
  name: string;
}

export interface IBusinessUnitStatus {
  id: string;
  name: string;
}