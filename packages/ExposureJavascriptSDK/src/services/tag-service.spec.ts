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
  it("should fetch tag by id", async () => {
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
    spyOn(axios, "get").and.returnValue(Promise.resolve(mockReturnValue));
    const userLocationResponse = await tagService.getTag({
      customer: mocks.customer,
      businessUnit: mocks.businessUnit,
      tagId: mocks.tagId1
    });
    expect(userLocationResponse instanceof TagResponse).toBeTruthy();
    expect(axios.get).toHaveBeenCalledWith(
      `${serviceOptions.baseUrl}/v1/customer/${mocks.customer}/businessunit/${mocks.businessUnit}/tag/${mocks.tagId1}`,
      {}
    );
  });
});
