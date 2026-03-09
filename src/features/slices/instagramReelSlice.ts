"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createCrudThunks } from "../createCrudThunk";
import apiClient from "@/admin/hooks/apiClient";
import {
  handleApiError,
  RejectPayload,
} from "@/admin/utils/errorhandlers/apiErrorHandler";

interface InstagramReel {
  id: string;
  reelId: string;
  thumbnail_url: string;
  isDisplay: boolean;
  seq: number;
  createdAt?: string;
  updatedAt?: string;
}
interface InstagramState {
  reels: InstagramReel[];
  allReels: InstagramReel[];
  loading: boolean;
  error: string | null;
}

const BASE = "/instagram-reel";

/* ---------------- FETCH SELECTED REELS (TABLE) ---------------- */

export const fetchInstagramReels = createAsyncThunk<
  InstagramReel[],
  { params?: Record<string, any> } | void,
  { rejectValue: RejectPayload }
>("instagram/fetchReels", async (args, thunkAPI) => {
  try {
    const res = await apiClient.get(BASE, {
      params: args?.params,
    });

    return res?.data?.data ?? [];
  } catch (err) {
    const payload = handleApiError(err);
    return thunkAPI.rejectWithValue(payload);
  }
});

/* ---------------- FETCH ALL REELS (CARDS) ---------------- */

export const fetchAllInstagramReels = createAsyncThunk<
  InstagramReel[],
  void,
  { rejectValue: RejectPayload }
>("instagram/fetchAllReels", async (_, thunkAPI) => {
  try {
    const res = await apiClient.get(`${BASE}/all-reels`);

    return res?.data?.data ?? [];
  } catch (err) {
    const payload = handleApiError(err);
    return thunkAPI.rejectWithValue(payload);
  }
});

export const updateInstagramReelSeq = createAsyncThunk<
  InstagramReel,
  { itemId: string; seq: number }
>("instagramReel/updateSeq", async ({ itemId, seq }) => {
  const res = await apiClient.patch(`/instagram-reel/${itemId}/seq`, { seq });
  return res.data;
});

export const updateInstagramReelDisplay = createAsyncThunk<
  InstagramReel,
  { itemId: string; isDisplay: boolean }
>("instagramReel/updateDisplay", async ({ itemId, isDisplay }) => {
  const res = await apiClient.patch(`/instagram-reel/${itemId}/display`, {
    isDisplay,
  });
  return res.data;
});

const { create, remove } = createCrudThunks<
  InstagramReel[],
  InstagramReel,
  FormData
>("instagramReel", BASE);

export const addInstagramReel = create;
export const deleteInstagramReel = remove;

/* ---------------- STATE ---------------- */

const initialState: InstagramState = {
  reels: [],
  allReels: [],
  loading: false,
  error: null,
};

const instagramReelSlice = createSlice({
  name: "instagramReels",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      /* -------- FETCH TABLE -------- */

      .addCase(fetchInstagramReels.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInstagramReels.fulfilled, (state, action) => {
        state.loading = false;
        state.reels = action.payload ?? [];
      })
      .addCase(fetchInstagramReels.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Failed to fetch reels";
      })
      .addCase(updateInstagramReelSeq.fulfilled, (state, action) => {
        const index = state.reels.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) state.reels[index] = action.payload;
      })

      .addCase(updateInstagramReelDisplay.fulfilled, (state, action) => {
        const index = state.reels.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) state.reels[index] = action.payload;
      })

      /* -------- FETCH CARDS -------- */

      .addCase(fetchAllInstagramReels.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllInstagramReels.fulfilled, (state, action) => {
        state.loading = false;
        state.allReels = action.payload ?? [];
      })
      .addCase(fetchAllInstagramReels.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Failed to fetch reels";
      })

      /* -------- ADD REEL -------- */

      .addCase(addInstagramReel.pending, (state) => {
        state.loading = true;
      })
      .addCase(addInstagramReel.fulfilled, (state, action) => {
        state.loading = false;

        const existingIndex = state.reels.findIndex(
          (r) => r.id === action.payload.id,
        );

        if (existingIndex === -1) {
          state.reels.push(action.payload);
        } else {
          state.reels[existingIndex] = action.payload;
        }
      })
      .addCase(addInstagramReel.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Failed to add reel";
      })

      /* -------- DELETE REEL -------- */

      .addCase(deleteInstagramReel.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteInstagramReel.fulfilled, (state, action) => {
        state.loading = false;

        const deletedId = action.payload;

        state.reels = state.reels.filter((r) => r.id !== String(deletedId));
      })
      .addCase(deleteInstagramReel.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Failed to delete reel";
      });
  },
});

export default instagramReelSlice.reducer;
