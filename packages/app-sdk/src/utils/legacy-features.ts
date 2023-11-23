/* Legacy feature toggles from the whitelabelinternalapi. All carousel features will be irrelevant
once team meta provides an asset page endpoint */

export enum Feature {
  // carousels on assetPage
  TRAILERS_CAROUSEL,
  RELATED_CAROUSEL,
  OTHERS_HAVE_WATCHED_CAROUSEL,
  ASSET_PAGE_EPG,
  SEASON_CAROUSEL,
  TAG_IDS_CAROUSELS,

  // other
  ONLY_PLAYABLE_IN_CAROUSELS
}

export enum FeatureDeviceGroup {
  ASSET_DISPLAY_DECORATE_EPISODE
}

interface IFeatureToggles {
  [key: number]: {
    default: boolean;
    [customer: string]: boolean;
  };
}

export const FeatureToggles: IFeatureToggles = {
  [Feature.TRAILERS_CAROUSEL]: {
    default: true
  },
  [Feature.RELATED_CAROUSEL]: {
    default: true,
    ShortlyFilm: false,
    VVALSCU: false,
    FolkOchKultur: false,
    RondjeHazesCU: false,
    FabriQ: false,
    Segmenta: false
  },
  [Feature.OTHERS_HAVE_WATCHED_CAROUSEL]: {
    default: false,
    BSCU: true,
    RedBee: true,
    Ekstraklasa: true
  },
  [Feature.ASSET_PAGE_EPG]: {
    default: true,
    RondjeHazesCU: false,
    FabriQ: false,
    Segmenta: false,
    "67PallMall": false
  },
  [Feature.SEASON_CAROUSEL]: {
    default: false,
    FondazioneMusica: true,
    BSCU: true,
    IXMedia: true,
    TogetherTV: true,
    Nova: false
  },
  [Feature.ONLY_PLAYABLE_IN_CAROUSELS]: {
    default: true,
    Ekstraklasa: false,
    Fightzone: false
  },
  [Feature.TAG_IDS_CAROUSELS]: {
    default: true,
    WOTNTV: false,
    Nova: false
  }
};

export function isFeatureEnabled(key: Feature, customer: string) {
  const feature = FeatureToggles[key];
  if (feature) {
    if (feature.hasOwnProperty(customer)) {
      return feature[customer];
    }
    return feature.default;
  }
  return false;
}
