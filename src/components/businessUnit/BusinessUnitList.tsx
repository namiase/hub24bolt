import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Plus, Search, Settings, PencilLine, Trash2, AlertCircle } from 'lucide-react';
import Select from '../common/Select';
import { businessUnitService } from '../../services/businessUnitService';
import { IBusinessUnit, IBusinessUnitFilter, IBusinessUnitType, IBusinessUnitStatus } from '../../interfaces/businessUnit';

const BusinessUnitList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [businessUnits, setBusinessUnits] = useState<IBusinessUnit[]>([]);
  const [types, setTypes] = useState<IBusinessUnitType[]>([]);
  const [statuses, setStatuses] = useState<IBusinessUnitStatus[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [filter, setFilter] = useState<IBusinessUnitFilter>({
    page: 1,
    pageSize,
    search: '',
    type: '',
    code: '',
    name: '',
    status: '',
  });

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [typesResponse, statusesResponse] = await Promise.all([
          businessUnitService.getBusinessUnitTypes(),
          businessUnitService.getBusinessUnitStatuses(),
        ]);

        if (!typesResponse.didError) setTypes(typesResponse.model);
        if (!statusesResponse.didError) setStatuses(statusesResponse.model);

        await fetchBusinessUnits();
      } catch (err) {
        setError('Failed to load initial data');
      }
    };

    loadInitialData();
  }, []);

  const fetchBusinessUnits = async () => {
    setLoading(true);
    try {
      const response = await businessUnitService.searchBusinessUnitAll(filter);
      if (!response.didError) {
        setBusinessUnits(response.model);
        setTotalRecords(response.totalRecords || 0);
        setError(null);
      } else {
        setError(response.errorMessage);
      }
    } catch (err) {
      setError('Failed to fetch business units');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessUnits();
  }, [filter]);

  const handleSearch = () => {
    setCurrentPage(1);
    setFilter(prev => ({ ...prev, page: 1 }));
  };

  const handleClear = () => {
    setFilter({
      page: 1,
      pageSize,
      search: '',
      type: '',
      code: '',
      name: '',
      status: '',
    });
    setCurrentPage(1);
  };

  const handleDelete = async (code: string) => {
    if (window.confirm('Are you sure you want to delete this business unit?')) {
      const response = await businessUnitService.deleteBusinessUnit(code);
      if (!response.didError) {
        await fetchBusinessUnits();
      } else {
        setError(response.errorMessage);
      }
    }
  };

  const totalPages = Math.ceil(totalRecords / pageSize);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Building2 className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-bold text-gray-900">Business Units</h2>
        </div>
        <button
          onClick={() => navigate('/business-units/create')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Business Unit
        </button>
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
        <div className="p-6 border-b border-gray-200">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Search</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search in all columns..."
                    value={filter.search}
                    onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <Select
                  options={types}
                  value={filter.type || ''}
                  onChange={(value) => setFilter(prev => ({ ...prev, type: value }))}
                  placeholder="Select type"
                  className="mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <Select
                  options={statuses}
                  value={filter.status || ''}
                  onChange={(value) => setFilter(prev => ({ ...prev, status: value }))}
                  placeholder="Select status"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={handleClear}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Clear
              </button>
              <button
                onClick={handleSearch}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contracts
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {businessUnits.map((unit) => (
                <tr key={unit.code} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {unit.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {unit.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {unit.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {unit.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {unit.contractCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => navigate(`/business-units/edit/${unit.code}`)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Edit"
                      >
                        <PencilLine className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(unit.code)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => navigate(`/business-units/settings/${unit.code}`)}
                        className="text-gray-600 hover:text-gray-900"
                        title="Settings"
                      >
                        <Settings className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{' '}
                <span className="font-medium">
                  {Math.min((currentPage - 1) * pageSize + 1, totalRecords)}
                </span>{' '}
                to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * pageSize, totalRecords)}
                </span>{' '}
                of <span className="font-medium">{totalRecords}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === page
                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessUnitList;