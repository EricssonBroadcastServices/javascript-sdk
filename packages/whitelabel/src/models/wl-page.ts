import { WLComponent } from "./wl-component";
import { WLReference } from "./wl-reference";
import {jsonProperty} from "@EricssonBroadcastServices/exposure-sdk";

export class WLPageModel extends WLComponent {
  @jsonProperty({ type: WLReference })
  public components: WLReference[]
}
