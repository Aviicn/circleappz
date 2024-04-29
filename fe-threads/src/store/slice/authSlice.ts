import { setAuthToken } from "@/libs/api";
import { IUser } from "@/types/User";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IUser = {
  id: 0,
  fullname: "",
  username: "",
  email: "",
  image: "",
  description: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    AUTH_LOGIN: (_, action) => {
      const payload = action.payload;
      setAuthToken(payload.token);
      localStorage.setItem("token", payload.token);

      const user: IUser = {
        id: payload.user.id,
        fullname: payload.user.fullname,
        username: payload.user.username,
        email: payload.user.email,
        description: payload.user.description,
        image: payload.user.image,
      };

      return user;
    },
    AUTH_CHECK: (_, action) => {
      const payload = action.payload;

      const user: IUser = {
        id: payload.id,
        fullname: payload.fullname,
        username: payload.username,
        email: payload.email,
        image: payload.image,
        description: payload.description,
      };

      return user;
    },
    AUTH_EDIT: (_, action) => {
      const payload = action.payload;

      const user: IUser = {
        id: payload.id,
        fullname: payload.fullname,
        username: payload.username,
        email: payload.email,
        image: payload.image,
        description: payload.description,
      };

      return user;
    },
    AUTH_ERROR: () => {
      localStorage.removeItem("token");
    },
    AUTH_LOGOUT: () => {
      localStorage.removeItem("token");
    },
  },
});
