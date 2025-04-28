export interface LoyaltyProgram {
  id: number;
  customerId: number;
  points: number;
  tier: string;
  benefits: string[];
  autoRenew: boolean;
  expiryDate: string;
} 