import { WLComponent } from "./wl-component";
import { WLReference } from "./wl-reference";
import { jsonProperty } from "../decorators/json-property";

export class WLPageModel extends WLComponent {
  @jsonProperty({ type: WLReference })
  public components: WLReference[]
}
