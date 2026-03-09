"use client";

import {
  createSlice,
  isPending,
  isFulfilled,
  isRejected,
} from "@reduxjs/toolkit";
import { createCrudThunks } from "../createCrudThunk";
import { PaginatedResponse } from "@/types/common";
import { Page } from "@/types/page";

interface PagesState {
  pagesData:
    | {
        data: Page[] | PaginatedResponse<Page>;
        pagination?: any;
      }
    | Page[]
    | PaginatedResponse<Page>;
  loading: boolean;
  error: string | null;
  currentItem: Page | null;
}

const PAGE_API = "/pages";

const { fetchList, fetchById, create, update, remove } = createCrudThunks<
  Page[] | PaginatedResponse<Page>,
  Page,
  string | number
>("pages", PAGE_API);

export const fetchPages = fetchList;
export const fetchPageById = fetchById;
export const addPage = create;
export const updatePage = update;
export const deletePage = remove;

const initialState: PagesState = {
  pagesData: [],
  loading: false,
  error: null,
  currentItem: null,
};

const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    clearCurrentItem(state) {
      state.currentItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPages.fulfilled, (state, action) => {
        state.pagesData = action.payload;
      })

      .addCase(fetchPageById.fulfilled, (state, action) => {
        state.currentItem = action.payload;
      })

      .addCase(addPage.fulfilled, (state, action) => {
        const newItem = action.payload;

        if (Array.isArray(state.pagesData)) {
          state.pagesData.push(newItem);
        } else if (state.pagesData && typeof state.pagesData === "object") {
          if (
            "data" in state.pagesData &&
            Array.isArray(state.pagesData.data)
          ) {
            state.pagesData.data.push(newItem);
            if (state.pagesData.pagination?.total !== undefined) {
              state.pagesData.pagination.total += 1;
            }
          } else if (
            "items" in state.pagesData &&
            Array.isArray(state.pagesData.items)
          ) {
            state.pagesData.items.push(newItem);
            if (state.pagesData.total !== undefined) {
              state.pagesData.total += 1;
            }
          }
        }
      })

      .addCase(updatePage.fulfilled, (state, action) => {
        const payload = action.payload;

        const updateItemInArray = (arr: Page[]) => {
          const index = arr.findIndex((p) => p.id === payload.id);
          if (index !== -1) arr[index] = payload;
        };

        if (Array.isArray(state.pagesData)) {
          updateItemInArray(state.pagesData);
        } else if (state.pagesData && typeof state.pagesData === "object") {
          if (
            "data" in state.pagesData &&
            Array.isArray(state.pagesData.data)
          ) {
            updateItemInArray(state.pagesData.data);
          } else if (
            "items" in state.pagesData &&
            Array.isArray(state.pagesData.items)
          ) {
            updateItemInArray(state.pagesData.items);
          }
        }

        if (state.currentItem?.id === payload.id) {
          state.currentItem = payload;
        }
      })
      .addCase(deletePage.fulfilled, (state, action) => {
        const deletedId =
          typeof action.payload === "string" ||
          typeof action.payload === "number"
            ? action.payload
            : (action.payload as any)?.id;

        const filterItemFromArray = (arr: Page[]) => {
          return arr.filter((p) => p.id !== deletedId);
        };

        if (Array.isArray(state.pagesData)) {
          state.pagesData = filterItemFromArray(state.pagesData);
        } else if (state.pagesData && typeof state.pagesData === "object") {
          if (
            "data" in state.pagesData &&
            Array.isArray(state.pagesData.data)
          ) {
            state.pagesData.data = filterItemFromArray(state.pagesData.data);
            if (state.pagesData.pagination?.total !== undefined) {
              state.pagesData.pagination.total -= 1;
            }
          } else if (
            "items" in state.pagesData &&
            Array.isArray(state.pagesData.items)
          ) {
            state.pagesData.items = filterItemFromArray(state.pagesData.items);
            if (state.pagesData.total !== undefined) {
              state.pagesData.total -= 1;
            }
          }
        }

        if (state.currentItem?.id === deletedId) {
          state.currentItem = null;
        }
      })

      .addMatcher(isPending, (state) => {
        state.loading = true;
      })
      .addMatcher(isFulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addMatcher(isRejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as any)?.message ||
          action.error?.message ||
          "Unknown error";
      });
  },
});

export const { clearCurrentItem } = pagesSlice.actions;
export default pagesSlice.reducer;
