import { IExposureWLCarousel, WLComponentHelpers } from "@ericssonbroadcastservices/app-sdk";
import React from "react";
import { useSelectedLanguage, useTagList } from "../../../src";

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
            return (
              <button onClick={() => setTagFilter([t.id as string])} key={t.id}>
                {t.id}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
