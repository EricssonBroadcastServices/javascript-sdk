import { TagService } from "./tag-service";
import { ServiceOptions } from "./base-service";
import axios from "axios";
import { TagResponse } from "../models/tag-response-model";
import { mocks } from "../../test-utils/mocks";

describe("Tag service", () => {
  const serviceOptions: ServiceOptions = {
    baseUrl: "testBaseUrl",
    authHeader: () => ({ Authorization: "" })
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
    spyOn(axios, "get").and.returnValue(Promise.resolve(mockReturnValue));
  });
  it("should fetch tag by id", async () => {
    const tagResponse = await tagService.getTag({
      customer: mocks.customer,
      businessUnit: mocks.businessUnit,
      tagId: mocks.tagId1
    });
    expect(tagResponse).toBeInstanceOf(TagResponse);
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
    const tagResponse = await tagService.getTag({
      tagId: mocks.tagId1
    });
    expect(tagResponse).toBeInstanceOf(TagResponse);
    expect(axios.get).toHaveBeenCalledWith(
      `${serviceOptions.baseUrl}/v1/customer/${mocks.customer}/businessunit/${mocks.businessUnit}/tag/${mocks.tagId1}`,
      {}
    );
  });
});
