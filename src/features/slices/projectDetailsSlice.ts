"use client";

import {
  createSlice,
  isPending,
  isFulfilled,
  isRejected,
  current,
} from "@reduxjs/toolkit";
import { createCrudThunks } from "../createCrudThunk";

const { fetchList, fetchById, create, update, remove } = createCrudThunks<
  any,
  any,
  any,
  string
>("sectionList", "");

export {
  fetchList as fetchSectionList,
  fetchById as fetchSectionById,
  create,
  update,
  remove,
};

interface ProjectDetailsState {
  list: any;
  single: any;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectDetailsState = {
  list: null,
  single: null,
  loading: false,
  error: null,
};

const projectDetailsSlice = createSlice({
  name: "projectList",
  initialState,
  reducers: {
    clearItems(state) {
      state.list = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchList.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(fetchById.fulfilled, (state, action) => {
        state.single = action.payload;
      })
      // CREATE
      .addCase(create.fulfilled, (state, action) => {
        if (!Array.isArray(state.list?.data)) return;

        const newRecord = action.payload.record;
        state.list.data.unshift(newRecord);
      })

      // UPDATE
      .addCase(update.fulfilled, (state, action) => {
        if (!Array.isArray(state.list?.data)) return;
        const updated = action.payload.record ?? action.payload;
        const idx = state.list.data.findIndex(
          (item: any) => item.id === updated.id,
        );
        if (idx !== -1) {
          state.list.data[idx] = updated;
        }
      })

      // DELETE
      .addCase(remove.fulfilled, (state, action) => {
        if (!Array.isArray(state.list?.data)) return;

        const deletedId = action.payload;

        state.list.data = state.list.data.filter(
          (item: any) => item.id !== deletedId,
        );
      })
      .addMatcher(isPending, (state) => {
        state.loading = true;
      })
      .addMatcher(isFulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addMatcher(isRejected, (state, action: any) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.error?.message || "Unknown error";
      });
  },
});

export default projectDetailsSlice.reducer;
