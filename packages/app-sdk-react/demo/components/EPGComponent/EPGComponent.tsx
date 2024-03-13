import { EPGComponentEntry, ResolvedComponent } from "@ericssonbroadcastservices/app-sdk";
import React from "react";
import { useEPG, useEPGEntry, useEPGProgram } from "../../../src";
import "./epg.css";
import { Link } from "react-router-dom";
import { ProgramResponse } from "@ericssonbroadcastservices/rbm-ott-sdk";

function EPGCardProgram({ program }: { program: ProgramResponse }) {
  const { time, title, isLive } = useEPGProgram(program);
  return (
    <p key={program.assetId}>
      {isLive && <span className="live-badge">LIVE</span>}
      {`${title} - ${time}`}
    </p>
  );
}

function EpgCard(channelEntry: EPGComponentEntry) {
  const { image, programs, progress } = useEPGEntry(channelEntry, new Date(), {
    width: 150,
    imageOrientation: "LANDSCAPE"
  });
  return (
    <Link to={`/asset/${channelEntry.channel.assetId}`} className="epg-card">
      <img src={image} />
      {programs.map(program => (
        <EPGCardProgram key={program.assetId} program={program} />
      ))}
    </Link>
  );
}

export const EPGComponent = (props: ResolvedComponent<"epg">) => {
  const { title, content } = useEPG(props);
  return (
    <div className="epg-container">
      <h3>{title}</h3>
      <div className="epg-content-container">
        {content.map(channelEntry => {
          return <EpgCard key={channelEntry.channel.assetId} {...channelEntry} />;
        })}
      </div>
    </div>
  );
};
