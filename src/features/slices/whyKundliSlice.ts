import { createSlice } from "@reduxjs/toolkit";
import { createCrudThunks } from "../createCrudThunk";

export interface whyKundli {
  id: string;
  title?: string;
  alt?: string;
  description?: string;
  [key: string]: any;
}

interface whyKundliState {
  loading: boolean;
  error: string | null;
  currentItem: whyKundli | null;
  list: any;
}

const BASE = "/why-kundli";

const { fetchList, create, update, remove, fetchById } = createCrudThunks<
  any,
  whyKundli,
  Partial<whyKundli>,
  Partial<whyKundli>
>("whyKundli", BASE);

export const getAll = fetchList;
export const storeRecord = create;
export const updateRecord = update;
export const deleteRecord = remove;
export const fetchRecordById = fetchById;

const initialState: whyKundliState = {
  list: null,
  loading: false,
  error: null,
  currentItem: null,
};

const whyKundliSlice = createSlice({
  name: "whyKundli",
  initialState,
  reducers: {
    clearCurrentItem(state) {
      state.currentItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(fetchRecordById.fulfilled, (state, action) => {
        state.currentItem = action.payload;
      });
  },
});

export const { clearCurrentItem } = whyKundliSlice.actions;
export default whyKundliSlice.reducer;
