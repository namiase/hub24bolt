import { IBusinessUnit, IBusinessUnitFilter, IBusinessUnitType, IBusinessUnitStatus } from '../interfaces/businessUnit';
import { IListResponse, ISingleResponse } from '../interfaces/responses';
import api from './api';

// Mock data
const mockBusinessUnits: IBusinessUnit[] = [
  {
    code: 'BU001',
    name: 'Northeast Operations',
    phone: '+1 (555) 123-4567',
    email: 'northeast@example.com',
    contractCount: 15,
    type: 'regional',
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    code: 'BU002',
    name: 'West Coast Division',
    phone: '+1 (555) 987-6543',
    email: 'westcoast@example.com',
    contractCount: 23,
    type: 'regional',
    status: 'active',
    createdAt: '2024-02-01T09:30:00Z'
  },
  {
    code: 'BU003',
    name: 'Central Hub',
    phone: '+1 (555) 456-7890',
    email: 'central@example.com',
    contractCount: 18,
    type: 'hub',
    status: 'active',
    createdAt: '2024-02-15T14:20:00Z'
  },
  {
    code: 'BU004',
    name: 'International Division',
    phone: '+1 (555) 789-0123',
    email: 'international@example.com',
    contractCount: 31,
    type: 'international',
    status: 'active',
    createdAt: '2024-03-01T11:45:00Z'
  },
  {
    code: 'BU005',
    name: 'Express Services',
    phone: '+1 (555) 234-5678',
    email: 'express@example.com',
    contractCount: 12,
    type: 'service',
    status: 'inactive',
    createdAt: '2024-03-10T16:15:00Z'
  }
];

const mockTypes: IBusinessUnitType[] = [
  { id: 'regional', name: 'Regional Office' },
  { id: 'hub', name: 'Distribution Hub' },
  { id: 'international', name: 'International Division' },
  { id: 'service', name: 'Service Center' }
];

const mockStatuses: IBusinessUnitStatus[] = [
  { id: 'active', name: 'Active' },
  { id: 'inactive', name: 'Inactive' },
  { id: 'pending', name: 'Pending Approval' }
];

export const businessUnitService = {
  async searchBusinessUnitAll(filter: IBusinessUnitFilter): Promise<IListResponse<IBusinessUnit>> {
    // Commented API call
    // try {
    //   const response = await api.post<IListResponse<IBusinessUnit>>('/business-units/search', filter);
    //   return response.data;
    // } catch (error: any) {
    //   return {
    //     message: 'Error fetching business units',
    //     didError: true,
    //     errorMessage: error.response?.data?.message || 'An unexpected error occurred',
    //     model: []
    //   };
    // }

    // Mock implementation
    let filteredUnits = [...mockBusinessUnits];

    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      filteredUnits = filteredUnits.filter(unit =>
        unit.name.toLowerCase().includes(searchLower) ||
        unit.code.toLowerCase().includes(searchLower) ||
        unit.email.toLowerCase().includes(searchLower)
      );
    }

    if (filter.type) {
      filteredUnits = filteredUnits.filter(unit => unit.type === filter.type);
    }

    if (filter.status) {
      filteredUnits = filteredUnits.filter(unit => unit.status === filter.status);
    }

    const start = (filter.page - 1) * filter.pageSize;
    const paginatedUnits = filteredUnits.slice(start, start + filter.pageSize);

    return {
      message: 'Business units retrieved successfully',
      didError: false,
      errorMessage: '',
      model: paginatedUnits,
      totalRecords: filteredUnits.length,
      pageSize: filter.pageSize,
      currentPage: filter.page
    };
  },

  async getBusinessUnitTypes(): Promise<IListResponse<IBusinessUnitType>> {
    // Commented API call
    // try {
    //   const response = await api.get<IListResponse<IBusinessUnitType>>('/business-units/types');
    //   return response.data;
    // } catch (error: any) {
    //   return {
    //     message: 'Error fetching business unit types',
    //     didError: true,
    //     errorMessage: error.response?.data?.message || 'An unexpected error occurred',
    //     model: []
    //   };
    // }

    // Mock implementation
    return {
      message: 'Business unit types retrieved successfully',
      didError: false,
      errorMessage: '',
      model: mockTypes
    };
  },

  async getBusinessUnitStatuses(): Promise<IListResponse<IBusinessUnitStatus>> {
    // Commented API call
    // try {
    //   const response = await api.get<IListResponse<IBusinessUnitStatus>>('/business-units/statuses');
    //   return response.data;
    // } catch (error: any) {
    //   return {
    //     message: 'Error fetching business unit statuses',
    //     didError: true,
    //     errorMessage: error.response?.data?.message || 'An unexpected error occurred',
    //     model: []
    //   };
    // }

    // Mock implementation
    return {
      message: 'Business unit statuses retrieved successfully',
      didError: false,
      errorMessage: '',
      model: mockStatuses
    };
  },

  async createBusinessUnit(businessUnit: Partial<IBusinessUnit>): Promise<ISingleResponse<IBusinessUnit>> {
    // Commented API call
    // try {
    //   const response = await api.post<ISingleResponse<IBusinessUnit>>('/business-units', businessUnit);
    //   return response.data;
    // } catch (error: any) {
    //   return {
    //     message: 'Error creating business unit',
    //     didError: true,
    //     errorMessage: error.response?.data?.message || 'An unexpected error occurred',
    //     model: null
    //   };
    // }

    // Mock implementation
    const newBusinessUnit: IBusinessUnit = {
      ...businessUnit,
      code: `BU${String(mockBusinessUnits.length + 1).padStart(3, '0')}`,
      contractCount: 0,
      createdAt: new Date().toISOString()
    } as IBusinessUnit;

    mockBusinessUnits.push(newBusinessUnit);

    return {
      message: 'Business unit created successfully',
      didError: false,
      errorMessage: '',
      model: newBusinessUnit
    };
  },

  async deleteBusinessUnit(code: string): Promise<ISingleResponse<null>> {
    // Commented API call
    // try {
    //   const response = await api.delete<ISingleResponse<null>>(`/business-units/${code}`);
    //   return response.data;
    // } catch (error: any) {
    //   return {
    //     message: 'Error deleting business unit',
    //     didError: true,
    //     errorMessage: error.response?.data?.message || 'An unexpected error occurred',
    //     model: null
    //   };
    // }

    // Mock implementation
    const index = mockBusinessUnits.findIndex(unit => unit.code === code);
    if (index !== -1) {
      mockBusinessUnits.splice(index, 1);
    }

    return {
      message: 'Business unit deleted successfully',
      didError: false,
      errorMessage: '',
      model: null
    };
  }
};