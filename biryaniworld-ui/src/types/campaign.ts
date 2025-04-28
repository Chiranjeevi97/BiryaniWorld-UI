export interface Campaign {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  targetAudience: string;
  discountType: string;
  discountValue: number;
  minimumPurchase?: number;
  maxRedemptions?: number;
  termsAndConditions: string[];
} 