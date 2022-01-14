import axios from "axios";
import { IHttpOptions } from "../src";
import { DeviceType } from "../src/interfaces/device";

export const mocks = {
  customer: "CU",
  businessUnit: "BU",
  tagId1: "tagId1",
  device: {
    height: 0,
    width: 0,
    type: "WEB" as DeviceType,
    name: "name",
    deviceId: "123"
  }
};

export const mockHttpOptions: IHttpOptions = {
  client: axios,
  errorMapper: () => ({ message: "Oh no!", httpCode: 500 })
};
