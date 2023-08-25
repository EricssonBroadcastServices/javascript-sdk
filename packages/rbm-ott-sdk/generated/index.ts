import { ServiceContext } from "./http-client"
import TimeService from "./Time"
import LocationService from "./Location"
import SystemService from "./System"
import StoreService from "./Store"
import CustomerConfigService from "./CustomerConfig"
import EventSinkService from "./EventSink"
import DocumentService from "./Document"
import ClientConfigService from "./ClientConfig"
import DeviceService from "./Device"
import EventService from "./Event"
import DownloadsService from "./Downloads"
import PreferencesService from "./Preferences"
import CarouselService from "./Carousel"
import EpgService from "./Epg"
import EntitlementsService from "./Entitlements"
import AssetService from "./Asset"
import TagService from "./Tag"
import RatingService from "./Rating"
import AuthenticationService from "./Authentication"
import RecommenderService from "./Recommender"
import SeasonService from "./Season"
import UserPlayHistoryService from "./UserPlayHistory"
import UserService from "./User"
import SearchService from "./Search"


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