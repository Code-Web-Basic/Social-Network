const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const signUpPassWord = createAsyncThunk('auth/signUpPassWord', async (params, thunkAPI) => {});
export const signInPassWord = createAsyncThunk('auth/signInPassWord', async (params, thunkAPI) => {});

export const signInGoogle = createAsyncThunk('auth/signInGoogle', async (params, thunkAPI) => {});
export const signInFacebook = createAsyncThunk('auth/signInFacebook', async (params, thunkAPI) => {});
export const logout = createAsyncThunk('auth/logout', async (params, thunkAPI) => {});

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null,
        loading: false,
        error: '',
        typeLogin: '',
    },
    reducers: {},
    extraReducers: {
        [signInPassWord.pending]: (state) => {
            state.loading = true;
        },
        [signInPassWord.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [signInPassWord.fulfilled]: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.typeLogin = 'password';
        },
        [signUpPassWord.pending]: (state) => {
            state.loading = true;
        },
        [signUpPassWord.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [signUpPassWord.fulfilled]: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.typeLogin = 'password';
        },
        [signInGoogle.pending]: (state) => {
            state.loading = true;
        },
        [signInGoogle.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [signInGoogle.fulfilled]: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.typeLogin = 'google';
        },
        [signInFacebook.pending]: (state) => {
            state.loading = true;
        },
        [signInFacebook.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [signInFacebook.fulfilled]: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.typeLogin = 'facebook';
        },
        [logout.pending]: (state) => {
            state.loading = true;
        },
        [logout.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [logout.fulfilled]: (state) => {
            state.loading = false;
            state.currentUser = null;
            state.typeLogin = '';
        },
    },
});

export default authSlice.reducer;
