// src/store/walletSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnected: false,
  address: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    connectWallet: (state, action) => {
      state.isConnected = true;
      state.address = action.payload;
    },
    disconnectWallet: (state) => {
      state.isConnected = false;
      state.address = null;
    },
  },
});

export const { connectWallet, disconnectWallet } = walletSlice.actions;
export default walletSlice.reducer
