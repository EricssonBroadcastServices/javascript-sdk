import React, { useCallback, useState } from "react";
import { useChannelPicker, useSelectedLanguage } from "../../src";
import { AssetHelpers, ChannelAssetHelpers } from "@ericssonbroadcastservices/app-sdk";

export default function ChannelPicker() {
  const [channels] = useChannelPicker();
  const [isActive, setIsActive] = useState(false);

  const locale = useSelectedLanguage();

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
            {(channels || []).map((c, i) => {
              if (!c.channel) return null;
              let useChannelLogo = true;

              const channelLogoUrl = AssetHelpers.getScaledImage({
                asset: c.channel,
                width: 150,
                imageType: "logo",
                oritentation: "LANDSCAPE",
                locale
              });

              const channelCoverUrl = AssetHelpers.getScaledImage({
                asset: c.channel,
                width: 150,
                imageType: "cover",
                oritentation: "LANDSCAPE",
                locale
              });

              const activeChannelAsset = c.assets?.find(p => ChannelAssetHelpers.isLive(p));
              const activeChannelCoverImage = activeChannelAsset
                ? AssetHelpers.getScaledImage({
                    asset: activeChannelAsset.asset,
                    width: 400,
                    imageType: "cover",
                    oritentation: "LANDSCAPE",
                    locale
                  })
                : undefined;
              if (!activeChannelCoverImage) {
                useChannelLogo = false;
              }

              return (
                <div key={`${c.channel.assetId}_${i}`} style={{ margin: 20, backgroundColor: "gray", color: "white" }}>
                  <img style={{ width: "100%" }} src={activeChannelCoverImage || channelCoverUrl} alt="an EPG Image" />
                  {useChannelLogo && channelLogoUrl && (
                    <div className="channel-img">
                      <img src={channelLogoUrl} />
                    </div>
                  )}
                  {activeChannelAsset && (
                    <span>
                      <h4>{AssetHelpers.getTitle(activeChannelAsset.asset, locale)}</h4>
                      <p>{ChannelAssetHelpers.getTimeSlotString(activeChannelAsset)}</p>
                    </span>
                  )}
                  {!activeChannelAsset && AssetHelpers.getTitle(c.channel, locale) && (
                    <span>
                      <h4>{AssetHelpers.getTitle(c.channel, locale)}</h4>
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
