import { createSlice } from "@reduxjs/toolkit";
import { createCrudThunks } from "../createCrudThunk";

export interface InvestorCategory {
  id: string;
  title: string;
  parentId: string;
  tabId: string;
  isDocument?: boolean;
  [key: string]: any;
}

interface InvestorCategoryState {
  list: any;
  loading: boolean;
  error: string | null;
  currentItem: InvestorCategory | null;
}

const BASE = "/investor-categories";

const { fetchList, create, update, remove, fetchById } = createCrudThunks<
  any,
  InvestorCategory,
  Partial<InvestorCategory>,
  Partial<InvestorCategory>
>("investor-category", BASE);

export const fetchInvestorCategories = fetchList;
export const addInvestorCategory = create;
export const updateInvestorCategory = update;
export const deleteInvestorCategory = remove;
export const fetchInvestorCategoryById = fetchById;

const initialState: InvestorCategoryState = {
  list: null,
  loading: false,
  error: null,
  currentItem: null,
};

const investorCategoriesSlice = createSlice({
  name: "investorCategories",
  initialState,
  reducers: {
    clearCurrentItem(state) {
      state.currentItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvestorCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInvestorCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchInvestorCategories.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchInvestorCategoryById.fulfilled, (state, action) => {
        state.currentItem = action.payload;
      });
  },
});

export const { clearCurrentItem } = investorCategoriesSlice.actions;

export default investorCategoriesSlice.reducer;
