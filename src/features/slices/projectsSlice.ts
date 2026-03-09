"use client";

import {
  createSlice,
  PayloadAction,
  isPending,
  isFulfilled,
  isRejected,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { createCrudThunks } from "../createCrudThunk";
import apiClient from "@/admin/hooks/apiClient";
import { handleApiError } from "@/admin/utils/errorhandlers/apiErrorHandler";
import { PaginatedResponse, Pagination } from "@/types/common";
import { Project } from "@/types/project";

interface ProjectsState {
  projectsData: {
    items: Project[];
    pagination: Pagination;
  };
  dashboardProjects: Project[];
  currentItem: Project | null;
  loading: boolean;
  error: string | null;
}
interface UpdateProjectSeqArgs {
  itemId: string | number;
  seq: number;
}
interface FeaturedProject {
  itemId: string | number;
  feature: boolean;
}
interface DeveloperProject {
  itemId: string | number;
  developer: boolean;
}
const PROJECT_API = "/project";

const { fetchList, fetchById, create, update, remove } = createCrudThunks<
  Project[] | PaginatedResponse<Project>,
  Project,
  string
>("project", PROJECT_API);

export const fetchProject = fetchList;
export const fetchProjectById = fetchById;
export const addProject = create;
export const updateProject = update;
export const deleteProject = remove;

export const fetchDashboardProjects = createAsyncThunk(
  "projects/fetchDashboardProjects",
  async (_, thunkAPI) => {
    try {
      const res = await apiClient.get(PROJECT_API, {
        params: { page: 1, limit: 100 },
      });

      return res?.data?.data ?? [];
    } catch (err) {
      return handleApiError(err, {
        toastMessage: "Failed to fetch dashboard projects",
      });
    }
  },
);
export const featureProject = createAsyncThunk<Project, FeaturedProject>(
  "project-section/featuredProject",
  async ({ itemId, feature }) => {
    try {
      const res = await apiClient.patch(`/project/${itemId}/feature`, {
        feature,
      });
      return res?.data?.data;
    } catch (err) {
      return handleApiError(err, {
        toastMessage: "Failed to add featured project",
      });
    }
  },
);

export const developerProject = createAsyncThunk<Project, DeveloperProject>(
  "project-section/developerProject",
  async ({ itemId, developer }) => {
    try {
      const res = await apiClient.patch(`/project/${itemId}/developer`, {
        developer,
      });
      return res?.data?.data;
    } catch (err) {
      return handleApiError(err, {
        toastMessage: "Failed to add developer project",
      });
    }
  },
);

export const updateProjectSeq = createAsyncThunk<Project, UpdateProjectSeqArgs>(
  "project-section/updateProjectSeq",
  async ({ itemId, seq }) => {
    try {
      const res = await apiClient.patch(`/project-sections/${itemId}/seq`, {
        seq,
      });
      return res?.data?.data;
    } catch (err) {
      return handleApiError(err, {
        toastMessage: "Failed to fetch sections list",
      });
    }
  },
);

const initialState: ProjectsState = {
  projectsData: {
    items: [],
    pagination: {
      total: 0,
      page: 1,
      limit: 10,
    },
  },
  dashboardProjects: [],
  currentItem: null,
  loading: false,
  error: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    clearCurrentItem(state) {
      state.currentItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchDashboardProjects.fulfilled,
        (state, action: PayloadAction<Project[]>) => {
          state.dashboardProjects = action.payload ?? [];
        },
      )

      .addCase(fetchProject.fulfilled, (state, action: PayloadAction<any>) => {
        state.projectsData.items = action.payload?.data ?? [];

        state.projectsData.pagination = {
          total: action.payload?.pagination?.total ?? 0,
          page: action.payload?.pagination?.page ?? 1,
          limit: action.payload?.pagination?.limit ?? 10,
          totalPages: action.payload?.pagination?.totalPages,
          hasNextPage: action.payload?.pagination?.hasNextPage,
          hasPrevPage: action.payload?.pagination?.hasPrevPage,
        };
      })
      .addCase(
        addProject.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.projectsData.items.unshift(action.payload);
          state.projectsData.pagination.total += 1;
        },
      )
      .addCase(
        updateProject.fulfilled,
        (state, action: PayloadAction<Project>) => {
          const index = state.projectsData.items.findIndex(
            (p) => p.id === action.payload.id,
          );
          if (index !== -1) {
            state.projectsData.items[index] = action.payload;
          }

          if (state.currentItem?.id === action.payload.id) {
            state.currentItem = action.payload;
          }
        },
      )
      .addCase(
        deleteProject.fulfilled,
        (state, action: PayloadAction<string | number>) => {
          state.projectsData.items = state.projectsData.items.filter(
            (p) => p.id !== String(action.payload),
          );
          state.projectsData.pagination.total -= 1;
        },
      )

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
          (action.payload as any)?.message ||
          action.error?.message ||
          "Unknown error";
      });
  },
});

export const { clearCurrentItem } = projectsSlice.actions;
export default projectsSlice.reducer;
