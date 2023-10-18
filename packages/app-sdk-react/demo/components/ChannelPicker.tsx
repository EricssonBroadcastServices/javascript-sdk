import { ImageOrientation as DeprecatedImageOrientation } from "@ericssonbroadcastservices/exposure-sdk";
import React, { useCallback, useState } from "react";
import { useChannelPicker } from "../../src";

export default function ChannelPicker() {
  const [channels] = useChannelPicker();
  const [isActive, setIsActive] = useState(false);

  const toggleChannelPicker = useCallback(() => {
    setIsActive(!isActive);
  }, [isActive]);

  return (
    <div>
      <button onClick={toggleChannelPicker}>{isActive ? "hide channel picker" : "show channel picker"}</button>
      {isActive && (
        <div>
          <h2>Hello From channelPicker!</h2>
          <div
            style={{
              display: "grid",
              gap: "0.5rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(calc(33% - 0.5rem), 1fr))"
            }}
          >
            {channels.map((c, i) => {
              let useChannelLogo = true;
              const channelLogo =
                c.channel.getScaledLogo(150) || c.channel.getScaledImage(DeprecatedImageOrientation.LANDSCAPE, 150);
              const program = c.programs.find(p => p.isLive());
              if (!program?.getScaledImage(DeprecatedImageOrientation.LANDSCAPE, 400)) {
                useChannelLogo = false;
              }
              return (
                <div key={`${c.channel.title}_${i}`} style={{ margin: 20, backgroundColor: "gray", color: "white" }}>
                  <img
                    style={{ width: "100%" }}
                    src={
                      program?.getScaledImage(DeprecatedImageOrientation.LANDSCAPE, 400) ||
                      c.channel.getScaledImage(DeprecatedImageOrientation.LANDSCAPE, 400)
                    }
                    alt="an EPG Image"
                  />
                  {useChannelLogo && channelLogo && (
                    <div className="channel-img">
                      <img src={channelLogo} />
                    </div>
                  )}
                  {program && (
                    <span>
                      <h4>{program.title}</h4>
                      <p>{program.getTimeSlot()}</p>
                    </span>
                  )}
                  {!program && c.channel.title && (
                    <span>
                      <h4>{c.channel.title}</h4>
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
