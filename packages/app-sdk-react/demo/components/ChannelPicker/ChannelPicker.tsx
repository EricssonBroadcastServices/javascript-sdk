import React from "react";
import { useChannelPicker, useSelectedLanguage } from "../../../src";
import { AssetHelpers, ChannelAssetHelpers } from "@ericssonbroadcastservices/app-sdk";
import { CarouselWrapper } from "../Carousel/Carousel";
import { ChannelStatus } from "@ericssonbroadcastservices/rbm-ott-sdk";
import "./channel-picker.css";
import { Link } from "react-router-dom";

const fallbackImage =
  "https://raw.githubusercontent.com/koehlersimon/fallback/master/Resources/Public/Images/placeholder.jpg";

function ChannelPickerItem({ channelStatus, isActive }: { channelStatus: ChannelStatus; isActive: boolean }) {
  const locale = useSelectedLanguage();
  if (!channelStatus.channel) return null;
  const channelLogoUrl = AssetHelpers.getScaledImage({
    asset: channelStatus.channel,
    width: 150,
    imageType: "logo",
    oritentation: "LANDSCAPE",
    locale
  });
  const channelCoverUrl = AssetHelpers.getScaledImage({
    asset: channelStatus.channel,
    width: 600,
    imageType: "cover",
    oritentation: "LANDSCAPE",
    locale
  });

  const activeChannelAsset = channelStatus.assets?.find(p => ChannelAssetHelpers.isLive(p));
  const activeChannelCoverImage = activeChannelAsset
    ? AssetHelpers.getScaledImage({
        asset: activeChannelAsset.asset,
        width: 600,
        imageType: "cover",
        oritentation: "LANDSCAPE",
        locale
      })
    : undefined;
  const imageUrl = activeChannelCoverImage || channelCoverUrl || fallbackImage;
  const useChannelLogo = !!channelLogoUrl && activeChannelCoverImage;
  return (
    <Link to={`/asset/${channelStatus.channel.assetId}`} className="item">
      {isActive && <span className="on-now-indicator">On Now</span>}
      <img className="image" src={imageUrl} alt="an EPG Image" />
      {useChannelLogo && (
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
      {!activeChannelAsset && AssetHelpers.getTitle(channelStatus.channel, locale) && (
        <span>
          <h4>{AssetHelpers.getTitle(channelStatus.channel, locale)}</h4>
        </span>
      )}
    </Link>
  );
}

export default function ChannelPicker({ selectedChannel }: { selectedChannel: string }) {
  const [channels] = useChannelPicker();
  return (
    <CarouselWrapper>
      {channels?.map((c, i) => (
        <ChannelPickerItem
          isActive={selectedChannel === c.channel?.assetId}
          key={`${c.channel?.assetId}_${i}`}
          channelStatus={c}
        />
      ))}
    </CarouselWrapper>
  );
}
