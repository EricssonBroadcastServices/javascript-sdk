import { IProductOffering } from "../..";

export interface ITransaction {
  id: string;
  status: string;
  amount: string;
  completedTime: string;
  paymentProviderTransactionId: string;
  paymentProviderType: string;
}

export class ITransactionsWithProductOffering {
  transactions: ITransaction;
  productOffering: IProductOffering;
}
