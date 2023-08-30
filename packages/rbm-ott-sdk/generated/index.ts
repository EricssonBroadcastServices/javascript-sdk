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
  asset: AssetService;
  authentication: AuthenticationService;
  carousel: CarouselService;
  clientConfig: ClientConfigService;
  customerConfig: CustomerConfigService;
  device: DeviceService;
  document: DocumentService;
  downloads: DownloadsService;
  entitlements: EntitlementsService;
  epg: EpgService;
  event: EventService;
  eventSink: EventSinkService;
  location: LocationService;
  preferences: PreferencesService;
  rating: RatingService;
  recommender: RecommenderService;
  search: SearchService;
  season: SeasonService;
  store: StoreService;
  system: SystemService;
  tag: TagService;
  time: TimeService;
  user: UserService;
  userPlayHistory: UserPlayHistoryService
  constructor(public context: ServiceContext) {
    this.asset = new AssetService(context);
    this.authentication = new AuthenticationService(context);
    this.carousel = new CarouselService(context);
    this.clientConfig = new ClientConfigService(context);
    this.customerConfig = new CustomerConfigService(context);
    this.device = new DeviceService(context);
    this.document = new DocumentService(context);
    this.downloads = new DownloadsService(context);
    this.entitlements = new EntitlementsService(context);
    this.epg = new EpgService(context);
    this.event = new EventService(context);
    this.eventSink = new EventSinkService(context);
    this.location = new LocationService(context);
    this.preferences = new PreferencesService(context);
    this.rating = new RatingService(context);
    this.recommender = new RecommenderService(context);
    this.search = new SearchService(context);
    this.season = new SeasonService(context);
    this.store = new StoreService(context);
    this.system = new SystemService(context);
    this.tag = new TagService(context);
    this.time = new TimeService(context);
    this.user = new UserService(context);
    this.userPlayHistory = new UserPlayHistoryService(context)
  }
}

export { AssetService, AuthenticationService, CarouselService, ClientConfigService, CustomerConfigService, DeviceService, DocumentService, DownloadsService, EntitlementsService, EpgService, EventService, EventSinkService, LocationService, PreferencesService, RatingService, RecommenderService, SearchService, SeasonService, StoreService, SystemService, TagService, TimeService, UserService, UserPlayHistoryService };
export default APIService;
export * from "./data-contracts";
