import {
  createSlice,
  createAsyncThunk,
  isPending,
  isFulfilled,
  isRejected,
  PayloadAction,
} from "@reduxjs/toolkit";
import apiClient from "@/admin/hooks/apiClient";
import { toast } from "react-toastify";
import { BASE_ADMIN } from "config";

interface Subtypology {
  id: string;
  name: string;
  subTypologyId?: string;
}

interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface TypologyMappingState {
  unassignedSubtypes: Subtypology[];
  assignedSubtypes: Subtypology[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const fetchUnassignedSubtypes = createAsyncThunk<
  Subtypology[],
  { typologyId: string }
>(
  "typologyMapping/fetchUnassignedSubtypes",
  async ({ typologyId }, thunkAPI) => {
    try {
      const res = await apiClient.get(
        `${BASE_ADMIN}/typologymapping/${typologyId}/unassigned-subtypes`,
      );
      return res?.data?.data ?? [];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err.message,
      );
    }
  },
);

export const fetchAssignedSubtypes = createAsyncThunk<
  { data: Subtypology[]; total?: number },
  { typologyId: string; params?: PaginationParams }
>(
  "typologyMapping/fetchAssignedSubtypes",
  async ({ typologyId, params }, thunkAPI) => {
    try {
      const res = await apiClient.get(
        `${BASE_ADMIN}/typologymapping/${typologyId}/subtypes`,
        { params },
      );
      return {
        data: res?.data?.data ?? [],
        total: res?.data?.pagination?.total,
      };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err.message,
      );
    }
  },
);

export const addMapping = createAsyncThunk<
  Subtypology,
  { typologyId: string; subTypologyId: string }
>("typologyMapping/addMapping", async (payload, thunkAPI) => {
  try {
    const res = await apiClient.post(`${BASE_ADMIN}/typologymapping`, payload);
    toast.success("Subtypology added successfully");
    return res?.data?.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err?.response?.data?.message || err.message,
    );
  }
});

export const deleteMapping = createAsyncThunk<
  string,
  { typologyId: string; subTypologyId: string }
>(
  "typologyMapping/deleteMapping",
  async ({ typologyId, subTypologyId }, thunkAPI) => {
    try {
      await apiClient.delete(
        `${BASE_ADMIN}/typologymapping/${typologyId}/subtypes/${subTypologyId}`,
      );
      toast.success("Subtypology removed successfully");
      return subTypologyId;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err.message,
      );
    }
  },
);

const initialState: TypologyMappingState = {
  unassignedSubtypes: [],
  assignedSubtypes: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  },
};

const typologyMappingSlice = createSlice({
  name: "typologyMapping",
  initialState,
  reducers: {
    clearMappingError(state) {
      state.error = null;
    },
    setPagination(state, action: PayloadAction<{ page: number }>) {
      state.pagination.page = action.payload.page;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnassignedSubtypes.fulfilled, (state, action) => {
        state.unassignedSubtypes = action.payload;
      })
      .addCase(fetchAssignedSubtypes.fulfilled, (state, action) => {
        state.assignedSubtypes = action.payload.data;
        if (action.payload.total !== undefined) {
          state.pagination.total = action.payload.total;
          state.pagination.totalPages = Math.ceil(
            action.payload.total / state.pagination.limit,
          );
        }
      })
      .addCase(addMapping.fulfilled, (state, action) => {
        const newItem = action.payload;

        state.assignedSubtypes.push(newItem);
        state.unassignedSubtypes = state.unassignedSubtypes.filter(
          (item) => item.id !== newItem.subTypologyId,
        );
      })
      .addCase(deleteMapping.fulfilled, (state, action) => {
        state.assignedSubtypes = state.assignedSubtypes.filter(
          (item) => item.id !== action.payload,
        );
      })

      /* ---------- Matchers ---------- */
      .addMatcher(isPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isFulfilled, (state) => {
        state.loading = false;
      })
      .addMatcher(isRejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error?.message ||
          "Unknown error";
        toast.error(state.error);
      });
  },
});

export const { clearMappingError, setPagination } =
  typologyMappingSlice.actions;
export default typologyMappingSlice.reducer;
