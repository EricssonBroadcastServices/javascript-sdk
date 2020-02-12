import { jsonProperty } from "../decorators/json-property";
import { AssetModel } from "./asset-model";

export class Program {
  @jsonProperty()
  public assetId: string;
  @jsonProperty()
  public startTime: string;
  @jsonProperty()
  public endTime: string;
  @jsonProperty()
  public programId: string;
  @jsonProperty({
    type: AssetModel
  })
  public asset: AssetModel;
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
  public getLiveProgramIndex = () => {
    const now = new Date();
    for (let i = 0; i < this.programs.length; i++) {
      const startTime = new Date(this.programs[i].startTime);
      const endTime = new Date(this.programs[i].endTime);
      if (endTime > now && startTime <= now) {
        return i;
      }
    }
    return 0;
  };
  public getUpcomingProgramIndex = () => {
    const now = new Date();
    for (let i = 0; i < this.programs.length; i++) {
      const startTime = new Date(this.programs[i].startTime);
      if (startTime > now) {
        return i;
      }
    }
    return 0;
  };
}
