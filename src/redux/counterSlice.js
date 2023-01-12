import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bidsModal: false,
  buyModal: false,
  defaultAccount: null,
  userBalance: [],
  cardid: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCardId: (state, action) => {
      
      state.cardid = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserBalance, setDefaultAccount, setCardId } =
  counterSlice.actions;

export default counterSlice.reducer;
