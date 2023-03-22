export enum DeviceType {
  WEB = "WEB",
  MOBILE = "MOBILE",
  TABLET = "TABLET",
  SMART_TV = "SMART_TV",
  APPLE_TV = "APPLE_TV",
  CONSOLE = "CONSOLE",
  STB = "STB"
}

export interface IDeviceInfo {
  type: DeviceType;
  /**
   * The user's name of the device.
   */
  name: string;
  deviceId: string;
}
