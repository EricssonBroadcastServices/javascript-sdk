export interface IBraintreeSettings {
  clientToken: string;
  braintreePaymentMethods?: {
    card?: {
      vault?: {
        vaultCard: boolean;
        allowVaultCardOverride: boolean;
      };
    };
    applePay?: {
      paymentRequest: {
        total: {
          amount: string;
          label: string;
        };
      };
    };
    googlePay?: {
      merchantId: string;
      allowedPaymentMethods: [
        {
          type: string;
        }
      ];
      googlePayVersion: number;
      transactionInfo: {
        totalPrice: string;
        totalPriceStatus: string;
        currencyCode: string;
      };
    };
    paypal?: {
      amount?: number;
      currency?: string;
      flow: string;
    };
  };
}
