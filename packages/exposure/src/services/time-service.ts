import { BaseService, CustomerAndBusinessUnitOptions, ServiceOptions } from "./base-service";
import { deserialize } from "../decorators/property-mapper";
import { Time } from "../models/time-model";
import { sessionKeyStorage } from "../utils/storage";

interface GetNowOptions extends CustomerAndBusinessUnitOptions {
  clientTime: number;
}

const SESSION_STORAGE_KEY = "clientTimeDiff";

export class TimeService extends BaseService {
  constructor(public options: ServiceOptions) {
    super(options);

    // if possible we can set up the diff between client and server already on initialization
    this.getClientTimeDiff({
      customer: options.customer,
      businessUnit: options.businessUnit
    });
  }

  private getClientTimeDiff({ customer, businessUnit }: CustomerAndBusinessUnitOptions) {
    if (!customer || !businessUnit) return;
    this.getNow({
      customer,
      businessUnit,
      clientTime: Date.now()
    });
  }

  public getTime({ customer, businessUnit }: CustomerAndBusinessUnitOptions) {
    return this.get(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v1"
      })}/time`
    ).then(data => deserialize(Time, data));
  }

  public async getNow({ customer, businessUnit, clientTime }: GetNowOptions): Promise<number> {
    // if a diff is stored, respond with client time adjusted accordingly
    if (sessionKeyStorage.getItem(SESSION_STORAGE_KEY)) {
      const diff = sessionKeyStorage.getItem(SESSION_STORAGE_KEY);
      return Number(clientTime) + Number(diff);
    } else {
      // if we do not have a diff stored, fetch it and store it - though respond with the server time for now
      const timeResponse = await this.getTime({ customer, businessUnit });
      const epochTime = timeResponse.epochMillis;
      if (!sessionKeyStorage.getItem(SESSION_STORAGE_KEY)) {
        const diff = clientTime - epochTime;
        sessionKeyStorage.setItem(SESSION_STORAGE_KEY, diff.toString());
      }
      return epochTime;
    }
  }
}
