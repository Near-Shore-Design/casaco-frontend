import { createSlice } from "@reduxjs/toolkit";

type DropDown = {
  label: string | number;
  value: number;
};

interface buyPropertyState {
  noOfBedsSelected: null | number;
  noOfBathsSelected: null | number;
  noOfBedsSelectedDrpdwnObj: null | DropDown;
  noOfBathsSelectedDrpdwnObj: null | DropDown;
  homeType: string[];
}

const initialState = {
  noOfBedsSelected: null,
  noOfBathsSelected: null,
  noOfBedsSelectedDrpdwnObj: null,
  noOfBathsSelectedDrpdwnObj: null,
  homeType: [],
} as buyPropertyState;

export const buyProperty = createSlice({
  name: "buyProperty",
  initialState,
  reducers: {
    updateBedsFilter: (state, action) => {
      state.noOfBedsSelected = action.payload;
    },
    updateBathsFilter: (state, action) => {
      state.noOfBathsSelected = action.payload;
    },
    updateNoOfBedsSelectedDrpdwnObj: (state, action) => {
      state.noOfBedsSelectedDrpdwnObj = action.payload;
    },
    updateNoOfBathsSelectedDrpdwnObj: (state, action) => {
      state.noOfBathsSelectedDrpdwnObj = action.payload;
    },
    addToHomeType: (state, action) => {
      state.homeType = [...state.homeType, action.payload];
    },
    removeFromHomeType: (state, action) => {
      state.homeType = state.homeType.filter((type) => type !== action.payload);
    },
  },
});
export const {
  updateBedsFilter,
  updateBathsFilter,
  updateNoOfBedsSelectedDrpdwnObj,
  updateNoOfBathsSelectedDrpdwnObj,
  addToHomeType,
  removeFromHomeType,
} = buyProperty.actions;
export default buyProperty.reducer;
