export enum DeviceType {
  WEB = "WEB",
  SMART_TV = "SMART_TV"
}

export interface IDeviceInfo {
  type: DeviceType;
  name: string;
  deviceId: string;
}
