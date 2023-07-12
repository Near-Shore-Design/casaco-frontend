import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { geocodeAddress, geocodeMap } from "api/map";

interface mapState {
  propertyCoordinate: { lat: number; lng: number };
  isLoading: boolean;
  centerMap: { lat: number; lng: number };
  mainPageSearch: { label: string; value: string };
  polygonCoordinates: string;
  propertyCoordinateError: boolean;
}
export const getPropertiesCoordinate = createAsyncThunk(
  "properties/getPropertiesCoordinate",
  geocodeAddress
);

export const getMapCoordinate = createAsyncThunk(
  "properties/getMapCoordinate",
  geocodeMap
);

const initialState = {
  propertyCoordinate: { lat: 4.570868, lng: -74.297333 },
  isLoading: false,
  polygonCoordinates: "",
  mainPageSearch: {},
  centerMap: {},
  propertyCoordinateError: false,
} as mapState;

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    updateCoordinate: (state, action) => {
      state.propertyCoordinate = action.payload;
    },
    getMainPageSearchQuery: (state, action) => {
      state.mainPageSearch = { value: action.payload, label: action.payload };
    },

    getPolygonCoordinates: (state, action) => {
      state.polygonCoordinates = action.payload;
    },
    removePolygonCoordinates: (state) => {
      return { ...state, polygonCoordinates: "" };
    },
    clearPolygonCoordinates: (state) => {
      return { ...state, polygonCoordinates: "" };
    },
    getCenterCoordinate: (state, action) => {
      state.centerMap = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPropertiesCoordinate.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload === undefined) {
        state.propertyCoordinate = { lat: 6.5243793, lng: 3.3792057 };
        state.propertyCoordinateError = true;
      } else {
        state.propertyCoordinate = action.payload;
        state.propertyCoordinateError = false;
      }
    });
    builder.addCase(getPropertiesCoordinate.rejected, (state) => {
      state.isLoading = false;
      state.propertyCoordinateError = false;
    });
    builder.addCase(getPropertiesCoordinate.pending, (state) => {
      state.isLoading = true;
      state.propertyCoordinateError = false;
    });
  },
});
export const {
  updateCoordinate,
  clearPolygonCoordinates,
  getPolygonCoordinates,
  getCenterCoordinate,
  removePolygonCoordinates,
  getMainPageSearchQuery,
} = mapSlice.actions;
export default mapSlice.reducer;
