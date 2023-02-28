import { BaseService } from "./base-service";
import { IUserLocation } from "../interfaces/location/user-location";

export class LocationService extends BaseService {
  public getLocation(): Promise<IUserLocation> {
    if (this.options.businessUnit && this.options.customer) {
      return this.get(`/v1/customer/${this.options.customer}/businessunit/${this.options.businessUnit}/location`);
    }
    return this.get("/v2/location");
  }
}
