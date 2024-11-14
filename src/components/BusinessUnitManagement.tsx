import React, { useState } from 'react';
import { Building2, Plus, PencilLine, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface BusinessUnit {
  id: string;
  name: string;
  manager: string;
  employees: number;
  location: string;
  status: 'active' | 'inactive';
  performance: {
    shipments: number;
    onTime: number;
    revenue: number;
  };
}

const initialBusinessUnits: BusinessUnit[] = [
  {
    id: '1',
    name: 'Northeast Division',
    manager: 'Sarah Johnson',
    employees: 125,
    location: 'New York, NY',
    status: 'active',
    performance: {
      shipments: 1250,
      onTime: 96,
      revenue: 850000,
    },
  },
  {
    id: '2',
    name: 'West Coast Operations',
    manager: 'Michael Chen',
    employees: 98,
    location: 'Los Angeles, CA',
    status: 'active',
    performance: {
      shipments: 980,
      onTime: 94,
      revenue: 720000,
    },
  },
  {
    id: '3',
    name: 'Midwest Hub',
    manager: 'Emily Rodriguez',
    employees: 75,
    location: 'Chicago, IL',
    status: 'active',
    performance: {
      shipments: 850,
      onTime: 92,
      revenue: 580000,
    },
  },
];

const BusinessUnitManagement = () => {
  const [businessUnits, setBusinessUnits] = useState<BusinessUnit[]>(initialBusinessUnits);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);
  const [editingUnit, setEditingUnit] = useState<BusinessUnit | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedUnit(expandedUnit === id ? null : id);
  };

  const handleEdit = (unit: BusinessUnit) => {
    setEditingUnit(unit);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this business unit?')) {
      setBusinessUnits(businessUnits.filter(unit => unit.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Building2 className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-bold text-gray-900">Business Units</h2>
        </div>
        <button
          onClick={() => {
            setEditingUnit(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Business Unit
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="grid grid-cols-6 gap-4 px-6 py-4 bg-gray-50 text-sm font-medium text-gray-500">
          <div className="col-span-2">Name</div>
          <div>Manager</div>
          <div>Location</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        <div className="divide-y divide-gray-200">
          {businessUnits.map((unit) => (
            <div key={unit.id} className="hover:bg-gray-50">
              <div className="grid grid-cols-6 gap-4 px-6 py-4 cursor-pointer" onClick={() => toggleExpand(unit.id)}>
                <div className="col-span-2 flex items-center space-x-3">
                  {expandedUnit === unit.id ? (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  )}
                  <span className="font-medium text-gray-900">{unit.name}</span>
                </div>
                <div>{unit.manager}</div>
                <div>{unit.location}</div>
                <div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    unit.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(unit);
                    }}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <PencilLine className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(unit.id);
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {expandedUnit === unit.id && (
                <div className="px-6 py-4 bg-gray-50 border-t">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-sm font-medium text-gray-500">Employees</div>
                      <div className="mt-1 text-2xl font-semibold text-gray-900">{unit.employees}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-sm font-medium text-gray-500">Monthly Shipments</div>
                      <div className="mt-1 text-2xl font-semibold text-gray-900">{unit.performance.shipments}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-sm font-medium text-gray-500">On-Time Delivery</div>
                      <div className="mt-1 text-2xl font-semibold text-gray-900">{unit.performance.onTime}%</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                {editingUnit ? 'Edit Business Unit' : 'Add Business Unit'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Unit Name</label>
                  <input
                    type="text"
                    defaultValue={editingUnit?.name}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Manager</label>
                  <input
                    type="text"
                    defaultValue={editingUnit?.manager}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    defaultValue={editingUnit?.location}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    defaultValue={editingUnit?.status}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                >
                  {editingUnit ? 'Save Changes' : 'Create Unit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessUnitManagement;