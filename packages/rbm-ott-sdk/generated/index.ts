/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { AssetService } from "./AssetService.js";
import { AuthenticationService } from "./AuthenticationService.js";
import { ClientConfigService } from "./ClientConfigService.js";
import { CustomerConfigService } from "./CustomerConfigService.js";
import { DeviceService } from "./DeviceService.js";
import { DocumentService } from "./DocumentService.js";
import { DownloadsService } from "./DownloadsService.js";
import { EntitlementsService } from "./EntitlementsService.js";
import { EpgService } from "./EpgService.js";
import { EventService } from "./EventService.js";
import { request, ServiceContext, ResponseError } from "./http-client.js";
import { LocationService } from "./LocationService.js";
import { MrssService } from "./MrssService.js";
import { PreferencesService } from "./PreferencesService.js";
import { PrometheusService } from "./PrometheusService.js";
import { RecommenderService } from "./RecommenderService.js";
import { SearchService } from "./SearchService.js";
import { SeasonService } from "./SeasonService.js";
import { StoreService } from "./StoreService.js";
import { SystemService } from "./SystemService.js";
import { TagService } from "./TagService.js";
import { TimeService } from "./TimeService.js";
import { UserPlayHistoryService } from "./UserPlayHistoryService.js";
import { UserService } from "./UserService.js";

class RBMOTTSDK {
  asset: AssetService;
  authentication: AuthenticationService;
  clientConfig: ClientConfigService;
  customerConfig: CustomerConfigService;
  device: DeviceService;
  document: DocumentService;
  downloads: DownloadsService;
  entitlements: EntitlementsService;
  epg: EpgService;
  event: EventService;
  location: LocationService;
  mrss: MrssService;
  preferences: PreferencesService;
  prometheus: PrometheusService;
  recommender: RecommenderService;
  search: SearchService;
  season: SeasonService;
  store: StoreService;
  system: SystemService;
  tag: TagService;
  time: TimeService;
  user: UserService;
  userPlayHistory: UserPlayHistoryService;
  constructor(public context: ServiceContext) {
    this.asset = new AssetService(context);
    this.authentication = new AuthenticationService(context);
    this.clientConfig = new ClientConfigService(context);
    this.customerConfig = new CustomerConfigService(context);
    this.device = new DeviceService(context);
    this.document = new DocumentService(context);
    this.downloads = new DownloadsService(context);
    this.entitlements = new EntitlementsService(context);
    this.epg = new EpgService(context);
    this.event = new EventService(context);
    this.location = new LocationService(context);
    this.mrss = new MrssService(context);
    this.preferences = new PreferencesService(context);
    this.prometheus = new PrometheusService(context);
    this.recommender = new RecommenderService(context);
    this.search = new SearchService(context);
    this.season = new SeasonService(context);
    this.store = new StoreService(context);
    this.system = new SystemService(context);
    this.tag = new TagService(context);
    this.time = new TimeService(context);
    this.user = new UserService(context);
    this.userPlayHistory = new UserPlayHistoryService(context);
  }
}

export default RBMOTTSDK;
export type { ServiceContext };
export { request, ResponseError };
export * from "./data-contracts.js";
export * from "./AssetService.js";
export * from "./AuthenticationService.js";
export * from "./ClientConfigService.js";
export * from "./CustomerConfigService.js";
export * from "./DeviceService.js";
export * from "./DocumentService.js";
export * from "./DownloadsService.js";
export * from "./EntitlementsService.js";
export * from "./EpgService.js";
export * from "./EventService.js";
export * from "./LocationService.js";
export * from "./MrssService.js";
export * from "./PreferencesService.js";
export * from "./PrometheusService.js";
export * from "./RecommenderService.js";
export * from "./SearchService.js";
export * from "./SeasonService.js";
export * from "./StoreService.js";
export * from "./SystemService.js";
export * from "./TagService.js";
export * from "./TimeService.js";
export * from "./UserService.js";
export * from "./UserPlayHistoryService.js";
