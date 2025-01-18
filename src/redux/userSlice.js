import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import config from "../constants/config";

export const login = createAsyncThunk(
  "freelancer/login",
  async ({ email, password }) => {
    try {
      const res = await axios(config.api + "/api/v1/auth/freelancer/login", {
        method: "POST",
        data: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status != 200) {
        throw new Error("Error");
      }

      const token = res.data.token;
      const freelancerData = res.data.freelancer;

      if (!token) {
        throw new Error("Error");
      }

      if (!freelancerData) {
        throw new Error("Error");
      }

      await AsyncStorage.setItem("userToken", token);

      return {
        token: token,
        user: freelancerData,
      };
    } catch (error) {
      throw error;
    }
  }
);

//Kullanıcı otomatik giriş işlemleri

export const autoLogin = createAsyncThunk("freelancer/auto-login", async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    if (!token) {
      throw new Error("Error");
    }

    const res = await axios(config.api + "/api/v1/auth/freelancer/auto-login", {
      method: "POST",
      data: JSON.stringify({
        authentication_token: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status != 200) {
      throw new Error("Error");
    }

    const receivedToken = res.data.token;

    if (!receivedToken) {
      throw new Error("Error");
    }

    const freelancerData = res.data.freelancer;

    if (!freelancerData) {
      throw new Error("Error");
    }

    return {
      token: receivedToken,
      user: freelancerData,
    };
  } catch (error) {
    throw error;
  }
});

//kullanıcı çıkış işlemleri

export const logout = createAsyncThunk("freelancer/logout", async () => {
  try {
    await AsyncStorage.removeItem("userToken");
    return true;
  } catch (error) {
    throw error;
  }
});

//Kullanıcı kayıt işlemleri
export const register = createAsyncThunk(
  "freelancer/register",
  async ({
    first_name,
    last_name,
    password,
    email,
    role,
    about,
    phone_number,
  }) => {
    try {
      const res = await axios(config.api + "/api/v1/auth/freelancer/register", {
        method: "post",
        data: JSON.stringify({
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
          about: about,
          role: role,
          phone_number: phone_number,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status != 200) {
        throw new Error("Error");
      }

      const receivedToken = res.data.token;

      if (!receivedToken) {
        throw new Error("Error");
      }

      const freelancerData = res.data.freelancer;

      if (!freelancerData) {
        throw new Error("Error");
      }

      await AsyncStorage.setItem("userToken", receivedToken);

      return {
        token: receivedToken,
        user: freelancerData,
      };
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  isLoading: false,
  isAuth: false,
  token: null,
  user: null,
  error: null,
  signUpError: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      const lowerCaseEmail = action.payload.toLowerCase();
      state.email = lowerCaseEmail;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.error = action.payload?.message ?? "error";
      })

      .addCase(autoLogin.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(autoLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(autoLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.token = null;
      })

      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.token = null;
        state.error = null;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message ?? "error";
      })

      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.signUpError = action.payload?.message ?? "error";
      });
  },
});

export const { setEmail, setPassword, setIsLoading } = userSlice.actions;
export default userSlice.reducer;
