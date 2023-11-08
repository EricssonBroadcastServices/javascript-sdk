import { IExposureWLCarousel, TagHelpers, WLComponentHelpers } from "@ericssonbroadcastservices/app-sdk";
import React from "react";
import { useSelectedLanguage, useTag, useTagList } from "../../../src";
import { PreferencesListItem } from "@ericssonbroadcastservices/rbm-ott-sdk";

function TagButton({ item, onClick }: { item: PreferencesListItem; onClick: () => void }) {
  const [tag] = useTag(item.id as string);
  const locale = useSelectedLanguage();
  if (!tag) return null;
  return <button onClick={onClick}>{TagHelpers.getTitle(tag, locale)}</button>;
}

export default function CarouselHeader({
  component,
  setTagFilter
}: {
  component: IExposureWLCarousel;
  setTagFilter: (tagIds: string[]) => void;
}) {
  const locale = useSelectedLanguage();
  const [tagList] = useTagList();
  return (
    <>
      <p>{WLComponentHelpers.getTitle(component, locale)}</p>
      <p>{WLComponentHelpers.getSubTitle(component, locale)}</p>
      {component?.appSubType === "TagFeedQuery" && (
        <div>
          {tagList?.items?.map(t => {
            return <TagButton onClick={() => setTagFilter([t.id as string])} key={t.id} item={t} />;
          })}
        </div>
      )}
    </>
  );
}
