import React from 'react';
import { Truck, MapPin } from 'lucide-react';

interface ShipmentCardProps {
  trackingNumber: string;
  status: string;
  origin: string;
  destination: string;
  estimatedDelivery: string;
}

const ShipmentCard = ({
  trackingNumber,
  status,
  origin,
  destination,
  estimatedDelivery,
}: ShipmentCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in transit':
        return 'bg-blue-100 text-blue-800';
      case 'out for delivery':
        return 'bg-green-100 text-green-800';
      case 'pending pickup':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-500">Tracking Number</p>
          <p className="text-base font-semibold">{trackingNumber}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-gray-400 mt-1" />
          <div>
            <p className="text-sm text-gray-500">From</p>
            <p className="text-sm font-medium">{origin}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-gray-400 mt-1" />
          <div>
            <p className="text-sm text-gray-500">To</p>
            <p className="text-sm font-medium">{destination}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Truck className="h-5 w-5 text-gray-400 mt-1" />
          <div>
            <p className="text-sm text-gray-500">Estimated Delivery</p>
            <p className="text-sm font-medium">{estimatedDelivery}</p>
          </div>
        </div>
      </div>

      <button className="mt-4 w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        View Details
      </button>
    </div>
  );
};

export default ShipmentCard;