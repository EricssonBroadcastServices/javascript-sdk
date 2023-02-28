import { jsonProperty } from "../decorators/json-property";
import {
  AccessModel,
  IConsentManagement,
  IFrontEndFeatures,
  ILoginMethod,
  IPasswordHashConfig,
  IPasswordPolicy,
  ISystemConfig,
  PaymentType,
  SignupModel
} from "../interfaces/config/system-config";
export class SystemConfig implements ISystemConfig {
  @jsonProperty()
  public paymentType: PaymentType;
  @jsonProperty()
  public accountConfirmationRequired: boolean;
  @jsonProperty()
  public allowAccessWithoutLogin: boolean;
  @jsonProperty()
  public analyticsPercentage: number;
  @jsonProperty()
  public analyticsBaseUrl: string;
  @jsonProperty({ type: String })
  public currencies: string[];
  @jsonProperty({ type: String })
  public displayLocales: string[];
  @jsonProperty()
  public defaultLocale: string;
  @jsonProperty()
  public production: boolean;
  @jsonProperty()
  public adyenContext: string;
  @jsonProperty()
  public informationCollectionConsentDate: string;
  @jsonProperty()
  public consentManagement?: IConsentManagement;
  @jsonProperty()
  public passwordPolicy: IPasswordPolicy;
  @jsonProperty()
  public adyenOriginKey: string;
  @jsonProperty()
  public allowAnonymous = false;
  @jsonProperty()
  public playerUrl: string;
  @jsonProperty()
  public frontendFeatures: IFrontEndFeatures;
  @jsonProperty()
  public passwordHashConfig: IPasswordHashConfig;
  @jsonProperty()
  public externalPaymentUrl: string;
  @jsonProperty()
  public vouchers: boolean;
  @jsonProperty()
  public stripePublicKey: string;
  @jsonProperty()
  public signupMinimumAge: number;
  @jsonProperty({ type: Object })
  public loginMethods: ILoginMethod[];
  @jsonProperty()
  public accessModel: AccessModel;
  @jsonProperty()
  public signupModel: SignupModel;
  public paymentsIsEnabled = () => {
    return [PaymentType.ADYEN, PaymentType.EXTERNAL, PaymentType.STRIPE, PaymentType.VOUCHERS_ONLY].includes(
      this.paymentType
    );
  };
}
