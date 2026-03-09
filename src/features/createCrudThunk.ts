import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiClient from "../admin/hooks/apiClient";
import {
  handleApiError,
  RejectPayload,
} from "../admin/utils/errorhandlers/apiErrorHandler";

interface FetchListArgs {
  url?: string;
  params?: Record<string, any>;
}

interface FetchByIdArgs {
  id: string | number;
  url?: string;
}

interface MutateArgs<T> {
  id?: string | number;
  data: T | FormData;
  url?: string;
}

interface ErrorHandlerOptions {
  toastMessage?: string;
}

export function createCrudThunks<
  ListResponse = any,
  SingleResponse = any,
  CreatePayload = any,
  UpdatePayload = any,
>(name: string, baseUrl: string, client = apiClient) {
  const getUrl = (url?: string, id?: string | number) => {
    const resolved = url || baseUrl;
    return id ? `${resolved}/${encodeURIComponent(id)}` : resolved;
  };

  const handleError = (err: any, action: string, thunkAPI: any) => {
    const payload = handleApiError(err, {
      toastMessage: `Failed to ${action} ${name}`,
    });
    return thunkAPI.rejectWithValue(payload);
  };

  return {
    fetchList: createAsyncThunk<
      ListResponse,
      FetchListArgs | undefined,
      { rejectValue: RejectPayload }
    >(`${name}/fetchList`, async ({ url, params } = {}, thunkAPI) => {
      try {
        const res = await client.get(getUrl(url), { params });
        return res.data;
      } catch (err) {
        return handleError(err, "fetch", thunkAPI);
      }
    }),

    fetchById: createAsyncThunk<
      SingleResponse,
      FetchByIdArgs,
      { rejectValue: RejectPayload }
    >(`${name}/fetchById`, async ({ id, url }, thunkAPI) => {
      try {
        const res = await client.get(getUrl(url, id));
        return res.data.data;
      } catch (err) {
        return handleError(err, "fetch", thunkAPI);
      }
    }),

    create: createAsyncThunk<
      SingleResponse,
      MutateArgs<CreatePayload>,
      { rejectValue: RejectPayload }
    >(`${name}/create`, async ({ data, url }, thunkAPI) => {
      try {
        const res = await client.post(getUrl(url), data);
        toast.success(`${name} created successfully`);
        return res.data.data;
      } catch (err) {
        return handleError(err, "create", thunkAPI);
      }
    }),

    update: createAsyncThunk<
      SingleResponse,
      MutateArgs<UpdatePayload>,
      { rejectValue: RejectPayload }
    >(`${name}/update`, async ({ id, data, url }, thunkAPI) => {
      try {
        const res = await client.patch(getUrl(url, id!), data);
        toast.success(`${name} updated successfully`);
        return res.data.data;
      } catch (err) {
        return handleError(err, "update", thunkAPI);
      }
    }),

    remove: createAsyncThunk<
      string | number,
      FetchByIdArgs,
      { rejectValue: RejectPayload }
    >(`${name}/remove`, async ({ id, url }, thunkAPI) => {
      try {
        await client.delete(getUrl(url, id));
        toast.success(`${name} deleted`);
        return id;
      } catch (err) {
        return handleError(err, "delete", thunkAPI);
      }
    }),
  };
}
