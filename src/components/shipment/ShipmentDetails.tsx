import React from 'react';
import { ShipmentFormData } from './CreateShipment';

interface ShipmentDetailsProps {
  formData: ShipmentFormData;
  onChange: (updates: Partial<ShipmentFormData>) => void;
}

const ShipmentDetails = ({ formData, onChange }: ShipmentDetailsProps) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Shipment Reference
        </label>
        <input
          type="text"
          value={formData.reference}
          onChange={(e) => onChange({ reference: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter reference number"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Service Type
        </label>
        <select
          value={formData.service}
          onChange={(e) => onChange({ service: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="standard">Standard Delivery</option>
          <option value="express">Express Delivery</option>
          <option value="priority">Priority Delivery</option>
          <option value="economy">Economy Delivery</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Special Instructions
        </label>
        <textarea
          value={formData.instructions}
          onChange={(e) => onChange({ instructions: e.target.value })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter any special handling instructions"
        />
      </div>
    </div>
  );
};

export default ShipmentDetails;