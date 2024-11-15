import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Building2, ArrowLeft, AlertCircle } from 'lucide-react';
import Select from '../common/Select';
import { businessUnitService } from '../../services/businessUnitService';
import { IBusinessUnit, IBusinessUnitType, IBusinessUnitStatus } from '../../interfaces/businessUnit';

interface BusinessUnitFormData {
  code: string;
  name: string;
  phone: string;
  email: string;
  type: string;
  status: string;
}

const BusinessUnitForm = () => {
  const navigate = useNavigate();
  const { code } = useParams();
  const isEditing = !!code;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [types, setTypes] = useState<IBusinessUnitType[]>([]);
  const [statuses, setStatuses] = useState<IBusinessUnitStatus[]>([]);

  const [formData, setFormData] = useState<BusinessUnitFormData>({
    code: '',
    name: '',
    phone: '',
    email: '',
    type: '',
    status: 'active',
  });

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [typesResponse, statusesResponse] = await businessUnitService.getBusinessUnitTypes();
        setTypes(typesResponse.model);
        setStatuses(statusesResponse.model);

        if (isEditing) {
          // In a real app, we would fetch the business unit data here
          setFormData({
            code: code || '',
            name: 'Sample Business Unit',
            phone: '+1234567890',
            email: 'sample@example.com',
            type: 'regional',
            status: 'active',
          });
        }
      } catch (err) {
        setError('Failed to load initial data');
      }
    };

    loadInitialData();
  }, [code, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await businessUnitService.createBusinessUnit(formData);
      if (!response.didError) {
        navigate('/business-units');
      } else {
        setError(response.errorMessage);
      }
    } catch (err) {
      setError('Failed to save business unit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/business-units')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          <div className="flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-900">
              {isEditing ? 'Edit Business Unit' : 'Create Business Unit'}
            </h2>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <p className="ml-3 text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {isEditing && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Business Unit Code
                </label>
                <input
                  type="text"
                  value={formData.code}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50"
                  disabled
                />
              </div>
            )}

            <div className={isEditing ? '' : 'sm:col-span-2'}>
              <label className="block text-sm font-medium text-gray-700">
                Business Unit Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <Select
                options={types}
                value={formData.type}
                onChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                placeholder="Select type"
                className="mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <Select
                options={statuses}
                value={formData.status}
                onChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                placeholder="Select status"
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate('/business-units')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusinessUnitForm;