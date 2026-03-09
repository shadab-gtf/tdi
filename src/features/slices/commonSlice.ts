import {
  createSlice,
  isPending,
  isFulfilled,
  isRejected,
  PayloadAction,
} from "@reduxjs/toolkit";
import { createCrudThunks } from "../createCrudThunk";
import apiPublicClient from "@/admin/hooks/apiPublicClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/admin/hooks/apiClient";

export interface BaseEntity {
  id: string | number;
  title?: string;
  name?: string;
  label?: string;
  description?: string;
  [key: string]: any;
}

interface EntityState<T = BaseEntity> {
  list: T[];
  loading: boolean;
  error: string | null;
  currentItem: T | null;
}

type EntitiesConfig = Record<string, string>;

type CommonState = Record<string, EntityState>;

const ENTITIES: EntitiesConfig = {
  platter: "/platter",
  typology: "/typology",
  subtypology: "/subtypology",
  amenities: "/amenities",
  countries: "/countries",
  projectStatus: "/project-status",
  mediaPressTypes: "/media-center/types",
  developer: "/developer",
  cities: "/cities",
};

export const lookupThunks = Object.fromEntries(
  Object.entries(ENTITIES).map(([key, endpoint]) => {
    return [key, createCrudThunks(key, endpoint)];
  }),
) as Record<string, ReturnType<typeof createCrudThunks>>;

const initialEntityState: EntityState = {
  list: [],
  loading: false,
  error: null,
  currentItem: null,
};

const initialState: CommonState = Object.keys(ENTITIES).reduce((acc, key) => {
  acc[key] = { ...initialEntityState };
  return acc;
}, {} as CommonState);

export const updatePlatterSeq = createAsyncThunk<
  BaseEntity,
  { itemId: string | number; seq: number }
>("platter/updatePlatterSeq", async ({ itemId, seq }, { rejectWithValue }) => {
  try {
    const res = await apiClient.patch(`/platter/${itemId}/seq`, { seq });

    return res?.data?.data;
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data || { message: "Failed to update sequence" },
    );
  }
});
const commonSlice = createSlice({
  name: "lookups",
  initialState,
  reducers: {
    clearCurrentItem(state, action: PayloadAction<string>) {
      const key = action.payload;
      if (state[key]) {
        state[key].currentItem = null;
      }
    },
  },
  extraReducers: (builder) => {
    Object.keys(ENTITIES).forEach((key) => {
      const { fetchList, fetchById, create, update, remove } =
        lookupThunks[key];

      builder
        .addCase(fetchList.fulfilled, (state, action) => {
          state[key].list = action.payload as BaseEntity[];
        })
        .addCase(fetchById.fulfilled, (state, action) => {
          state[key].currentItem = action.payload as BaseEntity;
        })
        .addCase(create.fulfilled, (state, action) => {
          state[key].list = Array.isArray(state[key].list)
            ? [...state[key].list, action.payload as BaseEntity]
            : [action.payload as BaseEntity];
        })
        .addCase(update.fulfilled, (state, action) => {
          const payload = action.payload as BaseEntity;

          if (Array.isArray(state[key].list)) {
            state[key].list = state[key].list.map((item) =>
              item.id === payload.id ? payload : item,
            );
          }

          if (state[key].currentItem?.id === payload.id) {
            state[key].currentItem = payload;
          }
        })
        .addCase(remove.fulfilled, (state, action) => {
          const deletedId =
            typeof action.payload === "string" ||
            typeof action.payload === "number"
              ? action.payload
              : (action.payload as any)?.id;

          if (Array.isArray(state[key].list)) {
            state[key].list = state[key].list.filter(
              (item) => item.id !== deletedId,
            );
          }

          if (state[key].currentItem?.id === deletedId) {
            state[key].currentItem = null;
          }
        });
    });
    builder.addCase(updatePlatterSeq.fulfilled, (state, action) => {
      const payload = action.payload;

      if (Array.isArray(state.platter.list)) {
        state.platter.list = state.platter.list.map((item) =>
          item.id === payload.id ? payload : item,
        );
      }
    });

    builder
      .addMatcher(isPending, (state, action) => {
        const key = Object.keys(ENTITIES).find((k) =>
          action.type.startsWith(`${k}/`),
        );

        if (key) {
          state[key].loading = true;
        }
      })
      .addMatcher(isFulfilled, (state, action) => {
        const key = Object.keys(ENTITIES).find((k) =>
          action.type.startsWith(`${k}/`),
        );

        if (key) {
          state[key].loading = false;
          state[key].error = null;
        }
      })
      .addMatcher(isRejected, (state, action: any) => {
        const key = Object.keys(ENTITIES).find((k) =>
          action.type.startsWith(`${k}/`),
        );

        if (key) {
          state[key].loading = false;
          state[key].error =
            action.payload?.message || action.error?.message || "Unknown error";
        }
      });
  },
});

export const { clearCurrentItem } = commonSlice.actions;
export default commonSlice.reducer;
