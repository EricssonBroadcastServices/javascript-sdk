import { ImageModel, jsonProperty } from "@ericssonbroadcastservices/exposure-sdk";
import { IWLSeason } from "../interfaces/wl-carousel-item";
import { WLAsset } from "./wl-asset";

export class WLSeason implements IWLSeason {
  @jsonProperty({ type: WLAsset })
  /* Some sort of bug in deserialization here. Will investigate in future */
  public episodes: WLAsset[];
  @jsonProperty()
  public title: string;
  @jsonProperty()
  public description: string;
  @jsonProperty()
  public seasonId: string;
  @jsonProperty()
  public images: ImageModel[];
  @jsonProperty()
  public season: number;
  @jsonProperty()
  public episodeCount: number;
}
