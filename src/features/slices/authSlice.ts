import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient, { setIsLoggingIn } from "@/admin/hooks/apiClient";
import {
  handleApiError,
  RejectPayload,
} from "@/admin/utils/errorhandlers/apiErrorHandler";
import { toast } from "react-toastify";

interface User {
  id: string;
  email: string;
  role: string;
  token?: string;
  accessToken: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export const loginAdmin = createAsyncThunk<
  User,
  LoginCredentials,
  { rejectValue: RejectPayload }
>("auth/login", async (credentials, thunkAPI) => {
  setIsLoggingIn(true);
  try {
    const res = await apiClient.post("/auth/login", credentials);
    const { user, accessToken, refreshToken } = res.data.data;

    localStorage.setItem("refreshToken", refreshToken);

    return {
      ...user,
      accessToken,
    };
  } catch (error) {
    const payload = handleApiError(error, {
      onUnauthorized: () => thunkAPI.dispatch(logout()),
    });

    toast.error(payload.message);
    return thunkAPI.rejectWithValue(payload);
  } finally {
    setIsLoggingIn(false);
  }
});

export const validateSession = createAsyncThunk<
  User,
  void,
  { rejectValue: RejectPayload }
>("auth/validate", async (_, thunkAPI) => {
  try {
    const res = await apiClient.post("/auth/refresh", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    const payload = handleApiError(error, {
      onUnauthorized: () => thunkAPI.dispatch(logout()),
    });

    return thunkAPI.rejectWithValue(payload);
  }
});

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    updateAccessToken(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.accessToken = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })
      .addCase(
        validateSession.fulfilled,
        (state, action: PayloadAction<User>) => {
          // state.user = action.payload;
          state.isAuthenticated = true;
        },
      )
      .addCase(validateSession.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, updateAccessToken } = authSlice.actions;
export default authSlice.reducer;
