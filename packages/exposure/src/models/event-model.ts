import { Asset } from "./asset-model";
import { jsonProperty } from "../decorators/json-property";

export class Event {
  @jsonProperty()
  public assetId: string;
  @jsonProperty()
  public startTime: string;
  @jsonProperty()
  public endTime: string;
  @jsonProperty({
    type: Asset,
  })
  public asset: Asset;
}

export class EventResponse {
  @jsonProperty()
  public pageSize: number;
  @jsonProperty()
  public pageNumber: number;
  @jsonProperty()
  public totalCount: number;
  @jsonProperty({
    type: Event,
  })
  public items: Event[] = [];
  public numberOfPages = () => {
    return Math.ceil(this.totalCount / this.pageSize);
  };
  public getInitialSlide = () => {
    const now = new Date();
    if (this.items.length === 0) {
      return 0;
    }
    if (this.items[0].startTime) {
      for (let i = 0; i < this.items.length; i++) {
        const endTime = new Date(this.items[i].endTime);
        if (endTime > now) {
          return i;
        }
      }
    }
    return 0;
  };
}
