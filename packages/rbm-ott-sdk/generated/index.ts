export * from "./data-contracts";
export { ServiceContext } from "./http-client"
export TimeService from "./Time"
export LocationService from "./Location"
export SystemService from "./System"
export StoreService from "./Store"
export CustomerConfigService from "./CustomerConfig"
export EventSinkService from "./EventSink"
export DocumentService from "./Document"
export ClientConfigService from "./ClientConfig"
export DeviceService from "./Device"
export EventService from "./Event"
export DownloadsService from "./Downloads"
export PreferencesService from "./Preferences"
export CarouselService from "./Carousel"
export EpgService from "./Epg"
export EntitlementsService from "./Entitlements"
export AssetService from "./Asset"
export TagService from "./Tag"
export RatingService from "./Rating"
export AuthenticationService from "./Authentication"
export RecommenderService from "./Recommender"
export SeasonService from "./Season"
export UserPlayHistoryService from "./UserPlayHistory"
export UserService from "./User"
export SearchService from "./Search"


class APIService {
  time: ReturnType<typeof TimeService>;
  location: ReturnType<typeof LocationService>;
  system: ReturnType<typeof SystemService>;
  store: ReturnType<typeof StoreService>;
  customerConfig: ReturnType<typeof CustomerConfigService>;
  eventSink: ReturnType<typeof EventSinkService>;
  document: ReturnType<typeof DocumentService>;
  clientConfig: ReturnType<typeof ClientConfigService>;
  device: ReturnType<typeof DeviceService>;
  event: ReturnType<typeof EventService>;
  downloads: ReturnType<typeof DownloadsService>;
  preferences: ReturnType<typeof PreferencesService>;
  carousel: ReturnType<typeof CarouselService>;
  epg: ReturnType<typeof EpgService>;
  entitlements: ReturnType<typeof EntitlementsService>;
  asset: ReturnType<typeof AssetService>;
  tag: ReturnType<typeof TagService>;
  rating: ReturnType<typeof RatingService>;
  authentication: ReturnType<typeof AuthenticationService>;
  recommender: ReturnType<typeof RecommenderService>;
  season: ReturnType<typeof SeasonService>;
  userPlayHistory: ReturnType<typeof UserPlayHistoryService>;
  user: ReturnType<typeof UserService>;
  search: ReturnType<typeof SearchService>
  constructor(public context: ServiceContext) {
    this.time = TimeService(context);
    this.location = LocationService(context);
    this.system = SystemService(context);
    this.store = StoreService(context);
    this.customerConfig = CustomerConfigService(context);
    this.eventSink = EventSinkService(context);
    this.document = DocumentService(context);
    this.clientConfig = ClientConfigService(context);
    this.device = DeviceService(context);
    this.event = EventService(context);
    this.downloads = DownloadsService(context);
    this.preferences = PreferencesService(context);
    this.carousel = CarouselService(context);
    this.epg = EpgService(context);
    this.entitlements = EntitlementsService(context);
    this.asset = AssetService(context);
    this.tag = TagService(context);
    this.rating = RatingService(context);
    this.authentication = AuthenticationService(context);
    this.recommender = RecommenderService(context);
    this.season = SeasonService(context);
    this.userPlayHistory = UserPlayHistoryService(context);
    this.user = UserService(context);
    this.search = SearchService(context)
  }
}

export default APIService;