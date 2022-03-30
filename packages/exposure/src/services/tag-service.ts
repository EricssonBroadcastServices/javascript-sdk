import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { ITag } from "../interfaces/tag/tag";

interface TagOptions extends CustomerAndBusinessUnitOptions {
  tagId: string;
}

interface GetTagsOptions extends CustomerAndBusinessUnitOptions {
  pageSize?: number;
  pageNumber?: number;
  tagType?: string;
  sort?: string;
}
export class TagService extends BaseService {
  public getTag({ customer, businessUnit, tagId }: TagOptions): Promise<ITag> {
    return this.get(
      `${this.cuBuUrl({
        customer,
        businessUnit,
        apiVersion: "v1"
      })}/tag/${tagId}`
    );
  }

  public getTags({
    customer,
    businessUnit,
    pageSize,
    pageNumber,
    sort,
    tagType
  }: GetTagsOptions): Promise<{ pageSize: number; pageNumber: number; totalCount: number; items: ITag[] }> {
    const searchParams = new URLSearchParams();
    if (pageNumber) {
      searchParams.set("pageNumber", `${pageNumber}`);
    }
    if (pageSize) {
      searchParams.set("pageSize", `${pageSize}`);
    }
    if (sort) {
      searchParams.set("sort", `${sort}`);
    }
    if (tagType) {
      searchParams.set("scheme", `${tagType}`);
    }
    return this.get(`${this.cuBuUrl({ customer, businessUnit, apiVersion: "v1" })}/tag?${searchParams.toString()}`);
  }

  public async getAllTags({ customer, businessUnit }: CustomerAndBusinessUnitOptions) {
    const { totalCount, items, pageSize } = await this.getTags({
      customer,
      businessUnit,
      pageSize: 100,
      pageNumber: 1,
      sort: "-created"
    });
    const numberOfPages = Math.ceil(totalCount / pageSize) - 1; // minus the one we already fetched;
    // Create array of remaining pageNumbers to fetch. +1 for mapping 0 => 1, + 1 for skipping the one we already fetched
    const pageNumberArr = new Array(numberOfPages).fill("").map((item, index) => index + 2);
    const combinedTagsResponses = await Promise.all(
      pageNumberArr.map(pageNumber => {
        return this.getTags({ customer, businessUnit, pageSize, pageNumber, sort: "-created" }).then(res => res.items);
      })
    );
    return [items, ...combinedTagsResponses].flatMap(arr => [...arr]);
  }
}
