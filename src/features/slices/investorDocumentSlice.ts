import { createSlice } from "@reduxjs/toolkit";
import { createCrudThunks } from "../createCrudThunk";

export interface InvestorDocument {
  id: string;
  categoryId?: string;
  title?: string;
  docType?: string;
  desktop_image?: string;
  mobile_image?: string;
  file?: string;
  list?: any;
  [key: string]: any;
}

interface InvestorDocumentState {
  list: any;
  loading: boolean;
  error: string | null;
  currentItem: InvestorDocument | null;
}

const BASE = "/investor-documents";

const { fetchList, create, update, remove, fetchById } = createCrudThunks<
  any,
  InvestorDocument,
  FormData,
  FormData
>("investorDocument", BASE);

export const fetchInvestorDocuments = fetchList;
export const addInvestorDocument = create;
export const updateInvestorDocument = update;
export const deleteInvestorDocument = remove;
export const fetchInvestorDocumentById = fetchById;

const initialState: InvestorDocumentState = {
  list: null,
  loading: false,
  error: null,
  currentItem: null,
};

const investorDocumentSlice = createSlice({
  name: "investorDocument",
  initialState,
  reducers: {
    clearCurrentItem(state) {
      state.currentItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvestorDocuments.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(fetchInvestorDocumentById.fulfilled, (state, action) => {
        state.currentItem = action.payload;
      });
  },
});

export const { clearCurrentItem } = investorDocumentSlice.actions;
export default investorDocumentSlice.reducer;
