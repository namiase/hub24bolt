import { ILoginRequest, IRecoverPasswordRequest } from '../interfaces/auth';
import { ISingleResponse } from '../interfaces/responses';
import { IUser } from '../interfaces/auth';
import api from './api';

export const authService = {
  async login(request: ILoginRequest): Promise<ISingleResponse<IUser>> {
    try {
      const response = await api.post<ISingleResponse<IUser>>('/auth/login', request);
      return response.data;
    } catch (error: any) {
      return {
        message: 'Error during login',
        didError: true,
        errorMessage: error.response?.data?.message || 'An unexpected error occurred',
        model: null
      };
    }
  },

  async recoverPassword(request: IRecoverPasswordRequest): Promise<ISingleResponse<null>> {
    try {
      const response = await api.post<ISingleResponse<null>>('/auth/recover-password', request);
      return response.data;
    } catch (error: any) {
      return {
        message: 'Error during password recovery',
        didError: true,
        errorMessage: error.response?.data?.message || 'An unexpected error occurred',
        model: null
      };
    }
  },

  async validateToken(): Promise<ISingleResponse<IUser>> {
    try {
      const response = await api.get<ISingleResponse<IUser>>('/auth/validate');
      return response.data;
    } catch (error: any) {
      return {
        message: 'Error validating token',
        didError: true,
        errorMessage: error.response?.data?.message || 'An unexpected error occurred',
        model: null
      };
    }
  }
};