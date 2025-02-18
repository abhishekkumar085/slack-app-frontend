import { FaChevronDown } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { useUpdateChannel } from '@/hooks/apis/channels/useUpdateChannelApi';
import { useParams } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

export const ChannelHeader = ({ name }) => {
  const params = useParams();
  const { channelId } = params;

  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState(name);
  const queryClient = useQueryClient();

  const { isPending, updateChannelMutation } = useUpdateChannel(channelId);

  const handleSubmit = async () => {
    try {
      const response = await updateChannelMutation(input);
      queryClient.invalidateQueries(`get-channel-${channelId}`);
      response.data.message = 'Channel name updated successfully!!';

      if (response.data.success) {
        toast({
          type: 'success',
          title: response?.data?.message,
        });
        setEdit(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white border-b h-[50px] flex items-center px-4 overflow-hidden">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="text-lg font-semibold px-2 w-auto overflow-hidden"
          >
            <span># {name} </span>
            <FaChevronDown className="size-3 ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle># {name}</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-100">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Channel name</p>
                <p
                  className="text-sm font-semibold"
                  onClick={() => setEdit(true)}
                >
                  {!edit && ' Edit'}
                </p>
              </div>
              <input
                type="text"
                className={`px-2 py-2 rounded-md ${
                  edit === true ? 'border border-black w-full' : ''
                }`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={edit === false}
              />
            </div>
            {edit && (
              <Button disabled={isPending} onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
