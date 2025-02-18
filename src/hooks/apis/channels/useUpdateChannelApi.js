import { useMutation } from '@tanstack/react-query';
import { updateChannelName } from '@/apis/channels';

import { useAuth } from '@/hooks/context/useAuth';

export const useUpdateChannel = (channelId) => {
  const { auth } = useAuth();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: updateChannelMutation,
  } = useMutation({
    mutationFn: (name) => updateChannelName(channelId, name),
    onSuccess: () => {
      console.log('Channel updated successfully');
    },
    onError: (error) => {
      console.log('Error in updating channel', error);
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    updateChannelMutation,
  };
};
