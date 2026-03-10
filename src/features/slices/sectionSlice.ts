"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createCrudThunks } from "../createCrudThunk";
import apiClient from "@/admin/hooks/apiClient";
import {
  handleApiError,
  RejectPayload,
} from "@/admin/utils/errorhandlers/apiErrorHandler";
import { Section } from "@/types/section";

interface FetchSectionsByPageArgs {
  page: string;
  params?: Record<string, any>;
}

interface SectionsState {
  sections: Section[];
  currentSection: Section | null;
  loading: boolean;
  error: string | null;
}

const BASE = "/page-sections";

export const fetchSectionsByPage = createAsyncThunk<
  Section[],
  FetchSectionsByPageArgs,
  { rejectValue: RejectPayload }
>("sections/fetchByPage", async ({ page, params = {} }, thunkAPI) => {
  try {
    const res = await apiClient.get(
      `/page-sections?slug=${encodeURIComponent(page)}`,
      {
        params,
      },
    );
    return res?.data?.data ?? [];
  } catch (err) {
    const payload = handleApiError(err);
    return thunkAPI.rejectWithValue(payload);
  }
});

const { fetchById, create, update, remove } = createCrudThunks<
  Section,
  Section,
  string | number
>("section", BASE);

export const fetchSectionById = fetchById;
export const addSection = create;
export const updateSection = update;
export const deleteSection = remove;

const initialState: SectionsState = {
  sections: [],
  currentSection: null,
  loading: false,
  error: null,
};

const sectionsSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    clearCurrentSection(state) {
      state.currentSection = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSectionsByPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSectionsByPage.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload ?? [];
      })
      .addCase(fetchSectionsByPage.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Failed to fetch sections";
      })

      .addCase(fetchSectionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSectionById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSection = action.payload ?? null;
      })
      .addCase(fetchSectionById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Failed to fetch section";
      })

      .addCase(addSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSection.fulfilled, (state, action) => {
        state.loading = false;
        const existingIndex = state.sections.findIndex(
          (s) => s.id === action.payload.id,
        );
        if (existingIndex === -1) {
          state.sections.push(action.payload);
        } else {
          state.sections[existingIndex] = action.payload;
        }
      })
      .addCase(addSection.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Failed to add section";
      })

      .addCase(updateSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSection.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;

        const index = state.sections.findIndex((s) => s.id === payload.id);
        if (index !== -1) {
          state.sections[index] = payload;
        } else {
          state.sections.push(payload);
        }

        if (state.currentSection?.id === payload.id) {
          state.currentSection = payload;
        }
      })
      .addCase(updateSection.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Failed to update section";
      })

      .addCase(deleteSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload;

        state.sections = state.sections.filter(
          (s) => s.id !== String(deletedId),
        );

        if (state.currentSection?.id === String(deletedId)) {
          state.currentSection = null;
        }
      })
      .addCase(deleteSection.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Failed to delete section";
      });
  },
});

export const { clearCurrentSection } = sectionsSlice.actions;
export default sectionsSlice.reducer;
