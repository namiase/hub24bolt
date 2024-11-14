import React from 'react';
import { Trash2, Package } from 'lucide-react';
import { ShipmentPiece } from './types';

interface PieceListProps {
  pieces: ShipmentPiece[];
  onRemove: (id: string) => void;
  onUpdate: (id: string, updates: Partial<ShipmentPiece>) => void;
}

const PieceList = ({ pieces, onRemove, onUpdate }: PieceListProps) => {
  const calculateDimensionalWeight = (length: number, width: number, height: number): number => {
    // Industry standard dimensional factor (166)
    return (length * width * height) / 166;
  };

  const handleDimensionChange = (
    id: string,
    piece: ShipmentPiece,
    field: 'length' | 'width' | 'height',
    value: string
  ) => {
    const numValue = parseFloat(value) || 0;
    const updates: Partial<ShipmentPiece> = { [field]: numValue };

    if (piece.length && piece.width && piece.height) {
      const dimensions = {
        length: field === 'length' ? numValue : piece.length,
        width: field === 'width' ? numValue : piece.width,
        height: field === 'height' ? numValue : piece.height,
      };
      
      updates.dimensionalWeight = calculateDimensionalWeight(
        dimensions.length,
        dimensions.width,
        dimensions.height
      );
    }

    onUpdate(id, updates);
  };

  return (
    <div className="space-y-4">
      {pieces.map((piece) => (
        <div key={piece.id} className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-indigo-600" />
              <h4 className="text-sm font-medium text-gray-900">Package Details</h4>
            </div>
            <button
              type="button"
              onClick={() => onRemove(piece.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Physical Weight (kg)
              </label>
              <input
                type="number"
                value={piece.physicalWeight || ''}
                onChange={(e) => onUpdate(piece.id, { physicalWeight: parseFloat(e.target.value) || 0 })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                step="0.1"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                value={piece.description}
                onChange={(e) => onUpdate(piece.id, { description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dimensions (cm)
              </label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <input
                    type="number"
                    value={piece.length || ''}
                    onChange={(e) => handleDimensionChange(piece.id, piece, 'length', e.target.value)}
                    placeholder="Length"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    min="0"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={piece.width || ''}
                    onChange={(e) => handleDimensionChange(piece.id, piece, 'width', e.target.value)}
                    placeholder="Width"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    min="0"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={piece.height || ''}
                    onChange={(e) => handleDimensionChange(piece.id, piece, 'height', e.target.value)}
                    placeholder="Height"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {piece.dimensionalWeight && (
              <div className="md:col-span-2 bg-blue-50 p-3 rounded-md">
                <p className="text-sm text-blue-700">
                  Dimensional Weight: {piece.dimensionalWeight.toFixed(2)} kg
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Chargeable Weight: {Math.max(piece.physicalWeight, piece.dimensionalWeight).toFixed(2)} kg
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PieceList;