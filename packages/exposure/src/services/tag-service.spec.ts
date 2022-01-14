import { TagService } from "./tag-service";
import { ServiceOptions } from "./base-service";
import axios from "axios";
import { mockHttpOptions, mocks } from "../../test-utils/mocks";

describe("Tag service", () => {
  const serviceOptions: ServiceOptions = {
    baseUrl: "https://testbaseurl.com",
    authHeader: () => ({ Authorization: "" }),
    http: mockHttpOptions
  };
  const tagService = new TagService(serviceOptions);
  const mockTagResponse = {
    localized: [
      {
        title: "test",
        locale: "en"
      }
    ],
    scheme: "other"
  };
  const mockReturnValue = {
    data: mockTagResponse
  };
  beforeEach(() => {
    jest.spyOn(axios, "get").mockReturnValue(Promise.resolve(mockReturnValue));
  });
  it("should fetch tag by id", async () => {
    await tagService.getTag({
      customer: mocks.customer,
      businessUnit: mocks.businessUnit,
      tagId: mocks.tagId1
    });
    expect(axios.get).toHaveBeenCalledWith(
      `${serviceOptions.baseUrl}/v1/customer/${mocks.customer}/businessunit/${mocks.businessUnit}/tag/${mocks.tagId1}`,
      {}
    );
  });
  it("should throw when missing customer argument", () => {
    expect(() => {
      tagService.getTag({
        tagId: mocks.tagId1
      });
    }).toThrow();
  });
  it("should fetch tag when customer is provided from service options", async () => {
    tagService.setOptions({
      ...tagService.options,
      customer: mocks.customer,
      businessUnit: mocks.businessUnit
    });
    await tagService.getTag({
      tagId: mocks.tagId1
    });
    expect(axios.get).toHaveBeenCalledWith(
      `${serviceOptions.baseUrl}/v1/customer/${mocks.customer}/businessunit/${mocks.businessUnit}/tag/${mocks.tagId1}`,
      {}
    );
  });
});
