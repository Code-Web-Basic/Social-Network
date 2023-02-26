import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentApi from '~/api/CommentApi/CommentApi';

export const getFirstComment = createAsyncThunk('comment/getFirstComment', async (params, thunkAPI) => {
    const res = await commentApi.getComment({ id: params?.id, paging: params?.paging });

    return res;
});
export const getSkipComment = createAsyncThunk('comment/getSkipComment', async (params, thinAPI) => {
    return;
});
export const addNewComment = createAsyncThunk('comment/addNewComment', async (data, thunkAPI) => {
    return;
});
export const replyNewComment = createAsyncThunk('comment/replyNewComment', async (data, thunkAPI) => {
    // const newCityRef = doc(collection(db, 'comments'));
    // await setDoc(newCityRef, data);

    return data?.parentId;
});
export const CommentSlice = createSlice({
    name: 'comment',
    initialState: {
        loading: false,
        error: '',
        data: [],
    },
    extraReducers: (builder) => {
        builder.addCase(getFirstComment.pending, (state, action) => {
            state.loading = true;
            // state.error = action.error;
        });
        builder.addCase(getFirstComment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(getFirstComment.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.data = action.payload;
        });
        builder.addCase(getSkipComment.pending, (state, action) => {
            state.loading = true;
            state.error = action.error;
        });
        builder.addCase(getSkipComment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(getSkipComment.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.data = [...state.data, ...action.payload];
        });
        builder.addCase(addNewComment.pending, (state, action) => {
            state.loading = true;
            // state.error = action.error;
        });
        builder.addCase(addNewComment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(addNewComment.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.data = [action.payload, ...state.data];
        });
        builder.addCase(replyNewComment.pending, (state, action) => {
            state.loading = true;
            // state.error = action.error;
        });
        builder.addCase(replyNewComment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(replyNewComment.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';

            const arrTmp = [...state.data];
            const index = arrTmp.findIndex((obj) => obj.id === action.payload);
            arrTmp[index].replyNumber += 1;
            state.data = JSON.parse(JSON.stringify(arrTmp));
            // state.data[index].replyNumber++;
        });
    },
});

export default CommentSlice.reducer;
