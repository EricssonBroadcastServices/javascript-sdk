import { Asset } from "@ericssonbroadcastservices/rbm-ott-sdk";

export interface PushNextContent {
  upNext?: Asset;
  recommendations: Asset[];
}
