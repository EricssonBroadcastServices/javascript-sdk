export const DeviceGroup = {
  WEB: "web",
  WEB_TV: "web_tv",
  MOBILE: "mobile",
  TABLET: "tablet",
  TV: "tv"
} as const;
export type DeviceGroup = typeof DeviceGroup[keyof typeof DeviceGroup];
