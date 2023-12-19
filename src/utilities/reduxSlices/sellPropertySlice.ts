import { createSlice } from "@reduxjs/toolkit";

interface sellPropertyState {
  removedImageBlob: string;
  removedImageIndex: number | null;
}

const initialState = {
  removedImageBlob: "",
  removedImageIndex: null,
} as sellPropertyState;

export const sellProperty = createSlice({
  name: "sellProperty",
  initialState,
  reducers: {
    updateRemovedImageBlob: (state, action) => {
      state.removedImageBlob = action.payload;
    },
    updateRemovedImageIndex: (state, action) => {
      state.removedImageIndex = action.payload;
    },
  },
});
export const { updateRemovedImageBlob, updateRemovedImageIndex } =
  sellProperty.actions;
export default sellProperty.reducer;
