import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  changePassword,
  changeProfileInfo,
  forgotPassword,
  googleSignIn,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  validateUidToken,
} from "api/auth";

interface UsersState {
  token: { access_token?: string; refresh_token?: string };
  user?: { email: string };
  isLoading: boolean;
  params: any;
  Uiidvalidation: boolean;
  userData: {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    image_url: string;
  };
}

export const userLogin = createAsyncThunk("auth/userLogin", loginUser);
export const userRegister = createAsyncThunk("auth/userRegister", registerUser);
export const passwordChange = createAsyncThunk(
  "auth/passwordChange",
  changePassword
);
export const userLogout = createAsyncThunk("auth/userLogout", logoutUser);
export const userForgotPassword = createAsyncThunk(
  "auth/userForgotPassword",
  forgotPassword
);
export const userDataUpdate = createAsyncThunk(
  "auth/userDataUpdate",
  changeProfileInfo
);

export const userResetPassword = createAsyncThunk(
  "auth/userResetPassword",
  resetPassword
);

export const signWithGoogle = createAsyncThunk(
  "auth/signWithGoogle",
  googleSignIn
);
export const getUidValidation = createAsyncThunk(
  "auth/getUidValidation",
  validateUidToken
);

const initialState = {
  token: {},
  params: [],
  isLoading: false,
  Uiidvalidation: false,
  userData: {},
} as UsersState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: (state) => initialState,
    updateToken: (state, action) => {
      const { access, refresh } = action.payload;
      state.token = {
        access_token: access,
        refresh_token: refresh,
      };
    },
    getResetParams: (state, action) => {
      state.params = action.payload;
      setTimeout(() => {
        state.params = initialState;
      }, 10000);
    },
    clearResetParams: (state) => {
      state.params = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      const { access_token, refresh_token, user } = action.payload;
      state.token = {
        access_token: access_token,
        refresh_token: refresh_token,
      };
      state.userData = { ...user };
      state.isLoading = false;
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.token = {};
      state.isLoading = false;
    });
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userLogout.fulfilled, (state) => {
      return initialState;
    });
    builder.addCase(userDataUpdate.fulfilled, (state, action) => {
      if (action.payload) {
        const { first_name, last_name, image, email } = action.payload;
        state.userData = {
          ...state.userData,
          first_name,
          last_name,
          email,
          image_url: image,
        };
      } else {
        return;
      }

      state.isLoading = false;
    });

    builder.addCase(userDataUpdate.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userDataUpdate.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(passwordChange.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(passwordChange.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(passwordChange.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(userRegister.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(userRegister.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userForgotPassword.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(userForgotPassword.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(userForgotPassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(userResetPassword.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(userResetPassword.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(userResetPassword.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getUidValidation.fulfilled, (state, action) => {
      state.Uiidvalidation = action.payload;
    });
    builder.addCase(signWithGoogle.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signWithGoogle.fulfilled, (state, action) => {
      const { access_token, refresh_token, user } = action.payload;
      state.token = {
        access_token: access_token,
        refresh_token: refresh_token,
      };
      state.userData = { ...user };
      state.isLoading = false;
    });
  },
});
export const { resetState, updateToken, getResetParams, clearResetParams } =
  authSlice.actions;
export default authSlice.reducer;
