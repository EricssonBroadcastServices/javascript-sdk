import React from "react";
import { Link } from "react-router-dom";
import { useHandleFollowTag, useLanguage, useTag, useUserSession } from "../../../src";
import { TagHelpers } from "@ericssonbroadcastservices/app-sdk";

export default function AssetDisplayTagButton({ tagId }: { tagId: string }) {
  const [userSession] = useUserSession();
  const { language } = useLanguage();
  const [tag] = useTag(tagId);
  const [{ add, remove, isFollowed }] = useHandleFollowTag(tagId);
  return (
    <div style={{ margin: "10px 0" }}>
      <Link to={`/tag/${tagId}`} key={tagId}>
        <button>{tag ? TagHelpers.getTitle(tag, language) : tagId}</button>
      </Link>
      {userSession?.isLoggedIn() && (
        <button onClick={isFollowed ? remove : add}>{isFollowed ? "Unfollow" : "Follow"}</button>
      )}
    </div>
  );
}
