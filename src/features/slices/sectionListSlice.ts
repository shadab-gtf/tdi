import {
  createSlice,
  isPending,
  isFulfilled,
  isRejected,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { createCrudThunks } from "../createCrudThunk";
import { SectionItem, SectionListResponse } from "@/types/section";
import {
  handleApiError,
  RejectPayload,
} from "@/admin/utils/errorhandlers/apiErrorHandler";
import apiClient from "@/admin/hooks/apiClient";

interface SectionListState {
  listResponse: SectionListResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: SectionListState = {
  listResponse: null,
  loading: false,
  error: null,
};

const { fetchList, create, update, remove } = createCrudThunks<
  SectionListResponse,
  SectionItem,
  SectionItem,
  SectionItem
>("sectionList", "");

export { fetchList, create, update, remove };

export const updateIsHome = createAsyncThunk<
  SectionItem,
  { id: string | number; is_home: boolean },
  { rejectValue: RejectPayload }
>("sectionList/updateIsHome", async ({ id, is_home }) => {
  try {
    const res = await apiClient.patch(`/media-coverage/${id}/feature`, {
      is_home,
    });

    return res.data;
  } catch (error: any) {
    return handleApiError(error, {
      toastMessage: "Failed to update is_home",
    });
  }
});

const sectionListSlice = createSlice({
  name: "sectionList",
  initialState,
  reducers: {
    clearItems(state) {
      state.listResponse = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchList.fulfilled, (state, action) => {
        state.listResponse = action.payload;
      })

      .addCase(create.fulfilled, (state, action) => {
        if (!Array.isArray(state.listResponse)) return;

        if (!state.listResponse) return;
        state.listResponse.items.unshift(action.payload);
      })

      .addCase(update.fulfilled, (state, action) => {
        if (!Array.isArray(state.listResponse)) return;

        const index = state.listResponse.items.findIndex(
          (item) => item.id === action.payload.id,
        );

        if (index !== -1) {
          state.listResponse.items[index] = action.payload;
        }
      })

      .addCase(remove.fulfilled, (state, action) => {
        if (!Array.isArray(state.listResponse)) return;

        state.listResponse.items = state.listResponse.items.filter(
          (item) => item.id !== action.payload,
        );
      })
      .addCase(updateIsHome.fulfilled, (state, action) => {
        if (!state.listResponse?.items) return;

        const index = state.listResponse.items.findIndex(
          (item) => item.id === action.payload.id,
        );

        if (index !== -1) {
          state.listResponse.items[index] = action.payload;
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
          (action.payload as RejectPayload)?.message ||
          action.error?.message ||
          "Unknown error";
      });
  },
});

export const { clearItems } = sectionListSlice.actions;
export default sectionListSlice.reducer;
