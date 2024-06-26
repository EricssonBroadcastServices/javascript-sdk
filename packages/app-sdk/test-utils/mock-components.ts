import {
  IExposureWLCarousel,
  IExposureWLHerobannerItem,
  IExposureWLImageComponent
} from "../src/interfaces/exposure-wl-component";

export const mockWLCarousel: IExposureWLCarousel = {
  id: "c225a4a3-14a7-4c90-99e8-74d958236502",
  created: "2020-05-07T14:08:24.352Z",
  changed: "2023-05-29T14:19:48.9Z",
  name: "Home - Shortfilms Carousel",
  appType: "carousel",
  appSubType: "TagsQuery",
  presentation: {
    fallback: {
      title: "Animated shorts",
      subTitle: "A bunch of animated shortfilms",
      images: []
    },
    localized: {
      sv: {
        title: "Animerade kortfilmer"
      },
      en: {
        title: "Animated shorts",
        subTitle: "A bunch of animated shortfilms",
        images: []
      },
      fr: {
        title: "Courts métrages d'animation"
      },
      nl: {
        title: "Korte animatiefilms"
      }
    }
  },
  actions: {},
  contentUrl: {
    type: "AssetQuery",
    url: "/v1/customer/BSCU/businessunit/BSBU/content/asset?query=%28tagIds%3A2d-animation_82162E+OR+tagIds%3A3d-animation_82162E%29&sort=localized.en.sortingTitle&pageSize=140&playableWithinHours=0&fieldSet=ALL",
    authorized: false
  },
  parameters: {
    assetSearchTypes: "MOVIE,TV_SHOW,EPISODE,TV_CHANNEL,LIVE_EVENT,EVENT",
    assetTitles: "show"
  }
};

export const mockImageComponent: IExposureWLImageComponent = {
  id: "1d2ed691-da31-46a1-b0c4-32169277cc8e",
  created: "2021-03-22T12:31:41.202Z",
  changed: "2023-05-23T09:00:01.699Z",
  name: "Simon's image",
  appType: "image",
  presentation: {
    fallback: {
      title: "Blender",
      body: "Everyone should be free to create 3D CG content, with free technical and creative production means and free access to markets.",
      images: [
        {
          url: "aFallbackImage.jpg",
          tags: ["image"],
          height: 1080,
          width: 1920
        }
      ]
    },
    localized: {
      en: {
        title: "Blender",
        body: "Everyone should be free to create 3D CG content, with free technical and creative production means and free access to markets.",
        images: [
          {
            url: "anImage.jpg",
            tags: ["image"],
            height: 1080,
            width: 1920
          },
          {
            url: "anOtherImage.jpg",
            tags: ["anothertag"],
            height: 1080,
            width: 1920
          }
        ]
      },
      sv: {
        title: "Blender",
        body: "En svensk beskrivning",
        images: [
          {
            url: "enSvenskBild.jpg",
            tags: ["image"],
            height: 1080,
            width: 1920
          }
        ]
      }
    }
  },
  actions: {
    default: {
      type: "ExternalUrlAction",
      verb: "ExternalLink",
      url: "https://www.blender.org/"
    }
  },
  parameters: {
    assetSearchTypes: "MOVIE,TV_SHOW,EPISODE,TV_CHANNEL,LIVE_EVENT,EVENT"
  }
};

export const mockEpgCarousel: IExposureWLCarousel = {
  id: "1de25d1f-e64f-4d2c-bd40-5a7dff28c53e",
  created: "2023-09-21T19:02:37.488Z",
  changed: "2023-09-21T19:02:37.488Z",
  name: "svtepg",
  appType: "carousel",
  appSubType: "Epg",
  presentation: {
    fallback: {
      title: "SVT"
    },
    localized: {
      en: {
        title: "SVT"
      }
    }
  },
  actions: {},
  contentUrl: {
    type: "ChannelEpg",
    url: "/v2/customer/BSCU/businessunit/BSBU/epg/89bff8fb_82162E/date/2023-10-03?daysBackward=0&daysForward=0&pageSize=1000",
    authorized: false
  },
  parameters: {
    assetSearchTypes: "MOVIE,TV_SHOW,EPISODE,TV_CHANNEL,LIVE_EVENT,EVENT"
  }
};

