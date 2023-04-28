import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as postApi from '~/api/postApi/postApi';

export const getFirstPost = createAsyncThunk('post/getFirstPost', async (params, thunkAPI) => {
    const res = await postApi.getNewFeed({ paging: 1 });
    return res;
});
export const getSkipPost = createAsyncThunk('post/getSkipPost', async (params, thinAPI) => {
    console.log(params.paging);
    const res = await postApi.getNewFeed({ paging: params.paging });
    return res;
});
export const addNewPost = createAsyncThunk('post/addNewPost', async (params, thunkAPI) => {
    return;
});

export const PostSlice = createSlice({
    name: 'post',
    initialState: {
        loading: false,
        error: '',
        data: [],
    },
    reducers: {
        increaseNumberComment: (state, action) => {
            const arrTmp = state.data;
            const index = arrTmp.findIndex((obj) => obj.Post._id === action.payload);
            if (arrTmp[index]) {
                arrTmp[index].Post.commentCount += 1;
            }
            state.data = arrTmp;
        },
        increaseNumberLike: (state, action) => {
            const index = state.data.findIndex((obj) => obj.Post._id === action.payload.idPost);
            if (state.data[index]) {
                state.data[index].Post.reaction = [...state.data[index].Post.reaction, action.payload.idUser];
                state.data[index].reactionCount++;
            }
        },
        decreaseNumberLike: (state, action) => {
            const index = state.data.findIndex((obj) => obj.Post._id === action.payload.idPost);
            if (state.data[index]) {
                const dataReaction = state.data[index].Post.reaction.filter((item) => item !== action.payload.idUser);
                state.data[index].Post.reaction = dataReaction;
                if (state.data[index].reactionCount !== 0) {
                    state.data[index].reactionCount--;
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getFirstPost.pending, (state, action) => {
            state.loading = true;
            // state.error = action.error;
        });
        builder.addCase(getFirstPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(getFirstPost.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.data = action.payload;
        });
        builder.addCase(getSkipPost.pending, (state, action) => {
            state.loading = true;
            state.error = action.error;
        });
        builder.addCase(getSkipPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(getSkipPost.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.data = [...state.data, ...action.payload];
        });
        builder.addCase(addNewPost.pending, (state, action) => {
            state.loading = true;
            // state.error = action.error;
        });
        builder.addCase(addNewPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(addNewPost.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.data = [action.payload, ...state.data];
        });
    },
});
export const { increaseNumberComment, increaseNumberLike, decreaseNumberLike } = PostSlice.actions;

export default PostSlice.reducer;
