import React from 'react';
import { Plus, TrendingUp, Clock, MapPin } from 'lucide-react';
import TrackingForm from './TrackingForm';
import ShipmentCard from './ShipmentCard';

interface DashboardProps {
  onNewShipment: () => void;
}

const Dashboard = ({ onNewShipment }: DashboardProps) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={onNewShipment}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Shipment
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Shipments</p>
              <p className="text-2xl font-semibold text-gray-900">24</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Transit</p>
              <p className="text-2xl font-semibold text-gray-900">18</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MapPin className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Delivered Today</p>
              <p className="text-2xl font-semibold text-gray-900">7</p>
            </div>
          </div>
        </div>
      </div>

      <TrackingForm />

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Shipments</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ShipmentCard
            trackingNumber="SWF123456789"
            status="In Transit"
            origin="New York, NY"
            destination="Los Angeles, CA"
            estimatedDelivery="Mar 15, 2024"
          />
          <ShipmentCard
            trackingNumber="SWF987654321"
            status="Out for Delivery"
            origin="Chicago, IL"
            destination="Miami, FL"
            estimatedDelivery="Mar 14, 2024"
          />
          <ShipmentCard
            trackingNumber="SWF456789123"
            status="Pending Pickup"
            origin="Seattle, WA"
            destination="Boston, MA"
            estimatedDelivery="Mar 16, 2024"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;