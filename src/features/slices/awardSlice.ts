import { createSlice } from "@reduxjs/toolkit";
import { createCrudThunks } from "../createCrudThunk";

export interface award {
  id: string;
  question?: string;
  answer?: string;
  blogId?: string;
  [key: string]: any;
}

interface awardState {
  list: any;
  loading: boolean;
  error: string | null;
  currentItem: award | null;
}

const BASE = "/awards";

const { fetchList, create, update, remove, fetchById } = createCrudThunks<
  any,
  award,
  Partial<award>,
  Partial<award>
>("awards", BASE);

export const getAll = fetchList;
export const storeRecord = create;
export const updateRecord = update;
export const deleteRecord = remove;
export const fetchRecordById = fetchById;

const initialState: awardState = {
  list: null,
  loading: false,
  error: null,
  currentItem: null,
};

const awardSlice = createSlice({
  name: "award",
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

export const { clearCurrentItem } = awardSlice.actions;
export default awardSlice.reducer;
