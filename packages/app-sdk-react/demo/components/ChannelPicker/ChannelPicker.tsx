import React from "react";
import { useChannelPicker, useChannelPickerItem } from "../../../src";
import { CarouselWrapper } from "../Carousel/Carousel";
import { ChannelStatus } from "@ericssonbroadcastservices/rbm-ott-sdk";
import "./channel-picker.css";
import { Link } from "react-router-dom";

const fallbackImage =
  "https://raw.githubusercontent.com/koehlersimon/fallback/master/Resources/Public/Images/placeholder.jpg";

function ChannelPickerItem({ channelStatus, isActive }: { channelStatus: ChannelStatus; isActive: boolean }) {
  const { title, image, logo, progress, timeSlot } = useChannelPickerItem(channelStatus, {
    logo: {
      width: 150
    },
    image: {
      width: 600
    }
  });

  if (!channelStatus.channel) {
    return null;
  }

  return (
    <Link to={`/asset/${channelStatus.channel.assetId}`} className="carousel-item">
      {isActive && <span className="on-now-indicator">On Now</span>}
      <img className="image" src={image || fallbackImage} alt="an EPG Image" />
      {logo && (
        <div className="channel-img">
          <img src={logo} />
        </div>
      )}
      <span>
        <h4>{title}</h4>
        <p>{timeSlot}</p>
        <p>{`Progress: ${progress}%`}</p>
      </span>
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
