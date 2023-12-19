import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addAndRemoveFavoriteProperty,
  getFavoriteProperties,
  getFilterProperties,
  getHomeProperties,
  getProperties,
  getPropertiesByID,
  listProperty,
  sellProperty,
  tourBookedCheck,
  tourRequest,
  updatePropertyForSale,
} from "api/properties";
import { removeDuplicates } from "utilities/helper-functions";
import { PURGE } from "redux-persist";

interface property {
  images: Array<string>;
  baths: number;
  beds: number;
  description: string;
  location: string;
  feature: string[];
  price: number | any;
  longitude: number;
  latitude: number;
  city: string;
  department: string;
  property_id: number;
  property_status: string;
  interior_size: number;
  exterior_size: number;
  favourite: boolean;
  title: string;
  total: string;
  types: string;
  user: number;
}
interface propertyState {
  homeProperties: Array<any>;
  buyProperties?: Array<property>;
  isLoading: boolean;
  propertyListLoading: boolean;
  favProperties: Array<any>;
  singleProperty: property;
  homePropertyIndex: number;
  propertyFavoriteID: number;
  singlePropertySchedule?: any;
  propertyCoordinate: Array<{ lat: number; lng: number }>;
  property_location: Array<{ label?: string; value?: string }>;
}

export const getAllProperties = createAsyncThunk(
  "properties/getAllProperties",
  getProperties
);

export const getSingleProperty = createAsyncThunk(
  "properties/getSingleProperty",
  getPropertiesByID
);

export const propertyListing = createAsyncThunk(
  "properties/propertyListing",
  listProperty
);
export const updateListing = createAsyncThunk(
  "properties/updateListing",
  updatePropertyForSale
);

export const propertyForSale = createAsyncThunk(
  "properties/propertyForSale",
  sellProperty
);

export const getAllHomeProperties = createAsyncThunk(
  "properties/getAllHomeProperties",
  getHomeProperties
);
export const filteredProperties = createAsyncThunk(
  "properties/filteredProperties",
  getFilterProperties
);

export const getAllFavoriteProperties = createAsyncThunk(
  "properties/getAllFavoriteProperties",
  getFavoriteProperties
);
export const addToFavorite = createAsyncThunk(
  "properties/addToFavorite",
  addAndRemoveFavoriteProperty
);
export const removeFromFavorite = createAsyncThunk(
  "properties/removeFromFavorite",
  addAndRemoveFavoriteProperty
);

export const requestForTour = createAsyncThunk(
  "properties/requestForTour",
  tourRequest
);
export const scheduledTourDate = createAsyncThunk(
  "properties/scheduledTourDate",
  tourBookedCheck
);
const initialState = {
  favProperties: [],
  homeProperties: [],
  buyProperties: [],
  singleProperty: <property>{},
  isLoading: false,
  homePropertyIndex: 0,
  favouriteProperty: [],
  propertyListLoading: false,
  showPropertyModal: false,
  property_location: [],
  propertyFavoriteID: 0,
  singlePropertySchedule: [],
  propertyCoordinate: [{ lat: 5.89972, lng: -74.7338 }],
} as propertyState;

export const homeProperty = createSlice({
  name: "homeProperty",
  initialState,
  reducers: {
    updateIndex: (state, action) => {
      state.homePropertyIndex = action.payload;
    },
    nextHomeProperty: (state) => {
      if (state.homePropertyIndex === state.homeProperties.length - 1) {
        state.homePropertyIndex = 0;
      } else {
        state.homePropertyIndex = state.homePropertyIndex + 1;
      }
    },

    prevHomeProperty: (state) => {
      if (state.homePropertyIndex === 0) return;
      state.homePropertyIndex = state.homePropertyIndex - 1;
    },
    getNotAuthenticatedPropertyId: (state, action) => {
      state.propertyFavoriteID = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllProperties.fulfilled, (state, action) => {
      const allProperties = action.payload;
      const updatedArr1 = allProperties?.map((obj1) => ({
        ...obj1,
        favourite: state.favProperties?.some(
          (obj2) => obj2.property_id === obj1.property_id
        ),
      }));
      state.buyProperties = updatedArr1;

      const newArr: any = state.buyProperties?.map(
        ({ location, property_id }) => {
          return {
            id: property_id,
            label: location,
            value: location,
          };
        }
      );
      state.property_location = removeDuplicates(newArr);
    });

    builder.addCase(getAllProperties.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getAllProperties.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getSingleProperty.fulfilled, (state, action) => {
      state.singleProperty = action.payload;
    });
    builder.addCase(getSingleProperty.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getSingleProperty.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllHomeProperties.fulfilled, (state, action) => {
      state.homeProperties = action.payload;
    });
    builder.addCase(getAllHomeProperties.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllHomeProperties.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(filteredProperties.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(filteredProperties.fulfilled, (state, action) => {
      state.buyProperties = action.payload;
      state.isLoading = false;
    });
    builder.addCase(filteredProperties.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getAllFavoriteProperties.fulfilled, (state, action) => {
      state.favProperties = action.payload;
    });

    builder.addCase(getAllFavoriteProperties.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getAllFavoriteProperties.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addToFavorite.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(removeFromFavorite.fulfilled, (state) => {
      state.isLoading = false;
    });

    builder.addCase(requestForTour.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(requestForTour.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(scheduledTourDate.fulfilled, (state, action) => {
      state.singlePropertySchedule = action.payload;
    });

    builder.addCase(propertyListing.pending, (state) => {
      state.propertyListLoading = true;
    });
    builder.addCase(propertyListing.fulfilled, (state) => {
      state.propertyListLoading = false;
    });
    builder.addCase(propertyListing.rejected, (state) => {
      state.propertyListLoading = false;
    });

    builder.addCase(propertyForSale.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(propertyForSale.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(PURGE, (state) => {
      return initialState;
    });
  },
});
export const {
  nextHomeProperty,
  prevHomeProperty,
  updateIndex,
  getNotAuthenticatedPropertyId,
} = homeProperty.actions;
export default homeProperty.reducer;
