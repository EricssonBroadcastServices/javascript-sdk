import { jsonProperty } from "@ericssonbroadcastservices/exposure-sdk";

export class Theme {
  @jsonProperty()
  public dark: string;
  @jsonProperty()
  public light: string;
  @jsonProperty()
  public error: string;
  @jsonProperty()
  public success: string;
  @jsonProperty()
  public warning: string;
  @jsonProperty()
  public primaryTextColor: string;
  @jsonProperty()
  public secondaryTextColor: string;
  @jsonProperty()
  public primaryBackgroundColor: string;
  @jsonProperty()
  public secondaryBackgroundColor: string;
  @jsonProperty()
  public primaryBrandColor: string;
  @jsonProperty()
  public heroBannerTextColor: string;
}
