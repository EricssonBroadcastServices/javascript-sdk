import { ContentService } from "./content-service";
import { ServiceOptions } from "./base-service";
import axios from "axios";
import { mocks } from "../../test-utils/mocks";
import { AssetResponse, Asset, EpisodesResponse } from "../models/asset-model";
import { EpgResponse } from "../models/program-model";
import { epgDateFormatter } from "../utils/date";
import { SeasonResponse } from "../models/season-model";

const { customer, businessUnit } = mocks;
let getSpy: jest.SpyInstance;

describe("Content service", () => {
  const serviceOptions: ServiceOptions = {
    baseUrl: "https://testbaseurl.com",
    authHeader: () => ({ Authorization: "sessionToken" }),
  };
  const contentService = new ContentService(serviceOptions);
  beforeEach(() => {
    const mockReturnValue = {
      data: {
        items: [{}],
      },
    };
    jest.spyOn(axios, "post").mockReturnValue(Promise.resolve(mockReturnValue));
    getSpy = jest.spyOn(axios, "get").mockReturnValue(Promise.resolve(mockReturnValue));
  });
  it("should getAssets", async () => {
    let assets = await contentService.getAssets({
      customer,
      businessUnit,
    });
    expect(assets).toBeInstanceOf(AssetResponse);
    expect(axios.get).toHaveBeenCalledWith(
      `${serviceOptions.baseUrl}/v1/customer/CU/businessunit/BU/content/asset?fieldSet=ALL&onlyPublished=true&pageNumber=1&pageSize=30`,
      { headers: undefined }
    );

    assets = await contentService.getAssets({
      customer,
      businessUnit,
      pageNumber: 2,
      pageSize: 2,
    });
    expect(assets).toBeInstanceOf(AssetResponse);
    expect(axios.get).toHaveBeenCalledWith(
      `${serviceOptions.baseUrl}/v1/customer/CU/businessunit/BU/content/asset?fieldSet=ALL&onlyPublished=true&pageNumber=2&pageSize=2`,
      { headers: undefined }
    );
  });
  it("should get assetById", async () => {
    const asset = await contentService.getAssetById({
      customer,
      businessUnit,
      assetId: "123",
    });
    expect(asset).toBeInstanceOf(Asset);
    expect(axios.get).toBeCalledWith(
      "https://testbaseurl.com/v1/customer/CU/businessunit/BU/content/asset/123?fieldSet=ALL",
      {
        headers: undefined,
      }
    );
  });
  it("should get epg", async () => {
    let epg = await contentService.getEpg({
      customer,
      businessUnit,
      channelId: "123",
    });
    expect(epg).toBeInstanceOf(EpgResponse);
    expect(axios.get).toHaveBeenCalledWith(
      `https://testbaseurl.com/v2/customer/CU/businessunit/BU/epg/123/date/${epgDateFormatter(
        new Date()
      )}?daysBackward=1&daysForward=1&pageNumber=1&pageSize=500`,
      { headers: undefined }
    );

    epg = await contentService.getEpg({
      customer,
      businessUnit,
      channelId: "123",
      pageNumber: 3,
      pageSize: 1,
      daysBackward: 3,
      daysForward: 2,
      date: new Date(1577836800000),
    });
    expect(epg).toBeInstanceOf(EpgResponse);
    expect(axios.get).toHaveBeenCalledWith(
      "https://testbaseurl.com/v2/customer/CU/businessunit/BU/epg/123/date/2020-01-01?daysBackward=3&daysForward=2&pageNumber=3&pageSize=1",
      { headers: undefined }
    );
  });
  it("should get live events", async () => {
    let liveEvents = await contentService.getLiveEvents({
      customer,
      businessUnit,
      daysBackward: 1,
      daysForward: 2,
    });
    expect(liveEvents instanceof AssetResponse);
    expect(axios.get).toHaveBeenCalledWith(
      `https://testbaseurl.com/v2/customer/CU/businessunit/BU/event/date/${epgDateFormatter(
        new Date()
      )}?daysBackward=1&daysForward=2&pageNumber=1&pageSize=500&sort=startTime`,
      { headers: undefined }
    );

    liveEvents = await contentService.getLiveEvents({
      customer,
      businessUnit,
      pageNumber: 3,
      pageSize: 1,
      daysBackward: 3,
      daysForward: 2,
      date: new Date(1603843200000),
    });
    expect(liveEvents).toBeInstanceOf(AssetResponse);
    expect(axios.get).toHaveBeenCalledWith(
      "https://testbaseurl.com/v2/customer/CU/businessunit/BU/event/date/2020-10-28?daysBackward=3&daysForward=2&pageNumber=3&pageSize=1&sort=startTime",
      { headers: undefined }
    );
  });
  it("should get recently watched", async () => {
    const assets = await contentService.getRecentlyWatched({
      customer,
      businessUnit,
    });
    expect(assets).toBeInstanceOf(AssetResponse);
    expect(axios.get).toBeCalledWith(
      "https://testbaseurl.com/v1/customer/CU/businessunit/BU/userplayhistory/lastviewed?fieldSet=ALL&pageSize=24",
      { headers: serviceOptions.authHeader() }
    );
  });
  it("should get continue watching", async () => {
    const assets = await contentService.getContinueWatching({
      customer,
      businessUnit,
    });
    expect(assets).toBeInstanceOf(AssetResponse);
    expect(axios.get).toBeCalledWith(
      "https://testbaseurl.com/v1/customer/CU/businessunit/BU/recommend/continue?limit=10",
      {
        headers: serviceOptions.authHeader(),
      }
    );
  });
  it("should get recommended", async () => {
    const assets = await contentService.getRecommended({
      customer,
      businessUnit,
    });
    expect(assets).toBeInstanceOf(AssetResponse);
    expect(axios.get).toBeCalledWith("https://testbaseurl.com/v1/customer/CU/businessunit/BU/recommend/user", {
      headers: serviceOptions.authHeader(),
    });
  });
  it("should get bookmarks", async () => {
    getSpy.mockReturnValue(Promise.resolve({ data: { items: [{}] } }));
    const assets = await contentService.getBookmarks({
      customer,
      businessUnit,
    });
    expect(assets).toBeInstanceOf(Array);
    expect(axios.get).toBeCalledWith(
      "https://testbaseurl.com/v1/customer/CU/businessunit/BU/userplayhistory/lastviewedoffset",
      {
        headers: serviceOptions.authHeader(),
      }
    );
  });
  it("should get seasons for series", async () => {
    const seasons = await contentService.getSeasonsForSeries({
      customer,
      businessUnit,
      assetId: "123",
    });
    expect(seasons).toBeInstanceOf(SeasonResponse);
    expect(axios.get).toBeCalledWith(
      "https://testbaseurl.com/v1/customer/CU/businessunit/BU/content/asset/123/season",
      { headers: undefined }
    );
  });
  it("should get episodes for season", async () => {
    const episodes = await contentService.getEpisodesForSeason({
      customer,
      businessUnit,
      assetId: "123",
      seasonNumber: 1,
    });
    expect(episodes).toBeInstanceOf(EpisodesResponse);
    expect(axios.get).toBeCalledWith(
      "https://testbaseurl.com/v1/customer/CU/businessunit/BU/content/asset/123/season/1/episode?fieldSet=ALL&onlyPublished=true",
      { headers: undefined }
    );
  });
});
