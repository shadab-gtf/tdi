"use client";

import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  isPending,
  isFulfilled,
  isRejected,
} from "@reduxjs/toolkit";

import { createCrudThunks } from "../createCrudThunk";
import apiClient from "@/admin/hooks/apiClient";
import { handleApiError } from "@/admin/utils/errorhandlers/apiErrorHandler";
import { ProjectSection, SectionListItem } from "@/types/project";

export interface ProjectSectionState {
  masterSections: SectionListItem[];
  projectSections: ProjectSection[];
  currentSection: ProjectSection | null;
  loading: boolean;
  error: string | null;
}

interface FetchByProjectAndTypeArgs {
  projectId: string;
  type: string;
}

interface UpdateBannerSeqArgs {
  endpoint: string;
  itemId: string;
  seq: number;
}
interface ChooseBannerSeqArgs {
  itemId: string;
  banner: boolean;
}
interface DeleteProjectSectionFileArgs {
  projectSectionId: string;
  key: string;
}
const BASE = "/project-sections";

export const fetchSections = createAsyncThunk<
  SectionListItem[],
  { params?: Record<string, any> } | undefined
>("project-section/fetchSections", async ({ params } = {}, thunkAPI) => {
  try {
    const res = await apiClient.get(`${BASE}`, {
      params,
    });
    return res?.data?.data ?? [];
  } catch (err) {
    return handleApiError(err, {
      toastMessage: "Failed to fetch sections list",
    });
  }
});

export const fetchSectionsByProject = createAsyncThunk<
  ProjectSection[],
  string | number
>("project-section/fetchByProject", async (projectId, thunkAPI) => {
  try {
    const res = await apiClient.get(
      `${BASE}/${encodeURIComponent(projectId)}/sections`,
    );

    return res?.data?.data ?? [];
  } catch (err) {
    return handleApiError(err, {
      toastMessage: "Failed to fetch project sections",
    });
  }
});

export const fetchSectionByProjectAndType = createAsyncThunk<
  ProjectSection,
  FetchByProjectAndTypeArgs
>(
  "project-section/fetchByProjectAndType",
  async ({ projectId, type }, thunkAPI) => {
    try {
      const res = await apiClient.get(
        `${BASE}/${encodeURIComponent(projectId)}/${encodeURIComponent(type)}`,
      );
      return res?.data?.data;
    } catch (err) {
      return handleApiError(err, {
        toastMessage: "Failed to fetch sections list",
      });
    }
  },
);

export const deleteProjectSectionFile = createAsyncThunk<
  { id: string; key: string },
  DeleteProjectSectionFileArgs,
  { rejectValue: string }
>("project-section/deleteFile", async ({ projectSectionId, key }, thunkAPI) => {
  try {
    await apiClient.delete(
      `${BASE}/${encodeURIComponent(projectSectionId)}/file`,
      {
        data: { key },
      },
    );

    return { id: projectSectionId, key };
  } catch (err: any) {
    handleApiError(err, {
      toastMessage: "Failed to delete file",
    });

    return thunkAPI.rejectWithValue(
      err?.response?.data?.message || "Delete failed",
    );
  }
});

export const updateBannerSeq = createAsyncThunk<
  ProjectSection,
  UpdateBannerSeqArgs
>("project-section/updateBannerSeq", async ({ endpoint, itemId, seq }) => {
  try {
    const res = await apiClient.patch(`/${endpoint}/${itemId}/seq`, { seq });
    return res?.data?.data;
  } catch (err) {
    return handleApiError(err, {
      toastMessage: "Failed to fetch sections list",
    });
  }
});
export const chooseBanner = createAsyncThunk<
  ProjectSection,
  ChooseBannerSeqArgs
>("project-section/chooseBanner", async ({ itemId, banner }) => {
  try {
    const res = await apiClient.patch(`/project-banner/${itemId}/banner`, {
      banner,
    });
    return res?.data?.data;
  } catch (err) {
    return handleApiError(err, {
      toastMessage: "Failed to update banner status",
    });
  }
});

const { fetchById, create, update, remove, fetchList } = createCrudThunks<
  ProjectSection[],
  ProjectSection,
  string
>("section", BASE);

export const fetchSectionById = fetchById;
export const addSection = create;
export const updateSection = update;
export const deleteSection = remove;
export const fetchSectionList = fetchList;

const initialState: ProjectSectionState = {
  masterSections: [],
  projectSections: [],
  currentSection: null,
  loading: false,
  error: null,
};

const projectSectionsSlice = createSlice({
  name: "project-sections",
  initialState,
  reducers: {
    clearCurrentSection(state) {
      state.currentSection = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ----------- MASTER SECTIONS (Dropdown) ----------- */

      .addCase(fetchSections.fulfilled, (state, action) => {
        state.masterSections = action.payload ?? [];
      })

      /* ----------- PROJECT SPECIFIC SECTIONS (Table) ----------- */

      .addCase(fetchSectionsByProject.fulfilled, (state, action) => {
        state.projectSections = action.payload ?? [];
      })

      /* ----------- SINGLE SECTION FETCH ----------- */

      .addCase(fetchSectionById.fulfilled, (state, action) => {
        state.currentSection = action.payload ?? null;
      })

      .addCase(fetchSectionByProjectAndType.fulfilled, (state, action) => {
        state.currentSection = action.payload ?? null;
      })

      /* ----------- ADD SECTION ----------- */

      .addCase(addSection.fulfilled, (state, action) => {
        // Add newly created section only to projectSections list
        state.projectSections.push(action.payload);
      })

      /* ----------- UPDATE SECTION ----------- */

      .addCase(updateSection.fulfilled, (state, action) => {
        const payload = action.payload;

        const idx = state.projectSections.findIndex((s) => s.id === payload.id);

        if (idx !== -1) {
          state.projectSections[idx] = payload;
        }

        if (state.currentSection?.id === payload.id) {
          state.currentSection = payload;
        }
      })
      .addCase(deleteProjectSectionFile.fulfilled, (state, action) => {
        const { id, key } = action.payload;

        const section = state.projectSections.find((s) => s.id === id);

        if (!section) return;

        if (key === "image") {
          section.desktop_image = undefined;
          section.mobile_image = undefined;
        }

        if (key === "video") {
          section.desktop_file = undefined;
          section.mobile_file = undefined;
        }
      })

      /* ----------- UPDATE BANNER SEQUENCE ----------- */

      .addCase(updateBannerSeq.fulfilled, (state, action) => {
        const updated = action.payload;

        const idx = state.projectSections.findIndex((i) => i.id === updated.id);

        if (idx !== -1) {
          state.projectSections[idx] = {
            ...state.projectSections[idx],
            seq: updated.seq,
          };
        }
      })

      /* ---------- GLOBAL MATCHERS ---------- */

      .addMatcher(isPending, (state) => {
        state.loading = true;
      })

      .addMatcher(isFulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })

      .addMatcher(isRejected, (state, action: any) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.error?.message || "Unknown error";
      });
  },
});

export const { clearCurrentSection } = projectSectionsSlice.actions;
export default projectSectionsSlice.reducer;
