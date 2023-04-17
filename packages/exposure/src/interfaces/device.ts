export const DeviceType = {
  WEB: "WEB",
  MOBILE: "MOBILE",
  TABLET: "TABLET",
  SMART_TV: "SMART_TV",
  APPLE_TV: "APPLE_TV",
  CONSOLE: "CONSOLE",
  STB: "STB"
} as const;
export type DeviceType = typeof DeviceType[keyof typeof DeviceType];

export interface IDeviceInfo {
  type: DeviceType;
  /**
   * The user's name of the device.
   */
  name: string;
  deviceId: string;
}
