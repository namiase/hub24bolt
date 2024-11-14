import React, { useState, useCallback } from 'react';
import { Package, Plus, X } from 'lucide-react';
import { ShipmentFormData, ShipmentPiece, WeightCalculation } from './types';
import PieceList from './PieceList';
import WeightSummary from './WeightSummary';

interface CreateShipmentProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialFormData: ShipmentFormData = {
  reference: '',
  service: 'standard',
  pieces: [],
  senderAddress: {
    name: '',
    company: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    email: '',
  },
  recipientAddress: {
    name: '',
    company: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    email: '',
  },
  instructions: '',
};

const CreateShipment = ({ isOpen, onClose }: CreateShipmentProps) => {
  const [formData, setFormData] = useState<ShipmentFormData>(initialFormData);

  const calculateTotalWeights = useCallback((): WeightCalculation => {
    const totals = formData.pieces.reduce(
      (acc, piece) => ({
        totalPhysicalWeight: acc.totalPhysicalWeight + (piece.physicalWeight || 0),
        totalDimensionalWeight: acc.totalDimensionalWeight + (piece.dimensionalWeight || 0),
      }),
      { totalPhysicalWeight: 0, totalDimensionalWeight: 0 }
    );

    return {
      ...totals,
      chargeableWeight: Math.max(totals.totalPhysicalWeight, totals.totalDimensionalWeight),
    };
  }, [formData.pieces]);

  const addPiece = () => {
    const newPiece: ShipmentPiece = {
      id: Date.now().toString(),
      physicalWeight: 0,
      length: 0,
      width: 0,
      height: 0,
      description: '',
    };

    setFormData(prev => ({
      ...prev,
      pieces: [...prev.pieces, newPiece],
    }));
  };

  const updatePiece = (id: string, updates: Partial<ShipmentPiece>) => {
    setFormData(prev => ({
      ...prev,
      pieces: prev.pieces.map(piece =>
        piece.id === id ? { ...piece, ...updates } : piece
      ),
    }));
  };

  const removePiece = (id: string) => {
    setFormData(prev => ({
      ...prev,
      pieces: prev.pieces.filter(piece => piece.id !== id),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle shipment creation
    console.log('Creating shipment:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <div className="flex items-center space-x-3">
            <Package className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-900">Create New Shipment</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Shipment Reference
                </label>
                <input
                  type="text"
                  value={formData.reference}
                  onChange={(e) => setFormData(prev => ({ ...prev, reference: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Service Type
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value as ShipmentFormData['service'] }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="standard">Standard Service</option>
                  <option value="express">Express Service</option>
                  <option value="priority">Priority Service</option>
                </select>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Pieces</h3>
                  <button
                    type="button"
                    onClick={addPiece}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Piece
                  </button>
                </div>

                {formData.pieces.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No pieces added yet. Click "Add Piece" to begin.</p>
                  </div>
                ) : (
                  <>
                    <PieceList
                      pieces={formData.pieces}
                      onRemove={removePiece}
                      onUpdate={updatePiece}
                    />
                    <WeightSummary calculation={calculateTotalWeights()} />
                  </>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Special Instructions
                </label>
                <textarea
                  value={formData.instructions}
                  onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
              >
                Create Shipment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateShipment;