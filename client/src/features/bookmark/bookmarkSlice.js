import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as bookmarkApi from '~/api/bookmarksApi/bookmarksApi';

export const getBookMarkFirst = createAsyncThunk('bookmark/getBookmarkFirst', async (params, thunkAPI) => {
    const res = await bookmarkApi.getBookMarks();
    return res;
});
export const addNewBookmark = createAsyncThunk('bookmark/addNewBookmark', async (params, thunkAPI) => {
    const data = params.idPost;
    const res = await bookmarkApi.createBookMarks({ postId: data });
    return res;
});
export const removeNewBookmark = createAsyncThunk('bookmark/removeNewBookmark', async (params, thunkAPI) => {
    const data = params.idPost;
    await bookmarkApi.deleteBookMarks({ postId: data });
    return data;
});
const bookmarkSlice = createSlice({
    name: 'bookmark',
    initialState: {
        data: [],
        loading: false,
        error: '',
    },
    reducers: {
        clearAllBookMarks: (state, action) => {
            state.data = [];
            state.loading = false;
            state.error = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getBookMarkFirst.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getBookMarkFirst.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(getBookMarkFirst.fulfilled, (state, action) => {
            state.loading = false;
            state.data = [...action.payload];
        });
        builder.addCase(addNewBookmark.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(addNewBookmark.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(addNewBookmark.fulfilled, (state, action) => {
            state.loading = false;
            state.data = [...state.data, action.payload];
        });
        builder.addCase(removeNewBookmark.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(removeNewBookmark.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(removeNewBookmark.fulfilled, (state, action) => {
            state.loading = false;
            const arrTmp = state.data.filter((e) => e?.postId !== action.payload);
            state.data = [...arrTmp];
        });
    },
});
export const { clearAllBookMarks } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
