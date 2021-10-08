import { WLComponent } from "./wl-component";
import { WLReference } from "./wl-reference";
import { jsonProperty } from "@ericssonbroadcastservices/exposure-sdk";
import { IWLPage } from "../interfaces/wl-page";

export class WLPageModel extends WLComponent implements IWLPage {
  @jsonProperty({ type: WLReference })
  public components: WLReference[];
  @jsonProperty()
  public created?: Date;
  @jsonProperty()
  public changed?: Date;
  @jsonProperty()
  public name: string;
  @jsonProperty()
  public title?: string;
  @jsonProperty()
  public description?: string;
}
