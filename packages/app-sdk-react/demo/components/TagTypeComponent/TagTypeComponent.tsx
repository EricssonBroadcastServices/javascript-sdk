import { ResolvedComponent, WLComponentHelpers } from "@ericssonbroadcastservices/app-sdk";
import React from "react";
import { useCategoryItem, useSelectedLanguage } from "../../../src";
import { TagType } from "@ericssonbroadcastservices/rbm-ott-sdk";
import "./tagtype.css";
import { Link } from "react-router-dom";

function CategoriesCard(tag: TagType) {
  const { title, image } = useCategoryItem(tag, { width: 400, imageFormat: "webp" });
  return (
    <Link to={`/tag/${tag.tagId}`}>
      <h3>{title}</h3>
      <img src={image} />
    </Link>
  );
}

export const TagTypeComponent = ({ component, content }: ResolvedComponent<"tagtype">) => {
  const locale = useSelectedLanguage();
  return (
    <div className="tag-type-container">
      <h3>{WLComponentHelpers.getTitle(component, locale)}</h3>
      <div className="tagtype-content-container">
        {content.items.map(t => {
          return <CategoriesCard {...t} key={t.tagId} />;
        })}
      </div>
    </div>
  );
};
