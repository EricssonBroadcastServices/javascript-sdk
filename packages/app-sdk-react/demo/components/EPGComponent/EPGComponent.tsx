import {
  AssetHelpers,
  EPGComponentEntry,
  EPGHelpers,
  ResolvedComponent,
  WLComponentHelpers
} from "@ericssonbroadcastservices/app-sdk";
import React, { useMemo } from "react";
import { useSelectedLanguage } from "../../../src";
import "./epg.css";
import { Link } from "react-router-dom";

function EpgCard(channelEntry: EPGComponentEntry) {
  const locale = useSelectedLanguage();
  const channelLogo = useMemo(() => {
    return AssetHelpers.getScaledImage({
      width: 150,
      asset: channelEntry.channel,
      imageType: "logo",
      locale,
      orientation: "LANDSCAPE"
    });
  }, [channelEntry.channel]);
  const onGoingProgramsNextHours = useMemo(() => {
    return EPGHelpers.findCurrentAndUpcomingProgramsByHour(channelEntry.programs, new Date());
  }, []);
  return (
    <Link to={`/asset/${channelEntry.channel.assetId}`} className="epg-card">
      <h4>{AssetHelpers.getTitle(channelEntry.channel, locale)}</h4>
      <img src={channelLogo} />
      {onGoingProgramsNextHours.map(program => {
        const isLive = EPGHelpers.isProgramLive(program);
        return (
          <p key={program.assetId}>
            {isLive && <span className="live-badge">LIVE</span>}
            {`${AssetHelpers.getTitle(program.asset, locale)} - ${EPGHelpers.getProgramTimeSlotString(program)}`}
          </p>
        );
      })}
    </Link>
  );
}

export const EPGComponent = ({ component, content }: ResolvedComponent<"epg">) => {
  const locale = useSelectedLanguage();
  return (
    <div className="epg-container">
      <h3>{WLComponentHelpers.getTitle(component, locale)}</h3>
      <div className="epg-content-container">
        {content.map(channelEntry => {
          return <EpgCard key={channelEntry.channel.assetId} {...channelEntry} />;
        })}
      </div>
    </div>
  );
};
