export interface IBaseResponse {
  message: string;
  didError: boolean;
  errorMessage: string;
}

export interface ISingleResponse<T> extends IBaseResponse {
  model: T | null;
}

export interface IListResponse<T> extends IBaseResponse {
  model: T[];
  totalRecords?: number;
  pageSize?: number;
  currentPage?: number;
}