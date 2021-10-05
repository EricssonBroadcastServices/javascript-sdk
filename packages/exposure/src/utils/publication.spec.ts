import { publicationUtils } from "..";
import { publicationsJson } from "../../test-utils/mockPublication";

describe("Publication", () => {
  it("is active or not active", () => {
    expect(publicationUtils.isActive(publicationsJson[0])).toBe(true);
    expect(publicationUtils.isActive(publicationsJson[1])).toBe(false);
    expect(publicationUtils.isActive(publicationsJson[2])).toBe(false);
  });
});
