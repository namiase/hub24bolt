import { ICustomer, IContract, ICountry } from '../interfaces/customer';
import { IListResponse, ISingleResponse } from '../interfaces/responses';

// Mock data
const mockCountries: ICountry[] = [
  {
    id: 'US',
    name: 'United States',
    states: [
      { id: 'NY', name: 'New York', countryId: 'US' },
      { id: 'CA', name: 'California', countryId: 'US' },
      { id: 'TX', name: 'Texas', countryId: 'US' },
    ]
  },
  {
    id: 'CA',
    name: 'Canada',
    states: [
      { id: 'ON', name: 'Ontario', countryId: 'CA' },
      { id: 'BC', name: 'British Columbia', countryId: 'CA' },
      { id: 'QC', name: 'Quebec', countryId: 'CA' },
    ]
  }
];

const mockCustomers: ICustomer[] = [
  {
    id: '1',
    identifier: 'CUST001',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1 (555) 123-4567',
    email: 'john.doe@example.com',
    country: 'US',
    state: 'NY',
    address: '123 Main St, New York, NY 10001',
    contracts: [
      {
        id: '1',
        contractNumber: 'CNT001',
        serviceType: 'credit',
        createdAt: '2024-01-15T10:00:00Z',
        status: 'active'
      }
    ],
    createdAt: '2024-01-15T10:00:00Z',
    status: 'active'
  },
  {
    id: '2',
    identifier: 'CUST002',
    firstName: 'Jane',
    lastName: 'Smith',
    phone: '+1 (555) 987-6543',
    email: 'jane.smith@example.com',
    country: 'US',
    state: 'CA',
    address: '456 Oak Ave, Los Angeles, CA 90001',
    contracts: [
      {
        id: '2',
        contractNumber: 'CNT002',
        serviceType: 'cash',
        createdAt: '2024-02-01T09:30:00Z',
        status: 'active'
      }
    ],
    createdAt: '2024-02-01T09:30:00Z',
    status: 'active'
  }
];

export const customerService = {
  async getCustomers(): Promise<IListResponse<ICustomer>> {
    // Mock implementation
    return {
      message: 'Customers retrieved successfully',
      didError: false,
      errorMessage: '',
      model: mockCustomers
    };
  },

  async getCustomer(id: string): Promise<ISingleResponse<ICustomer>> {
    const customer = mockCustomers.find(c => c.id === id);
    return {
      message: customer ? 'Customer retrieved successfully' : 'Customer not found',
      didError: !customer,
      errorMessage: customer ? '' : 'Customer not found',
      model: customer || null
    };
  },

  async createCustomer(customer: Partial<ICustomer>): Promise<ISingleResponse<ICustomer>> {
    const newCustomer: ICustomer = {
      ...customer,
      id: String(mockCustomers.length + 1),
      identifier: `CUST${String(mockCustomers.length + 1).padStart(3, '0')}`,
      contracts: [],
      createdAt: new Date().toISOString(),
      status: 'active'
    } as ICustomer;

    mockCustomers.push(newCustomer);

    return {
      message: 'Customer created successfully',
      didError: false,
      errorMessage: '',
      model: newCustomer
    };
  },

  async updateCustomer(id: string, customer: Partial<ICustomer>): Promise<ISingleResponse<ICustomer>> {
    const index = mockCustomers.findIndex(c => c.id === id);
    if (index === -1) {
      return {
        message: 'Customer not found',
        didError: true,
        errorMessage: 'Customer not found',
        model: null
      };
    }

    const updatedCustomer = {
      ...mockCustomers[index],
      ...customer,
    };

    mockCustomers[index] = updatedCustomer;

    return {
      message: 'Customer updated successfully',
      didError: false,
      errorMessage: '',
      model: updatedCustomer
    };
  },

  async addContract(customerId: string, contract: Partial<IContract>): Promise<ISingleResponse<IContract>> {
    const customer = mockCustomers.find(c => c.id === customerId);
    if (!customer) {
      return {
        message: 'Customer not found',
        didError: true,
        errorMessage: 'Customer not found',
        model: null
      };
    }

    const newContract: IContract = {
      ...contract,
      id: String(customer.contracts.length + 1),
      contractNumber: `CNT${String(customer.contracts.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      status: 'active'
    } as IContract;

    customer.contracts.push(newContract);

    return {
      message: 'Contract added successfully',
      didError: false,
      errorMessage: '',
      model: newContract
    };
  },

  async updateContract(
    customerId: string,
    contractId: string,
    contract: Partial<IContract>
  ): Promise<ISingleResponse<IContract>> {
    const customer = mockCustomers.find(c => c.id === customerId);
    if (!customer) {
      return {
        message: 'Customer not found',
        didError: true,
        errorMessage: 'Customer not found',
        model: null
      };
    }

    const contractIndex = customer.contracts.findIndex(c => c.id === contractId);
    if (contractIndex === -1) {
      return {
        message: 'Contract not found',
        didError: true,
        errorMessage: 'Contract not found',
        model: null
      };
    }

    const updatedContract = {
      ...customer.contracts[contractIndex],
      ...contract,
    };

    customer.contracts[contractIndex] = updatedContract;

    return {
      message: 'Contract updated successfully',
      didError: false,
      errorMessage: '',
      model: updatedContract
    };
  },

  async getCountries(): Promise<IListResponse<ICountry>> {
    return {
      message: 'Countries retrieved successfully',
      didError: false,
      errorMessage: '',
      model: mockCountries
    };
  }
};