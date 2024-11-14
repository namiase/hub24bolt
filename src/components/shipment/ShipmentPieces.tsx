import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { ShipmentPiece } from './types';

interface ShipmentPiecesProps {
  pieces: ShipmentPiece[];
  onChange: (pieces: ShipmentPiece[]) => void;
}

const ShipmentPieces = ({ pieces, onChange }: ShipmentPiecesProps) => {
  const addPiece = () => {
    onChange([
      ...pieces,
      {
        id: Date.now().toString(),
        weight: '',
        length: '',
        width: '',
        height: '',
        description: '',
      },
    ]);
  };

  const updatePiece = (index: number, updates: Partial<ShipmentPiece>) => {
    const newPieces = [...pieces];
    newPieces[index] = { ...newPieces[index], ...updates };
    onChange(newPieces);
  };

  const removePiece = (index: number) => {
    onChange(pieces.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Package Details</h3>
        <button
          type="button"
          onClick={addPiece}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Package
        </button>
      </div>

      {pieces.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No packages added yet. Click "Add Package" to begin.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pieces.map((piece, index) => (
            <div
              key={piece.id}
              className="bg-gray-50 p-4 rounded-lg space-y-4"
            >
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-900">
                  Package {index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removePiece(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={piece.weight}
                    onChange={(e) => updatePiece(index, { weight: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <input
                    type="text"
                    value={piece.description}
                    onChange={(e) => updatePiece(index, { description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Package contents"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Dimensions (cm)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="number"
                      value={piece.length}
                      onChange={(e) => updatePiece(index, { length: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="L"
                    />
                    <input
                      type="number"
                      value={piece.width}
                      onChange={(e) => updatePiece(index, { width: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="W"
                    />
                    <input
                      type="number"
                      value={piece.height}
                      onChange={(e) => updatePiece(index, { height: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="H"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShipmentPieces;