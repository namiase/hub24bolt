import React from 'react';
import { Scale } from 'lucide-react';
import { WeightCalculation } from './types';

interface WeightSummaryProps {
  calculation: WeightCalculation;
}

const WeightSummary = ({ calculation }: WeightSummaryProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
      <div className="flex items-center space-x-2 mb-4">
        <Scale className="h-5 w-5 text-indigo-600" />
        <h3 className="text-lg font-medium text-gray-900">Weight Summary</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-sm text-gray-500">Total Physical Weight</p>
          <p className="text-lg font-semibold text-gray-900">
            {calculation.totalPhysicalWeight.toFixed(2)} kg
          </p>
        </div>

        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-sm text-gray-500">Total Dimensional Weight</p>
          <p className="text-lg font-semibold text-gray-900">
            {calculation.totalDimensionalWeight.toFixed(2)} kg
          </p>
        </div>

        <div className="bg-indigo-50 p-3 rounded-md">
          <p className="text-sm text-indigo-600">Chargeable Weight</p>
          <p className="text-lg font-semibold text-indigo-900">
            {calculation.chargeableWeight.toFixed(2)} kg
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeightSummary;