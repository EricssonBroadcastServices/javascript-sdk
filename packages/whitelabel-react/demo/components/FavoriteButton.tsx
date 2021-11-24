import React from "react";
import { useUserSession } from "../../src";
import { useHandleAssetFavorites } from "../../src";

export const FavoriteButton = ({ assetId }: { assetId: string }) => {
  const [session] = useUserSession();
  const [{ isInList, addAssetToFavourites, removeAssetFromFavorites }, loading] = useHandleAssetFavorites({ assetId });

  if (!session?.isLoggedIn()) {
    return <button>{"You have to be logged in to see your favorites"}</button>;
  }

  if (isInList && !loading) {
    return <button onClick={removeAssetFromFavorites}>{"It's a favorite"}</button>;
  } else if (!isInList && !loading) {
    return <button onClick={addAssetToFavourites}>{"It's not a favorite, yet"}</button>;
  }
  return <button onClick={() => null}>{"loading..."}</button>;
};
