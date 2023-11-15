import { ResolvedComponent, TagHelpers, WLComponentHelpers, fitToWidth } from "@ericssonbroadcastservices/app-sdk";
import React, { useMemo } from "react";
import { useSelectedLanguage } from "../../../src";
import { TagType } from "@ericssonbroadcastservices/rbm-ott-sdk";
import "./tagtype.css";
import { Link } from "react-router-dom";

function CategoriesCard(tag: TagType) {
  const locale = useSelectedLanguage();
  // TODO: we need to clarify which image we select;
  const imageUrl = useMemo(() => {
    const image = TagHelpers.getImages(tag, locale)?.[0];
    if (image?.url) {
      return fitToWidth(image.url, 300);
    }
  }, []);
  return (
    <Link to={`/tag/${tag.tagId}`}>
      <h3>{TagHelpers.getTitle(tag, locale)}</h3>
      <img src={imageUrl} />
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
