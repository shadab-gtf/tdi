import { createSlice } from "@reduxjs/toolkit";
import { createCrudThunks } from "../createCrudThunk";

export interface BlogFaq {
  id: string;
  question?: string;
  answer?: string;
  blogId?: string;
  [key: string]: any;
}

interface BlogFaqState {
  list: any;
  loading: boolean;
  error: string | null;
  currentItem: BlogFaq | null;
}

const BASE = "/blog-faqs";

const { fetchList, create, update, remove, fetchById } = createCrudThunks<
  any,
  BlogFaq,
  Partial<BlogFaq>,
  Partial<BlogFaq>
>("blogFaq", BASE);

export const fetchBlogFaqs = fetchList;
export const addBlogFaq = create;
export const updateBlogFaq = update;
export const deleteBlogFaq = remove;
export const fetchBlogFaqById = fetchById;

const initialState: BlogFaqState = {
  list: null,
  loading: false,
  error: null,
  currentItem: null,
};

const blogFaqSlice = createSlice({
  name: "blogFaq",
  initialState,
  reducers: {
    clearCurrentItem(state) {
      state.currentItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogFaqs.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(fetchBlogFaqById.fulfilled, (state, action) => {
        state.currentItem = action.payload;
      });
  },
});

export const { clearCurrentItem } = blogFaqSlice.actions;
export default blogFaqSlice.reducer;
