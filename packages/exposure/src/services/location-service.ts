import { BaseService } from "./base-service";
import { IUserLocation } from "../interfaces/location/user-location";

export class LocationService extends BaseService {
  public getLocation(): Promise<IUserLocation> {
    return this.get("/v2/location");
  }
}
