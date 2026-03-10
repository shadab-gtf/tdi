import { createSlice } from "@reduxjs/toolkit";
import { createCrudThunks } from "../createCrudThunk";

export interface ourPartners {
  id: string;
  title?: string;
  alt?: string;
  description?: string;
  [key: string]: any;
}

interface ourPartnersState {
  loading: boolean;
  error: string | null;
  currentItem: ourPartners | null;
  list: any;
}

const BASE = "/our-partners";

const { fetchList, create, update, remove, fetchById } = createCrudThunks<
  any,
  ourPartners,
  Partial<ourPartners>,
  Partial<ourPartners>
>("ourPartners", BASE);

export const getAll = fetchList;
export const storeRecord = create;
export const updateRecord = update;
export const deleteRecord = remove;
export const fetchRecordById = fetchById;

const initialState: ourPartnersState = {
  list: null,
  loading: false,
  error: null,
  currentItem: null,
};

const ourPartnersSlice = createSlice({
  name: "ourPartners",
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

export const { clearCurrentItem } = ourPartnersSlice.actions;
export default ourPartnersSlice.reducer;
