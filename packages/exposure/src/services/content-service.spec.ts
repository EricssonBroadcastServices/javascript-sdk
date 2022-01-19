import { ContentService } from "./content-service";
import { ServiceOptions } from "./base-service";
import { mocks } from "../../test-utils/mocks";
import { Asset } from "../models/asset-model";
import { EpgResponse } from "../models/program-model";
import { epgDateFormatter } from "../utils/date";
import { SeasonResponse } from "../models/season-model";
import * as assetsJson from "../../test-utils/asset.json";
import * as epgJson from "../../test-utils/epg.json";
import * as eventJson from "../../test-utils/event.json";
import * as lastViewedOffsetJson from "../../test-utils/last-viewed-offset.json";
import * as seasonJson from "../../test-utils/season.json";
import nock from "nock";

const { customer, businessUnit } = mocks;

const baseUrl = "http://test.test";

describe("Content service", () => {
  const serviceOptions: ServiceOptions = {
    baseUrl: baseUrl,
    authHeader: () => ({ Authorization: "sessionToken" })
  };
  const contentService = new ContentService(serviceOptions);
  it("should getAssets", async () => {
    nock(baseUrl)
      .get("/v1/customer/CU/businessunit/BU/content/asset?fieldSet=ALL&onlyPublished=true&pageNumber=1&pageSize=30")
      .reply(200, assetsJson)
      .get("/v1/customer/CU/businessunit/BU/content/asset?fieldSet=ALL&onlyPublished=true&pageNumber=2&pageSize=2")
      .reply(200, assetsJson);
    const assets = await contentService.getAssets({
      customer,
      businessUnit
    });
    const expectedAssets = expect.objectContaining({
      pageSize: assetsJson.pageSize,
      pageNumber: assetsJson.pageNumber,
      totalCount: assetsJson.totalCount,
      items: assetsJson.items.map(a => expect.objectContaining({ assetId: a.assetId }))
    });
    assets.items.forEach(asset => expect(asset instanceof Asset));

    expect(assets).toEqual(expectedAssets);

    await contentService.getAssets({
      customer,
      businessUnit,
      pageNumber: 2,
      pageSize: 2
    });

    expect(assets).toEqual(expectedAssets);
  });
  it("should get assetById", async () => {
    nock(baseUrl)
      .get("/v1/customer/CU/businessunit/BU/content/asset/123?fieldSet=ALL")
      .reply(200, assetsJson.items[0]);
    const asset = await contentService.getAssetById({
      customer,
      businessUnit,
      assetId: "123"
    });
    expect(asset).toBeInstanceOf(Asset);
    expect(asset.assetId).toBe(assetsJson.items[0].assetId);
  });
  it("should get epg", async () => {
    nock(baseUrl)
      .get(
        `/v2/customer/CU/businessunit/BU/epg/123/date/${epgDateFormatter(
          new Date()
        )}?daysBackward=1&daysForward=1&pageNumber=1&pageSize=500`
      )
      .reply(200, epgJson)
      .get(
        "/v2/customer/CU/businessunit/BU/epg/123/date/2020-01-01?daysBackward=3&daysForward=2&pageNumber=3&pageSize=1"
      )
      .reply(200, epgJson);
    let epg = await contentService.getEpg({
      customer,
      businessUnit,
      channelId: "123"
    });
    const expectedEpg = expect.objectContaining({
      channelId: "7e20b78c_82162E"
      // TODO: expand expectation
    });
    expect(epg).toBeInstanceOf(EpgResponse);
    expect(epg).toEqual(expectedEpg);
    epg = await contentService.getEpg({
      customer,
      businessUnit,
      channelId: "123",
      pageNumber: 3,
      pageSize: 1,
      daysBackward: 3,
      daysForward: 2,
      date: new Date(1577836800000)
    });
    expect(epg).toBeInstanceOf(EpgResponse);
    expect(epg).toEqual(expectedEpg);
  });
  it("should get live events", async () => {
    nock(baseUrl)
      .get(
        `/v2/customer/CU/businessunit/BU/event/date/${epgDateFormatter(
          new Date()
        )}?daysBackward=1&daysForward=2&pageNumber=1&pageSize=500&sort=startTime`
      )
      .reply(200, eventJson)
      .get(
        "/v2/customer/CU/businessunit/BU/event/date/2020-10-28?daysBackward=3&daysForward=2&pageNumber=3&pageSize=1&sort=startTime"
      )
      .reply(200, eventJson);
    const events = await contentService.getLiveEvents({
      customer,
      businessUnit,
      daysBackward: 1,
      daysForward: 2
    });
    const expectedEvents = expect.objectContaining({
      items: expect.arrayContaining([expect.objectContaining({ assetId: eventJson.items[0].asset.assetId })])
    });

    expect(events).toEqual(expectedEvents);

    await contentService.getLiveEvents({
      customer,
      businessUnit,
      pageNumber: 3,
      pageSize: 1,
      daysBackward: 3,
      daysForward: 2,
      date: new Date(1603843200000)
    });
    expect(events).toEqual(expectedEvents);
  });
  it("should get recently watched", async () => {
    nock(baseUrl)
      .get("/v1/customer/CU/businessunit/BU/userplayhistory/lastviewed?fieldSet=ALL&pageSize=24")
      .reply(200, assetsJson);
    const assets = await contentService.getRecentlyWatched({
      customer,
      businessUnit
    });
    const expectedAssets = expect.objectContaining({
      pageSize: assetsJson.pageSize,
      pageNumber: assetsJson.pageNumber,
      totalCount: assetsJson.totalCount,
      items: assetsJson.items.map(a => expect.objectContaining({ assetId: a.assetId }))
    });
    expect(assets).toEqual(expectedAssets);
    assets.items.forEach(asset => expect(asset instanceof Asset));
  });
  it("should get continue watching", async () => {
    nock(baseUrl)
      .get("/v1/customer/CU/businessunit/BU/recommend/continue?limit=10")
      .reply(200, assetsJson);
    const assets = await contentService.getContinueWatching({
      customer,
      businessUnit
    });
    const expectedAssets = expect.objectContaining({
      items: assetsJson.items.map(a => expect.objectContaining({ assetId: a.assetId }))
    });
    expect(assets).toEqual(expectedAssets);
    assets.items.forEach(asset => expect(asset instanceof Asset));
  });
  it("should get recommended", async () => {
    nock(baseUrl)
      .get("/v1/customer/CU/businessunit/BU/recommend/user")
      .reply(200, assetsJson);
    const assets = await contentService.getRecommended({
      customer,
      businessUnit
    });
    const expectedAssets = expect.objectContaining({
      items: assetsJson.items.map(a => expect.objectContaining({ assetId: a.assetId }))
    });
    expect(assets).toEqual(expectedAssets);
    assets.items.forEach(asset => expect(asset instanceof Asset));
  });
  it("should get bookmarks", async () => {
    nock(baseUrl)
      .get("/v1/customer/CU/businessunit/BU/userplayhistory/lastviewedoffset")
      .reply(200, lastViewedOffsetJson);
    const assets = await contentService.getBookmarks({
      customer,
      businessUnit
    });
    expect(assets).toBeInstanceOf(Array);
    assets.forEach((a, i) => {
      expect(a).toEqual(lastViewedOffsetJson.items[i]);
    });
  });
  it("should get seasons for series", async () => {
    nock(baseUrl)
      .get("/v1/customer/CU/businessunit/BU/content/asset/123/season")
      .reply(200, seasonJson);
    const seasons = await contentService.getSeasonsForSeries({
      customer,
      businessUnit,
      assetId: "123"
    });
    expect(seasons).toBeInstanceOf(SeasonResponse);
    expect(seasons).toEqual({
      series: "123",
      items: expect.arrayContaining([
        expect.objectContaining({
          season: 1,
          seasonId: "c89e79dd-b0b6-40ac-bb31-41be3221d66c_82162E"
        })
      ])
    });
  });
  it("should get episodes for season", async () => {
    nock(baseUrl)
      .get("/v1/customer/CU/businessunit/BU/content/asset/123/season/1/episode?fieldSet=ALL&onlyPublished=true")
      .reply(200, assetsJson);
    const assets = await contentService.getEpisodesForSeason({
      customer,
      businessUnit,
      assetId: "123",
      seasonNumber: 1
    });
    const expectedAssets = expect.objectContaining({
      pageSize: assetsJson.pageSize,
      pageNumber: assetsJson.pageNumber,
      totalCount: assetsJson.totalCount,
      items: assetsJson.items.map(a => expect.objectContaining({ assetId: a.assetId }))
    });
    assets.items.forEach(asset => expect(asset instanceof Asset));

    expect(assets).toEqual(expectedAssets);
  });
});
