export const DeviceGroup = {
  WEB: "WEB",
  WEB_TV: "WEB_TV",
  MOBILE: "MOBILE",
  TABLET: "TABLET",
  TV: ""
} as const;
export type DeviceGroup = typeof DeviceGroup[keyof typeof DeviceGroup];
