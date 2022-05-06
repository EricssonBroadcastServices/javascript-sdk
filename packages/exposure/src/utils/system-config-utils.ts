import { PaymentType } from "../interfaces/config/system-config";

function paymentsIsEnabled(paymentType: PaymentType | string) {
  return [
    PaymentType.ADYEN,
    PaymentType.EXTERNAL,
    PaymentType.STRIPE,
    PaymentType.VOUCHERS_ONLY,
    PaymentType.BRAINTREE
  ].includes(paymentType as PaymentType);
}

export const systemConfigUtils = {
  paymentsIsEnabled
};
