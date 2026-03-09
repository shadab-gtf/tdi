import { createSlice } from "@reduxjs/toolkit";
import { createCrudThunks } from "../createCrudThunk";

export interface awardGallery {
  id: string;
  question?: string;
  answer?: string;
  blogId?: string;
  [key: string]: any;
}

interface awardGalleryState {
  list: any;
  loading: boolean;
  error: string | null;
  currentItem: awardGallery | null;
}

const BASE = "/awards-gallery";

const { fetchList, create, update, remove, fetchById } = createCrudThunks<
  any,
  awardGallery,
  Partial<awardGallery>,
  Partial<awardGallery>
>("awards-gallery", BASE);

export const fetchawardGallery = fetchList;
export const addawardGallery = create;
export const updateawardGallery = update;
export const deleteawardGallery = remove;
export const fetchawardGalleryById = fetchById;

const initialState: awardGalleryState = {
  list: null,
  loading: false,
  error: null,
  currentItem: null,
};

const awardGallerySlice = createSlice({
  name: "awardGallery",
  initialState,
  reducers: {
    clearCurrentItem(state) {
      state.currentItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchawardGallery.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(fetchawardGalleryById.fulfilled, (state, action) => {
        state.currentItem = action.payload;
      });
  },
});

export const { clearCurrentItem } = awardGallerySlice.actions;
export default awardGallerySlice.reducer;
