import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { AppConfig } from "../models/app-config-model";

export class WhiteLabelService extends BaseService {
  public getAppConfig<App extends keyof AppConfig>({
    customer,
    businessUnit,
    app
  }: { app: App } & CustomerAndBusinessUnitOptions): Promise<AppConfig[App] | undefined> {
    return this.get(`${this.cuBuUrl({ customer, businessUnit, apiVersion: "v2/whitelabel" })}/config/appConfig`).then(
      data => {
        const component = data.components[app]?.[0];
        if (!component) {
          return;
        }
        const { ...parameters } = component.parameters;
        const images = component.presentation.fallback.images.reduce((map: Record<string, string>, { url, tags }) => {
          map[tags[0]] = url;
          return map;
        }, {});

        return {
          ...parameters,
          images
        };
      }
    );
  }
}
