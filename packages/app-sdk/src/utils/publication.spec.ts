import { PublicationUtils } from "./publication";
import {
  blockedPublication,
  publicationsJson,
  publicationsJsonOnlyActive,
  publicationsJsonOnlyFuture
} from "../../test-utils/mockPublication";

describe("Publication", () => {
  it("is active or not active", () => {
    expect(PublicationUtils.isActive(publicationsJson[0])).toBe(true);
    expect(PublicationUtils.isActive(publicationsJson[1])).toBe(false);
    expect(PublicationUtils.isActive(publicationsJson[2])).toBe(false);
  });
  it("is expired", () => {
    expect(PublicationUtils.isExpired(publicationsJson[2])).toBe(true);
    expect(PublicationUtils.isExpired(publicationsJson[1])).toBe(false);
  });
  it("in future", () => {
    expect(PublicationUtils.inFuture(publicationsJson[1])).toBe(true);
    expect(PublicationUtils.inFuture(publicationsJson[0])).toBe(false);
  });
  it("all in future", () => {
    expect(PublicationUtils.allInFuture([publicationsJson[1], publicationsJson[1], publicationsJson[1]])).toBe(true);
    expect(PublicationUtils.allInFuture([publicationsJson[0], publicationsJson[1], publicationsJson[1]])).toBe(false);
    expect(PublicationUtils.allInFuture([])).toBe(false);
  });
  it("get active publication", () => {
    expect(PublicationUtils.getActivePublications(publicationsJson).length).toBe(1);
  });
  it("is geoblocked", () => {
    expect(PublicationUtils.isGeoBlocked([blockedPublication], "US")).toBe(true);
    expect(PublicationUtils.isGeoBlocked([blockedPublication, publicationsJson[0]], "US")).toBe(false);
  });
  it("get next publications", () => {
    const next = PublicationUtils.getNextPublications(publicationsJson);
    expect(next.length).toBe(1);
    expect(next[0].publicationId).toEqual("dc3c8e9f-6f52-4639-a2c1-746c79dd2737_629E11");
    const nextOnlyInFuture = PublicationUtils.getNextPublications(publicationsJsonOnlyFuture);
    expect(nextOnlyInFuture.length).toBe(1);
    expect(nextOnlyInFuture[0].publicationId).toEqual("6a11cc4b-d169-4501-a0e0-af2398a5cc53_629E11");
  });
  it("get availability keys", () => {
    expect(PublicationUtils.getAvailabilityKeys(publicationsJsonOnlyActive).sort()).toEqual(["a1", "a2", "a3"]);
    expect(PublicationUtils.getAvailabilityKeys(publicationsJsonOnlyFuture).sort()).toEqual(["a1", "a2"]);
  });
});
