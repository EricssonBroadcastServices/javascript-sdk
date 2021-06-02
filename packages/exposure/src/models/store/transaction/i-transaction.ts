import { IExposureProductOffering, IProductOffering } from "../product-offering/i-product-offering";

export interface IExposureTransaction {
  id: string;
  status: string;
  amount: string;
  completedTime: string;
  paymentProviderTransactionId: string;
  paymentProviderType: string;
}

export interface ITransaction extends Omit<IExposureTransaction, "completedTime"> {
  id: string;
  status: string;
  amount: string;
  completedTime: Date;
  paymentProviderTransactionId: string;
  paymentProviderType: string;
}

export interface IExposureTransactionsWithProductOffering {
  transactionsProductOfferingPairs: {
    transactions: IExposureTransaction;
    productOffering?: IExposureProductOffering;
  }[];
}

export interface ITransactionWithProductOffering {
  transactions: ITransaction;
  productOffering?: IProductOffering;
}
