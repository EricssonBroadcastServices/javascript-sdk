import { publicationUtils } from "..";
import {
  blockedPublication,
  publicationsJson,
  publicationsJsonOnlyActive,
  publicationsJsonOnlyFuture
} from "../../test-utils/mockPublication";

describe("Publication", () => {
  it("is active or not active", () => {
    expect(publicationUtils.isActive(publicationsJson[0])).toBe(true);
    expect(publicationUtils.isActive(publicationsJson[1])).toBe(false);
    expect(publicationUtils.isActive(publicationsJson[2])).toBe(false);
  });
  it("is expired", () => {
    expect(publicationUtils.isExpired(publicationsJson[2])).toBe(true);
    expect(publicationUtils.isExpired(publicationsJson[1])).toBe(false);
  });
  it("in future", () => {
    expect(publicationUtils.inFuture(publicationsJson[1])).toBe(true);
    expect(publicationUtils.inFuture(publicationsJson[0])).toBe(false);
  });
  it("all in future", () => {
    expect(publicationUtils.allInFuture([publicationsJson[1], publicationsJson[1], publicationsJson[1]])).toBe(true);
    expect(publicationUtils.allInFuture([publicationsJson[0], publicationsJson[1], publicationsJson[1]])).toBe(false);
    expect(publicationUtils.allInFuture([])).toBe(false);
  });
  it("get active publication", () => {
    expect(publicationUtils.getActivePublications(publicationsJson).length).toBe(1);
  });
  it("is geoblocked", () => {
    expect(
      publicationUtils.isGeoBlocked([blockedPublication], {
        countryCode: "US",
        locationKnown: true
      })
    ).toBe(true);
    expect(
      publicationUtils.isGeoBlocked([blockedPublication, publicationsJson[0]], {
        countryCode: "US",
        locationKnown: true
      })
    ).toBe(false);
    expect(publicationUtils.isGeoBlocked([blockedPublication], null)).toBe(false);
  });
  it("get next publications", () => {
    const next = publicationUtils.getNextPublications(publicationsJson);
    expect(next.length).toBe(1);
    expect(next[0].publicationId).toEqual("dc3c8e9f-6f52-4639-a2c1-746c79dd2737_629E11");
    const nextOnlyInFuture = publicationUtils.getNextPublications(publicationsJsonOnlyFuture);
    expect(nextOnlyInFuture.length).toBe(1);
    expect(nextOnlyInFuture[0].publicationId).toEqual("6a11cc4b-d169-4501-a0e0-af2398a5cc53_629E11");
  });
  it("get availability keys", () => {
    expect(publicationUtils.getAvailabilityKeys(publicationsJsonOnlyActive).sort()).toEqual(["a1", "a2", "a3"]);
    expect(publicationUtils.getAvailabilityKeys(publicationsJsonOnlyFuture).sort()).toEqual(["a1", "a2"]);
  });
});
