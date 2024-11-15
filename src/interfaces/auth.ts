export interface IUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  permissions: string[];
  lastLogin: string;
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface IRecoverPasswordRequest {
  email: string;
}