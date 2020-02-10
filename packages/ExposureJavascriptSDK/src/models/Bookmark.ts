import { jsonProperty } from "../decorators/json-property";

export class Bookmark {
  @jsonProperty()
  public assetId: string;
  @jsonProperty()
  public channelId?: string;
  @jsonProperty()
  public programId?: string;
  @jsonProperty()
  public lastViewedOffset: number;
  @jsonProperty()
  public lastViewedTime: number;
  @jsonProperty()
  public liveTime?: number;
}
