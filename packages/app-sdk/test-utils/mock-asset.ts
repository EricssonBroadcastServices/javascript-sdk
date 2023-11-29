// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Asset } from "@ericssonbroadcastservices/rbm-ott-sdk";

export const mockAsset: Asset = {
  assetId: "9086ffab-377f-4e2f-84dc-a597e6a2e8a8_82162E",
  audioTracks: ["en"],
  changed: "2023-08-02T09:38:07.828Z",
  created: "2020-08-11T10:18:50.774Z",
  customData: null,
  externalReferences: [
    {
      locator: "https://cloud.blender.org/p/cosmos-laundromat/",
      type: "Creator's website",
      value: "b93fcf4b-ddb2-41af-bd6f-7bdb24e92c5c"
    }
  ],
  linkedEntities: [
    {
      entityId: "6d84994b-504a-4b1c-ba60-a401ef0c81d9_82162E",
      entityType: "ASSET",
      linkType: "TRAILER"
    }
  ],
  live: false,
  localized: [
    {
      description: "enDesc",
      images: [
        {
          height: 1200,
          orientation: "PORTRAIT",
          type: "poster",
          url: "enPosterImage.jpg",
          width: 848
        },
        {
          height: 720,
          orientation: "LANDSCAPE",
          type: "banner",
          url: "enLandscapeImage.jpg",
          width: 1280
        },
        {
          height: 720,
          orientation: "LANDSCAPE",
          type: "someothertype",
          url: "enLandscapeImage2.jpg",
          width: 1280
        }
      ],
      locale: "en",
      longDescription: "enLongDesc",
      shortDescription: "enShortDesc",
      sortingTitle: "A2",
      title: "enTitle"
    },
    {
      description: "frDesc",
      images: [],
      locale: "fr",
      longDescription: "frLongDesc",
      shortDescription: "frShortDesc",
      sortingTitle: "Cosmos Laundromat",
      title: "frTitle"
    },
    {
      description: "svDesc",
      images: [],
      locale: "sv",
      longDescription: "svLongDesc",
      shortDescription: "svShortDesc",
      sortingTitle: "Cosmos Laundromat",
      title: "svTitle"
    }
  ],
  parentalRatings: [
    {
      country: "BR",
      rating: "12",
      scheme: "Age"
    },
    {
      country: "SE",
      rating: "11",
      scheme: "Age"
    }
  ],
  participants: [
    {
      function: "actor",
      name: "Pierre Bokma",
      role: "Franck",
      localized: []
    },
    {
      function: "actor",
      name: "Reinout Scholten van Aschat ",
      role: "Victor",
      localized: []
    },
    {
      function: "Director",
      name: "Mathieu Auvray",
      role: "Director",
      localized: []
    },
    {
      function: "Writer",
      name: "Esther Wouda",
      role: "Writer",
      localized: []
    },
    {
      function: "Producer",
      name: "Ton Roosendaal",
      role: "Producer",
      localized: []
    }
  ],
  productionCountries: ["NL", "US"],
  productionYear: 2015,
  publications: [
    {
      countries: [],
      customData: null,
      devices: [],
      fromDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // one week ago
      products: ["rental-tvod_82162E", "d49b896d-98a0-4c73-ae09-7b6bce2fd364_82162E", "1min1_82162E"],
      availabilityKeys: [
        "rental-tvod_82162E",
        "9086ffab-377f-4e2f-84dc-a597e6a2e8a8_82162E_rental-tvod_82162E",
        "d49b896d-98a0-4c73-ae09-7b6bce2fd364_82162E",
        "9086ffab-377f-4e2f-84dc-a597e6a2e8a8_82162E_d49b896d-98a0-4c73-ae09-7b6bce2fd364_82162E",
        "1min1_82162E",
        "9086ffab-377f-4e2f-84dc-a597e6a2e8a8_82162E_1min1_82162E"
      ],
      publicationDate: "2020-08-11T10:21:00Z",
      publicationId: "2442e694-8d00-4553-b33f-27b17ceb106f_82162E",
      services: [],
      toDate: "2025-08-11T10:21:00Z"
    },
    {
      countries: [],
      customData: null,
      devices: [],
      fromDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // one week from now
      products: ["free_product_82162E"],
      availabilityKeys: ["free_product_82162E", "9086ffab-377f-4e2f-84dc-a597e6a2e8a8_82162E_free_product_82162E"],
      publicationDate: "2021-11-17T18:21:00Z",
      publicationId: "1e6a5490-fddb-41a2-ab66-11159aa865ff_82162E",
      services: [],
      toDate: "2026-11-17T18:21:00Z"
    }
  ],
  studio: "Blender foundation",
  spokenLanguages: [],
  subtitles: [],
  tags: [
    {
      tagValues: [
        {
          tagId: "free_82162E"
        },
        {
          tagId: "2d-animation_82162E"
        },
        {
          tagId: "animationtv_82162E"
        }
      ],
      type: "other"
    },
    {
      tagValues: [
        {
          tagId: "entertainment_82162E"
        },
        {
          tagId: "movies_82162E"
        }
      ],
      type: "genre"
    }
  ],
  type: "MOVIE",
  duration: 730500,
  overlayWidgets: [
    {
      url: "https://ps-vemup-ctl.cdn.redbee.live/imagescaler002/bscu/bsbu/configimages/c1b61998-a9d6-4827-b07b-6ad5b35ba1d1.jpg?format=webp&h=200"
    }
  ],
  slugs: [],
  markerPoints: [],
  cuePoints: [],
  collections: [],
  assetFeatures: [
    {
      id: "dolby-atmos",
      images: [
        {
          url: "https://ps-vemup-ctl.cdn.redbee.live/imagescaler002/global-assets/mprop/DLB_Atms_vert_rgb_wht_@2x.png",
          selectors: ["light", "vertical"]
        },
        {
          url: "https://ps-vemup-ctl.cdn.redbee.live/imagescaler002/global-assets/mprop/DLB_Atms_vert_rgb_blk_@2x.png",
          selectors: ["dark", "vertical"]
        },
        {
          url: "https://ps-vemup-ctl.cdn.redbee.live/imagescaler002/global-assets/mprop/DLB_Atms_horz_rgb_blk_@2x.png",
          selectors: ["dark", "horizontal"]
        },
        {
          url: "https://ps-vemup-ctl.cdn.redbee.live/imagescaler002/global-assets/mprop/DLB_Atms_horz_rgb_wht_@2x.png",
          selectors: ["light", "horizontal"]
        }
      ]
    }
  ]
};

export const mockAssetEmptyLocalized = { ...mockAsset, localized: [] };
