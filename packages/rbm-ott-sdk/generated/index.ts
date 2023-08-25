import { AssetService } from "./Asset"
import { AuthenticationService } from "./Authentication"
import { CarouselService } from "./Carousel"
import { ClientConfigService } from "./ClientConfig"
import { CustomerConfigService } from "./CustomerConfig"
import { DeviceService } from "./Device"
import { DocumentService } from "./Document"
import { DownloadsService } from "./Downloads"
import { EntitlementsService } from "./Entitlements"
import { EpgService } from "./Epg"
import { EventService } from "./Event"
import { EventSinkService } from "./EventSink"
import { LocationService } from "./Location"
import { PreferencesService } from "./Preferences"
import { RatingService } from "./Rating"
import { RecommenderService } from "./Recommender"
import { SearchService } from "./Search"
import { SeasonService } from "./Season"
import { StoreService } from "./Store"
import { SystemService } from "./System"
import { TagService } from "./Tag"
import { TimeService } from "./Time"
import { UserService } from "./User"
import { UserPlayHistoryService } from "./UserPlayHistory"
import { ServiceContext } from "./http-client"

class APIService {
  asset: ReturnType<typeof AssetService>;
  authentication: ReturnType<typeof AuthenticationService>;
  carousel: ReturnType<typeof CarouselService>;
  clientConfig: ReturnType<typeof ClientConfigService>;
  customerConfig: ReturnType<typeof CustomerConfigService>;
  device: ReturnType<typeof DeviceService>;
  document: ReturnType<typeof DocumentService>;
  downloads: ReturnType<typeof DownloadsService>;
  entitlements: ReturnType<typeof EntitlementsService>;
  epg: ReturnType<typeof EpgService>;
  event: ReturnType<typeof EventService>;
  eventSink: ReturnType<typeof EventSinkService>;
  location: ReturnType<typeof LocationService>;
  preferences: ReturnType<typeof PreferencesService>;
  rating: ReturnType<typeof RatingService>;
  recommender: ReturnType<typeof RecommenderService>;
  search: ReturnType<typeof SearchService>;
  season: ReturnType<typeof SeasonService>;
  store: ReturnType<typeof StoreService>;
  system: ReturnType<typeof SystemService>;
  tag: ReturnType<typeof TagService>;
  time: ReturnType<typeof TimeService>;
  user: ReturnType<typeof UserService>;
  userPlayHistory: ReturnType<typeof UserPlayHistoryService>
  constructor(public context: ServiceContext) {
    this.asset = AssetService(context);
    this.authentication = AuthenticationService(context);
    this.carousel = CarouselService(context);
    this.clientConfig = ClientConfigService(context);
    this.customerConfig = CustomerConfigService(context);
    this.device = DeviceService(context);
    this.document = DocumentService(context);
    this.downloads = DownloadsService(context);
    this.entitlements = EntitlementsService(context);
    this.epg = EpgService(context);
    this.event = EventService(context);
    this.eventSink = EventSinkService(context);
    this.location = LocationService(context);
    this.preferences = PreferencesService(context);
    this.rating = RatingService(context);
    this.recommender = RecommenderService(context);
    this.search = SearchService(context);
    this.season = SeasonService(context);
    this.store = StoreService(context);
    this.system = SystemService(context);
    this.tag = TagService(context);
    this.time = TimeService(context);
    this.user = UserService(context);
    this.userPlayHistory = UserPlayHistoryService(context)
  }
}

export { AssetService, AuthenticationService, CarouselService, ClientConfigService, CustomerConfigService, DeviceService, DocumentService, DownloadsService, EntitlementsService, EpgService, EventService, EventSinkService, LocationService, PreferencesService, RatingService, RecommenderService, SearchService, SeasonService, StoreService, SystemService, TagService, TimeService, UserService, UserPlayHistoryService };
export default APIService;
export * from "./data-contracts";
