import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import * as messageApi from '~/api/messageApi/messageApi'

export const getShowChats = createAsyncThunk('/message/showChats', async (params, thunkAPI) => {
    const res = await messageApi.getShowChats();
    // console.log(res)
    return res;
});
export const postSendMessage = createAsyncThunk('message/sendMessage', async (params, thunkAPI) => {
    console.log(params);
    const res = await messageApi.postSendMessage(params);
    return res;
});
export const getShowMessage = createAsyncThunk('/message/showMessage', async (params, thunkAPI) => {
    //console.log(params);
    // const res = await messageApi.getShowChats();
    // const getMessages = await messageApi.getShowMessage(params);
    // res.messages = getMessages
    // return res;
    const res = await messageApi.getShowMessage(params?.id, params?.paging);
    console.log(res)
    return res;
});
export const messageSlice = createSlice({
    name: 'message',
    initialState: {
        loading: false,
        error: '',
        data: [],
        messages: []
    },
    reducers: {
        clearMessage: (state, action) => {
            state.data = [];
            state.loading = false;
            state.error = '';
            state.messages = []
        },
        clearMess: (state, action) => {
            state.messages = []
            console.log("clear")
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getShowChats.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getShowChats.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(getShowChats.fulfilled, (state, action) => {
            // console.log(action.payload);
            state.loading = false;
            state.error = '';
            state.data = action.payload;
        });
        builder.addCase(postSendMessage.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(postSendMessage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(postSendMessage.fulfilled, (state, action) => {
            // console.log(action.payload);
            state.loading = false;
            state.error = '';
            // state.messages
            console.log(action.payload)
            // console.log(state.messages)
            state.messages = state.messages.concat(action.payload);
        });
        builder.addCase(getShowMessage.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getShowMessage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(getShowMessage.fulfilled, (state, action) => {
            // console.log(state.messages)
            // console.log(action.payload)
            let newData = []
            // const isChildArray = action.payload.every(parentItem => {
            //     return state.messages.some(childItem => {
            //         return JSON.stringify(childItem) === JSON.stringify(parentItem);
            //     });
            // });
            // // console.log(isChildArray)
            // if (!isChildArray)
            //     newData = [...action.payload, ...state.messages]

            newData = action.payload?.concat(state.messages)
            // clear mess
            state.loading = false;
            state.error = '';
            state.messages = newData
        });
    },
});
export const { clearMessage, clearMess } = messageSlice.actions;
export default messageSlice.reducer;
