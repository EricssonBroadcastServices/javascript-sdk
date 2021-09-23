interface ICardSummary {
  brand: string;
  expiryMonth: string;
  expiryYear: string;
  last4: string;
  origin?: string;
}

export interface IPaymentMethod {
  id: string;
  cardSummary?: ICardSummary;
  payPalDetails?: {
    email: string;
  };
  preferred: boolean;
}
