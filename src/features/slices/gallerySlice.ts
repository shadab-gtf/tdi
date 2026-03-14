import { createSlice } from "@reduxjs/toolkit";
import { createCrudThunks } from "../createCrudThunk";

export interface Gallery {
    id: string;
    desktop_file?: string;
    mobile_file?: string;
    alt?: string;
    seq?: number;
    status?: boolean;
    [key: string]: any;
}

interface GalleryState {
    list: any;
    loading: boolean;
    error: string | null;
    currentItem: Gallery | null;
}

const BASE = "/gallery";

const { fetchList, create, update, remove, fetchById } = createCrudThunks<
    any,
    Gallery,
    Partial<Gallery>,
    Partial<Gallery>
>("gallery", BASE);

export const fetchGallery = fetchList;
export const addGallery = create;
export const updateGallery = update;
export const deleteGallery = remove;
export const fetchGalleryById = fetchById;

const initialState: GalleryState = {
    list: null,
    loading: false,
    error: null,
    currentItem: null,
};

const GallerySlice = createSlice({
    name: "gallery",
    initialState,
    reducers: {
        clearCurrentItem(state) {
            state.currentItem = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGallery.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(fetchGalleryById.fulfilled, (state, action) => {
                state.currentItem = action.payload;
            });
    },
});

export const { clearCurrentItem } = GallerySlice.actions;
export default GallerySlice.reducer;