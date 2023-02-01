import { Types } from 'ably/ably';
import Ably from 'ably/promises';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ably = new Ably.Realtime.Promise({
  authUrl: `${process.env.BASE_URL}/api/createTokenRequest`,
});

export function useChannel(channelName: string, callbackOnMessage: any) {
  const router = useRouter();
  const channel: Types.RealtimeChannelPromise = ably.channels.get(channelName);

  const onMount = () => {
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
