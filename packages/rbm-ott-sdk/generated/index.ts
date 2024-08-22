/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { AccountLabelsService } from "./AccountLabelsService";
import { ActivationCodeDevicePairingService } from "./ActivationCodeDevicePairingService";
import { AnonymousLoginService } from "./AnonymousLoginService";
import { AssetService } from "./AssetService";
import { AuthenticationService } from "./AuthenticationService";
import { ChannelService } from "./ChannelService";
import { ClientConfigService } from "./ClientConfigService";
import { CustomerConfigService } from "./CustomerConfigService";
import { DevicesService } from "./DevicesService";
import { DocumentsService } from "./DocumentsService";
import { DownloadsService } from "./DownloadsService";
import { EntitlementsService } from "./EntitlementsService";
import { EpgService } from "./EpgService";
import { EventService } from "./EventService";
import { request, ServiceContext, ResponseError } from "./http-client";
import { LocationService } from "./LocationService";
import { MrssService } from "./MrssService";
import { PinCodesService } from "./PinCodesService";
import { PreferencesService } from "./PreferencesService";
import { RecommenderService } from "./RecommenderService";
import { SearchService } from "./SearchService";
import { SeasonService } from "./SeasonService";
import { StoreService } from "./StoreService";
import { SystemService } from "./SystemService";
import { TagService } from "./TagService";
import { TimeService } from "./TimeService";
import { UserPlayHistoryService } from "./UserPlayHistoryService";
import { UserProfilesService } from "./UserProfilesService";
import { UserService } from "./UserService";

class RBMOTTSDK {
  accountLabels: AccountLabelsService;
  activationCodeDevicePairing: ActivationCodeDevicePairingService;
  anonymousLogin: AnonymousLoginService;
  asset: AssetService;
  authentication: AuthenticationService;
  channel: ChannelService;
  clientConfig: ClientConfigService;
  customerConfig: CustomerConfigService;
  devices: DevicesService;
  documents: DocumentsService;
  downloads: DownloadsService;
  entitlements: EntitlementsService;
  epg: EpgService;
  event: EventService;
  location: LocationService;
  mrss: MrssService;
  pinCodes: PinCodesService;
  preferences: PreferencesService;
  recommender: RecommenderService;
  search: SearchService;
  season: SeasonService;
  store: StoreService;
  system: SystemService;
  tag: TagService;
  time: TimeService;
  user: UserService;
  userPlayHistory: UserPlayHistoryService;
  userProfiles: UserProfilesService;
  constructor(public context: ServiceContext) {
    this.accountLabels = new AccountLabelsService(context);
    this.activationCodeDevicePairing = new ActivationCodeDevicePairingService(context);
    this.anonymousLogin = new AnonymousLoginService(context);
    this.asset = new AssetService(context);
    this.authentication = new AuthenticationService(context);
    this.channel = new ChannelService(context);
    this.clientConfig = new ClientConfigService(context);
    this.customerConfig = new CustomerConfigService(context);
    this.devices = new DevicesService(context);
    this.documents = new DocumentsService(context);
    this.downloads = new DownloadsService(context);
    this.entitlements = new EntitlementsService(context);
    this.epg = new EpgService(context);
    this.event = new EventService(context);
    this.location = new LocationService(context);
    this.mrss = new MrssService(context);
    this.pinCodes = new PinCodesService(context);
    this.preferences = new PreferencesService(context);
    this.recommender = new RecommenderService(context);
    this.search = new SearchService(context);
    this.season = new SeasonService(context);
    this.store = new StoreService(context);
    this.system = new SystemService(context);
    this.tag = new TagService(context);
    this.time = new TimeService(context);
    this.user = new UserService(context);
    this.userPlayHistory = new UserPlayHistoryService(context);
    this.userProfiles = new UserProfilesService(context);
  }
}

export default RBMOTTSDK;
export type { ServiceContext };
export { request, ResponseError };
export * from "./data-contracts";
export * from "./AccountLabelsService";
export * from "./ActivationCodeDevicePairingService";
export * from "./AnonymousLoginService";
export * from "./AssetService";
export * from "./AuthenticationService";
export * from "./ChannelService";
export * from "./ClientConfigService";
export * from "./CustomerConfigService";
export * from "./DevicesService";
export * from "./DocumentsService";
export * from "./DownloadsService";
export * from "./EntitlementsService";
export * from "./EpgService";
export * from "./EventService";
export * from "./LocationService";
export * from "./MrssService";
export * from "./PinCodesService";
export * from "./PreferencesService";
export * from "./RecommenderService";
export * from "./SearchService";
export * from "./SeasonService";
export * from "./StoreService";
export * from "./SystemService";
export * from "./TagService";
export * from "./TimeService";
export * from "./UserService";
export * from "./UserPlayHistoryService";
export * from "./UserProfilesService";
