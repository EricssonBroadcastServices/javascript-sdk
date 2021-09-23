interface CardSummary {
  brand: string;
  expiryMonth: string;
  expiryYear: string;
  last4: string;
  origin?: string;
}

export interface PaymentMethod {
  id: string;
  cardSummary?: CardSummary;
  payPalDetails?: {
    email: string;
  };
  preferred: boolean;
}
