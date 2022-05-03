import { jsonProperty } from "../decorators/json-property";
import { Asset } from "./asset-model";
export class Program {
  @jsonProperty()
  public assetId: string;
  @jsonProperty()
  public startTime: string;
  @jsonProperty()
  public endTime: string;
  @jsonProperty()
  public programId: string;
  @jsonProperty()
  public channelId: string;
  @jsonProperty({
    type: Asset
  })
  public asset: Asset;
  @jsonProperty()
  public blackout?: boolean;
}

export class EpgResponse {
  @jsonProperty()
  public totalHitsAllchannels: number;
  @jsonProperty({
    type: Program
  })
  public programs: Program[] = [];
  @jsonProperty()
  public channelId: string;
}

export class OnNowAsset {
  @jsonProperty()
  public startTime: string;
  @jsonProperty()
  public endTime: string;
  @jsonProperty({
    type: Asset
  })
  public asset: Asset;
}

export class OnNowResponse {
  @jsonProperty()
  public active: boolean;
  @jsonProperty({ type: Asset })
  public channel: Asset;
  @jsonProperty({
    type: OnNowAsset
  })
  public assets: OnNowAsset[];
}
