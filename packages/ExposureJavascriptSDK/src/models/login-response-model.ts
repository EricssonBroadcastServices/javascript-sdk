import { jsonProperty } from "../decorators/json-property";

export class ConfigReloadQueryParameter {
  @jsonProperty()
  public name: string;
  @jsonProperty()
  public value: string;
}

export class LoginResponse {
  @jsonProperty()
  public expirationDateTime: string;
  @jsonProperty()
  public sessionToken: string;
  public isLoggedIn = () => this.hasSession() && !this.isAnonymous;
  public hasSession = () =>
    this.sessionToken && this.sessionToken !== "" && Date.parse(this.expirationDateTime) > Date.now();
  @jsonProperty()
  public informationCollectionConsentGiven: Date;
  @jsonProperty()
  public informationCollectionConsentRequiredDate: Date;
  @jsonProperty()
  public isAnonymous: boolean;
  @jsonProperty()
  public language: string;
  @jsonProperty()
  public username: string | null;
  @jsonProperty({ type: ConfigReloadQueryParameter })
  public configReloadQueryParameter: ConfigReloadQueryParameter;
  @jsonProperty()
  public userId: string;
  @jsonProperty()
  public accountId: string;
}
