export interface IBookmark {
  assetId: string;
  channelId?: string;
  programId?: string;
  lastViewedOffset: number;
  lastViewedTime: number;
  liveTime?: number;
}
