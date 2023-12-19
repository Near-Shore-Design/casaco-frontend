import instance from "apiInstance";
import { toast } from "react-hot-toast";

export const loginUser = async (body: { email: string; password: string }) => {
  try {
    const response = await instance({
      method: "post",
      url: "users/login",
      data: body,
    });
    toast.success("Logged in sucessfully!");
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.detail);
    return error;
  }
};

export const googleSignIn = async (body: { token: string | undefined }) => {
  try {
    const response = await instance({
      method: "post",
      url: "users/google-signin",
      data: body,
    });
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const logoutUser = async (body: any) => {
  try {
    const response = await instance({
      method: "post",
      url: "users/logout",
      data: body,
    });
    return response.data;
  } catch (error: any) {
    return error;
  }
};
export const forgotPassword = async (body: any) => {
  try {
    const response = await instance({
      method: "post",
      url: "/users/reset-password",
      data: body,
    });
    return response.data.message;
  } catch (error: any) {
    return error.message;
  }
};

export const changePassword = async (body: any) => {
  try {
    const response = await instance({
      method: "put",
      url: "/users/password/change",
      data: body,
    });
    toast.success(response.data.message);
    return response.data.message;
  } catch (error: any) {
    return error.message;
  }
};

export const changeProfileInfo = async ({
  body,
  id,
}: {
  body: any;
  id: number;
}) => {
  try {
    const response = await instance({
      method: "put",
      url: `/users/${id}/`,
      data: body,
    });
    toast.success("Profile Updated sucessfully!");
    return response.data;
  } catch (error: any) {
    return error.message;
  }
};
export const resetPassword = async ({
  body,
  uid,
  token,
}: {
  body: any;
  uid: string;
  token: string;
}) => {
  try {
    const response = await instance({
      method: "post",
      url: `/users/reset-password/confirm/${uid}/${token}`,
      data: body,
    });
    return response.data.message;
  } catch (error: any) {
    return error.message;
  }
};

export const validateUidToken = async (payload: {
  uid: string;
  token: string;
}) => {
  const { uid, token } = payload;
  try {
    const response = await instance({
      method: "get",
      url: `users/reset-password?uid=${uid}&token=${token}`,
    });
    return response.data.message;
  } catch (error: any) {
    return error.message;
  }
};
export const registerUser = async (body: {
  email: string;
  password: string;
  confirmPassword: string;
  first_name: string;
  last_name: string;
}) => {
  try {
    const response = await instance({
      method: "post",
      url: "users/register",
      data: body,
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response.data.email[0];
    toast.error(errorMessage);
    return error;
  }
};
