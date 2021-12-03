import React, { useMemo } from "react";
import { useTranslations } from "../../src";
import { useChannelPicker } from "../../src";

export default function ChannelPicker() {
  const [channels, isLoading, error] = useChannelPicker();
  const [translations] = useTranslations();
  console.log(channels);

  return (
    <div>
      <p>Hello From channelPicker!</p>
    </div>
  );
}
