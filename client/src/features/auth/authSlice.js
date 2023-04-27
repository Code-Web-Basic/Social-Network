import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authApi from '~/api/authApi/authApi';
import * as userApi from '~/api/userApi/userApi';

export const signUpPassWord = createAsyncThunk('auth/signUpPassWord', async (params, thunkAPI) => {
    const data = params.data;
    const res = await authApi.registerPassword(data);
    return res;
});
export const signInPassWord = createAsyncThunk('auth/signInPassWord', async (params, { rejectWithValue }) => {
    const data = params.data;
    try {
        const res = await authApi.loginPass({ data });
        return res;
    } catch (error) {
        return rejectWithValue(error.response.data.result);
    }
    // return res;
});
export const signInGoogle = createAsyncThunk('auth/signInGoogle', async (params, thunkAPI) => {
    const res = await authApi.getUserInfo();
    return res;
});
export const signInGithub = createAsyncThunk('auth/signInGithub', async (params, thunkAPI) => {
    const res = await authApi.getUserInfo();
    return res;
});
export const logout = createAsyncThunk('auth/logout', async (params, thunkAPI) => {
    await authApi.logout();
});
export const updateUser = createAsyncThunk('user/update', async (params, thunkAPI) => {
    const res = await userApi.putUpdateUser(params);
    return res;
});

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null,
        loading: false,
        error: '',
        typeLogin: '',
        isError: false,
    },
    reducers: {
        refetchToken: (state, action) => {
            state.currentUser = action.payload;
        },
        resetStoreAuth: (state, action) => {
            state.currentUser = null;
            state.loading = false;
            state.error = '';
            state.typeLogin = '';
            // window.storage.removeItem('persist:root');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signInPassWord.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(signInPassWord.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.msg;
            state.isError = true;
        });
        builder.addCase(signInPassWord.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.typeLogin = 'password';
        });
        builder.addCase(signUpPassWord.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(signUpPassWord.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(signUpPassWord.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.typeLogin = 'password';
        });
        builder.addCase(signInGoogle.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(signInGoogle.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(signInGoogle.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.typeLogin = 'google';
        });
        builder.addCase(signInGithub.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(signInGithub.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(signInGithub.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.typeLogin = 'facebook';
        });
        builder.addCase(logout.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = null;
            state.typeLogin = '';
        });
        builder.addCase(updateUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            action.payload.data.accessToken = state.currentUser.data.accessToken;
            state.loading = false;
            state.currentUser = action.payload;
            state.typeLogin = 'password';
        });
    },
});
export const { refetchToken, resetStoreAuth } = authSlice.actions;

export default authSlice.reducer;
