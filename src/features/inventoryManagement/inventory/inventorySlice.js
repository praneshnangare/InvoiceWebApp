// src/slices/inventorySlice.js
import { createSlice } from "@reduxjs/toolkit";
import { ERROR, INITIAL, LOADED, LOADING } from "../../../helpers/constants";

const initialState = {
  materialItems: [],
  storeState: INITIAL,
  lendersState: INITIAL,
  lenders: {},
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    getMaterialItems: (state) => {
      state.storeState = LOADING;
    },
    getMaterialItemsSuccess: (state, action) => {
      state.materialItems = action.payload;
      state.storeState = LOADED;
    },
    getMaterialItemsFailure: (state) => {
      state.storeState = ERROR;
    },
    getLenders: (state) => {
      state.lendersState = LOADING;
    },
    getLendersSuccess: (state, action) => {
      state.lenders = action.payload; // Store the fetched lenders in the state
      state.lendersState = LOADED;
    },
    getLendersFailure: (state) => {
      state.lendersState = ERROR;
    },

    updateLender: (state) => {
      state.lendersState = LOADING;
    },
    updateLenderSuccess: (state, action) => {
      state.lenders = action.payload; // Store the fetched lenders in the state
      state.lendersState = LOADED;
    },
    updateLenderFailure: (state) => {
      state.lendersState = ERROR;
    },
    addLender: (state) => {
      state.lendersState = LOADING;
    },
    addLenderSuccess: (state, action) => {
      state.lenders = action.payload; // Store the fetched lenders in the state
      state.lendersState = LOADED;
    },
    addLenderFailure: (state) => {
      state.lendersState = ERROR;
    },
    
  },
});

export const {
  getMaterialItems,
  getMaterialItemsSuccess,
  getMaterialItemsFailure,
  getLenders,
  getLendersSuccess,
  getLendersFailure,
  updateLender,
updateLenderSuccess,
updateLenderFailure,
addLender,
addLenderSuccess,
addLenderFailure,
} = inventorySlice.actions;

export default inventorySlice.reducer;
