import { IExposureTransaction, ITransaction } from "./i-transaction";

export class TransactionUtils {
  static build(json: IExposureTransaction): ITransaction {
    return {
      ...json,
      completedTime: new Date(json.completedTime)
    };
  }
}
