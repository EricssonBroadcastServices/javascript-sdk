import { Asset } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { CarouselItem } from "../interfaces";

/* Get the unique intersection of two arrays. e.g intersectionUnique([0, 1], [1, 2]) => [1] */
function intersectionUnique(arr1: any[], arr2: any[]) {
  return arr1.filter(i => arr2.includes(i)).filter((value, index, self) => self.indexOf(value) === index);
}

function getAssetRelevanceItems(asset: Asset) {
  const tags = asset.tags.flatMap(t => t.tagValues.map(tv => tv.tagId));
  const participants = asset.participants.map(p => p.name);
  return [...tags, ...participants];
}

/**
 * Sort an array of CarouselItem based on their similarity to an Asset.
 * Similarity is based on tags and participants. The more matches, the higher up the item will be sorted
 */

export function sortByRelevance(asset: Asset) {
  const assetRelevanceItems = getAssetRelevanceItems(asset);
  return (a: CarouselItem, b: CarouselItem) => {
    return (
      intersectionUnique(assetRelevanceItems, getAssetRelevanceItems(b.asset)).length -
      intersectionUnique(assetRelevanceItems, getAssetRelevanceItems(a.asset)).length
    );
  };
}
