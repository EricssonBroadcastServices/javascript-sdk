interface SamsungConfig {
  appName: string;
  appIdentifier: string;
  appBundle: string;
  appStoreUrl: string;
  images: {
    splashScreenImage: string;
    appIcon: string;
  };
}

interface LGConfig {
  appName: string;
  appIdentifier: string;
  appBundle: string;
  appStoreUrl: string;
  tileBackgroundColor: string;
  images: {
    splashScreenImage: string;
    appIcon: string;
  };
}

interface TvOSConfig {
  teamId: string;
  teamName: string;
  itcTeamId: string;
  appName: string;
  appIdentifier: string;
  splashColor: string;
  images: {
    appIconBackgroundImage: string;
    appIcon: string;
    topShelfImage: string;
  };
}

interface AndroidConfig {
  appName: string;
  appIdentifier: string;
  splashColor: string;
  images: {
    splashScreenImage: string;
    appIcon: string;
    tvBannerIcon: string;
  };
}

export interface AppConfig {
  Samsung: SamsungConfig;
  LG: LGConfig;
  tvOS: TvOSConfig;
  android: AndroidConfig;
}
