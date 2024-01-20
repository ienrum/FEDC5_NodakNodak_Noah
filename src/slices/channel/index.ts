import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { InitialState } from '@/slices/channel/type';
import { SLICE_NAME } from '@/slices/constants';
import { getChannel } from '@/slices/channel/thunk';

const initialState: InitialState = {
  channels: [],
  currentChannel: undefined,
};

const channelSlice = createSlice({
  name: SLICE_NAME.CHANNEL,
  initialState,
  reducers: {
    setChannel: (state, action: PayloadAction<string>) => {
      const currentChannel = state.channels.find(
        (channel) => channel._id === action.payload,
      );
      state.currentChannel = currentChannel;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChannel.fulfilled, (state, action) => {
      state.channels = action.payload;
    });
  },
});

export const { setChannel } = channelSlice.actions;

export default channelSlice.reducer;
