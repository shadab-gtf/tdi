import { createSlice } from "@reduxjs/toolkit";
import { createCrudThunks } from "../createCrudThunk";

export interface csrGallery {
  id: string;
  alt?: string;
  desktop_image?: string;
  mobile_image?: string;
  eventId?: string;
}

interface csrGalleryState {
  list: any;
  loading: boolean;
  error: string | null;
  currentItem: csrGallery | null;
}

const BASE = "/event-gallery";

const { fetchList, create, update, remove, fetchById } = createCrudThunks<
  any,
  csrGallery,
  Partial<csrGallery>,
  Partial<csrGallery>
>("gallery", "");

export const fetchcsrGallery = fetchList;
export const addcsrGallery = create;
export const updatecsrGallery = update;
export const deletecsrGallery = remove;
export const fetchcsrGalleryById = fetchById;

const initialState: csrGalleryState = {
  list: null,
  loading: false,
  error: null,
  currentItem: null,
};

const csrGallerySlice = createSlice({
  name: "csrGallery",
  initialState,
  reducers: {
    clearCurrentItem(state) {
      state.currentItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchcsrGallery.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(fetchcsrGalleryById.fulfilled, (state, action) => {
        state.currentItem = action.payload;
      });
  },
});

export const { clearCurrentItem } = csrGallerySlice.actions;
export default csrGallerySlice.reducer;
