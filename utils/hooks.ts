import { Types } from 'ably/ably';
import Ably from 'ably/promises';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getChattingRoom } from './axios';

const ably = new Ably.Realtime.Promise({
  authUrl: `${process.env.BASE_URL}/api/createTokenRequest`,
});

export function useChannel(channelName: string, callbackOnMessage: any) {
  const router = useRouter();
  const channel: Types.RealtimeChannelPromise = ably.channels.get(channelName);

  const onMount = () => {
    // channel.presence.enter();
    channel.presence.get().then((data) => console.log(data));
    channel.subscribe((msg) => {
      callbackOnMessage(msg);
    });
  };

  const onUnmount = () => {
    channel.unsubscribe();
  };

  const useEffectHook = () => {
    onMount();
    return () => {
      onUnmount();
    };
  };

  useEffect(useEffectHook, []);

  return [channel, ably];
}
