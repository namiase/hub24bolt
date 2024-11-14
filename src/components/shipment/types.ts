export interface ShipmentPiece {
  id: string;
  physicalWeight: number;
  length: number;
  width: number;
  height: number;
  description: string;
  dimensionalWeight?: number;
}

export interface ShipmentFormData {
  reference: string;
  service: 'standard' | 'express' | 'priority';
  pieces: ShipmentPiece[];
  senderAddress: {
    name: string;
    company: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
    email: string;
  };
  recipientAddress: {
    name: string;
    company: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
    email: string;
  };
  instructions: string;
}

export interface WeightCalculation {
  totalPhysicalWeight: number;
  totalDimensionalWeight: number;
  chargeableWeight: number;
}