/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { AssetService } from "./AssetService";
import { AuthenticationService } from "./AuthenticationService";
import { ClientConfigService } from "./ClientConfigService";
import { CustomerConfigService } from "./CustomerConfigService";
import { DeviceService } from "./DeviceService";
import { DocumentService } from "./DocumentService";
import { DownloadsService } from "./DownloadsService";
import { EntitlementsService } from "./EntitlementsService";
import { EpgService } from "./EpgService";
import { EventService } from "./EventService";
import { request, ServiceContext } from "./http-client";
import { LocationService } from "./LocationService";
import { MrssService } from "./MrssService";
import { PreferencesService } from "./PreferencesService";
import { PrometheusService } from "./PrometheusService";
import { RecommenderService } from "./RecommenderService";
import { SearchService } from "./SearchService";
import { SeasonService } from "./SeasonService";
import { StoreService } from "./StoreService";
import { SystemService } from "./SystemService";
import { TagService } from "./TagService";
import { TimeService } from "./TimeService";
import { UserPlayHistoryService } from "./UserPlayHistoryService";
import { UserService } from "./UserService";

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
export { request };
export * from "./data-contracts";
export * from "./AssetService";
export * from "./AuthenticationService";
export * from "./ClientConfigService";
export * from "./CustomerConfigService";
export * from "./DeviceService";
export * from "./DocumentService";
export * from "./DownloadsService";
export * from "./EntitlementsService";
export * from "./EpgService";
export * from "./EventService";
export * from "./LocationService";
export * from "./MrssService";
export * from "./PreferencesService";
export * from "./PrometheusService";
export * from "./RecommenderService";
export * from "./SearchService";
export * from "./SeasonService";
export * from "./StoreService";
export * from "./SystemService";
export * from "./TagService";
export * from "./TimeService";
export * from "./UserService";
export * from "./UserPlayHistoryService";