export const mockHerobannerItemFromAsset: IExposureWLHerobannerItem = {
  appType: "herobanner_item",
  appSubType: "Asset",
  presentation: {
    fallback: {
      body: "   "
    },
    localized: {
      it: {
        body: "   "
      }
    }
  },
  actions: {
    default: {
      type: "AssetAction",
      verb: "NavigateToDetails",
      assetId: "f8c17c6d-d05e-4717-a185-7c625a8dc661_AEBE0Fc",
      slugs: ["the-undertaker"]
    }
  },
  content: {
    type: "PresentationFromAsset",
    presentation: {
      fallback: {
        title: "The Undertaker",
        body: "   ",
        images: [
          {
            url: "https://AEBE0Fc-az-westeurope-fsly.cdn.redbee.live/imagescaler002/ixmedia/assets/f8c17c6d-d05e-4717-a185-7c625a8dc661_AEBE0Fc/posters/dc28986b1d9a4289b0a12f6f6c5cf041/dc28986b1d9a4289b0a12f6f6c5cf041.jpg",
            orientation: "LANDSCAPE",
            tags: ["cover"],
            height: 1080,
            width: 1920
          },
          {
            url: "https://AEBE0Fc-az-westeurope-fsly.cdn.redbee.live/imagescaler002/ixmedia/assets/f8c17c6d-d05e-4717-a185-7c625a8dc661_AEBE0Fc/posters/6fa971becf119299f1109d4ed3b8ae4b/6fa971becf119299f1109d4ed3b8ae4b.jpg",
            orientation: "PORTRAIT",
            tags: ["cover"],
            height: 1200,
            width: 800
          }
        ],
        trailerAssetId: "b7b6c343-90e9-40b4-be50-ef11f0149c91_AEBE0Fc"
      },
      localized: {
        it: {
          title: "The Undertaker",
          body: "   ",
          images: [
            {
              url: "https://AEBE0Fc-az-westeurope-fsly.cdn.redbee.live/imagescaler002/ixmedia/assets/f8c17c6d-d05e-4717-a185-7c625a8dc661_AEBE0Fc/posters/6fa971becf119299f1109d4ed3b8ae4b/6fa971becf119299f1109d4ed3b8ae4b.jpg",
              orientation: "PORTRAIT",
              tags: ["cover"],
              height: 1200,
              width: 800
            },
            {
              url: "https://AEBE0Fc-az-westeurope-fsly.cdn.redbee.live/imagescaler002/ixmedia/assets/f8c17c6d-d05e-4717-a185-7c625a8dc661_AEBE0Fc/posters/dc28986b1d9a4289b0a12f6f6c5cf041/dc28986b1d9a4289b0a12f6f6c5cf041.jpg",
              orientation: "LANDSCAPE",
              tags: ["cover"],
              height: 1080,
              width: 1920
            }
          ],
          trailerAssetId: "b7b6c343-90e9-40b4-be50-ef11f0149c91_AEBE0Fc"
        }
      }
    }
  }
};

export const mockHerobannerItem: IExposureWLHerobannerItem = {
  appType: "herobanner_item",
  appSubType: "Asset",
  presentation: {
    fallback: {
      body: "   "
    },
    localized: {
      it: {
        body: "   ",
        title: "just testing",
        trailerAssetId: "123"
      }
    }
  },
  content: {},
  actions: {
    default: {
      type: "AssetAction",
      verb: "NavigateToDetails",
      assetId: "f8c17c6d-d05e-4717-a185-7c625a8dc661_AEBE0Fc",
      slugs: ["the-undertaker"]
    }
  }
};
