import { Asset } from "../..";
import { IPaginatedResponse } from "./paginated";

export interface IAssetResponse extends IPaginatedResponse {
  pageSize: number;
  pageNumber: number;
  totalCount: number;
  items: Asset[];
}

export interface IEpisodesResponse extends IAssetResponse {
  seriesId: string;
  seasonNumber: number;
}
