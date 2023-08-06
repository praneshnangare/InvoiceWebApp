import { createSlice } from "@reduxjs/toolkit";
import { INITIAL, LOADING, LOADED, ERROR } from "../../../helpers/constants";

export const purchaseSlice = createSlice({
  name: "purchase",
  initialState: {
    storeState: INITIAL,
    purchaseItems: {},
  },
  reducers: {
    getPurchaseItems: (state) => {
      state.storeState = LOADING;
    },
    getPurchaseItemsSuccess: (state, action) => {
      state.purchaseItems = action.payload;
      state.storeState = LOADED;
    },
    getPurchaseItemsFailure: (state) => {
      state.storeState = ERROR;
    },

    addPurchaseItems: (state) => {
      state.storeState = LOADING;
    },
    addPurchaseItemsSuccess: (state, action) => {
      state.purchaseItems = action.payload;
      state.storeState = LOADED;
    },
    addPurchaseItemsFailure: (state) => {
      state.storeState = ERROR;
    },
    
  },
});

export const {
  getPurchaseItems,
  getPurchaseItemsSuccess,
  getPurchaseItemsFailure,
  addPurchaseItems,
  addPurchaseItemsSuccess,
  addPurchaseItemsFailure,
  
} = purchaseSlice.actions;

export default purchaseSlice.reducer;
