import { BaseService } from "./base-service";
import { IUserLocation } from "../interfaces/user-localtion";

export class LocationService extends BaseService {
  public getLocation(): Promise<IUserLocation> {
    return this.get("/v2/location");
  }
}
