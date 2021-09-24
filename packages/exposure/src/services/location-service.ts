import { BaseService } from "./base-service";
import { deserialize } from "../decorators/property-mapper";
import { UserLocation } from "../models/user-location-model";

export class LocationService extends BaseService {
  public getLocation() {
    return this.get("/v2/location").then(data => deserialize(UserLocation, data));
  }
}
