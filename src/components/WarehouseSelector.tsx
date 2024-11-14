import React from 'react';

interface WarehouseSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const WarehouseSelector = ({ value, onChange }: WarehouseSelectorProps) => {
  const warehouses = [
    { id: '1', name: 'New York Warehouse' },
    { id: '2', name: 'Los Angeles Warehouse' },
    { id: '3', name: 'Chicago Warehouse' },
    { id: '4', name: 'Miami Warehouse' },
    { id: '5', name: 'Seattle Warehouse' },
  ];

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="block w-56 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
    >
      {warehouses.map((warehouse) => (
        <option key={warehouse.id} value={warehouse.id}>
          {warehouse.name}
        </option>
      ))}
    </select>
  );
};

export default WarehouseSelector;