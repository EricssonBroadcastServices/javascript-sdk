import { Asset } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { sortByRelevance } from "./sort-by-relevance";

type FakeAsset = {
  participants: Asset["participants"];
  tags: Asset["tags"];
};

describe("sort by relevance", () => {
  it("should sort correctly", () => {
    const fakeAsset: FakeAsset = {
      participants: [
        {
          name: "name1"
        },
        {
          name: "name2"
        }
      ],
      tags: [
        {
          type: "type1",
          tagValues: [
            {
              tagId: "1"
            },
            {
              tagId: "2"
            },
            {
              tagId: "3"
            },
            {
              tagId: "4"
            }
          ]
        }
      ]
    };

    const fakeAsset1: FakeAsset = {
      tags: [
        {
          type: "type1",
          tagValues: [
            {
              tagId: "1"
            },
            {
              tagId: "2"
            }
          ]
        }
      ],
      participants: []
    };

    const fakeAsset2: FakeAsset = {
      tags: [
        {
          type: "type1",
          tagValues: [
            {
              tagId: "1"
            },
            {
              tagId: "2"
            }
          ]
        }
      ],
      participants: [{ name: "name1" }]
    };

    const fakeAsset3: FakeAsset = {
      tags: [],
      participants: []
    };

    const sortFunc = sortByRelevance(fakeAsset as Asset);
    /* eslint-disable */
    // @ts-ignore
    expect([{ asset: fakeAsset3 }, { asset: fakeAsset1 }, { asset: fakeAsset2 }].sort(sortFunc)).toEqual([
      { asset: fakeAsset2 },
      { asset: fakeAsset1 },
      { asset: fakeAsset3 }
    ]);
  });
});
