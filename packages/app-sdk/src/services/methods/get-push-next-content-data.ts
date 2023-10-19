import {
  Asset,
  ServiceContext,
  getNextEpisode,
  getNextProgramForAsset,
  getRecommendationsForAsset
} from "@ericssonbroadcastservices/rbm-ott-sdk";
import { PublicationHelpers } from "../../utils/publication";

export interface GetPushNextContentDataOptions {
  /** The id of the asset */
  assetId: string;
  /** whether or not upNext should be populated by the next upcoming program, if available */
  pushNextProgram?: boolean;
}

export async function getPushNextContentData(
  context: ServiceContext,
  { assetId, pushNextProgram }: GetPushNextContentDataOptions
) {
  let upNextAsset: Asset | undefined;
  let recommendations: Asset[] = [];
  try {
    upNextAsset = await getNextEpisode.call(context, { assetId });
    /*
      if the asset has no active publications, discard it.
      This can be true when episodes are part of a live channel and the episode has not yet aired.
     */
    if (upNextAsset && PublicationHelpers.getActivePublications(upNextAsset.publications).length === 0) {
      upNextAsset = undefined;
    }
  } catch (err) {}
  try {
    /**
     * This gets the following program according to EPG and puts it as the first RECOMMENDATION
     */
    const nextProgram = await getNextProgramForAsset.call(context, { assetId });
    if (nextProgram.asset) {
      recommendations.push(nextProgram.asset);
    }

    if (!upNextAsset && pushNextProgram && nextProgram.asset) {
      upNextAsset = nextProgram.asset || undefined;
    }
  } catch (err) {}
  try {
    recommendations = [
      ...recommendations,
      ...(await getRecommendationsForAsset.call(context, { assetId })).items
    ].slice(0, 3);
  } catch (err) {}
  return {
    upNext: upNextAsset,
    recommendations
  };
}
