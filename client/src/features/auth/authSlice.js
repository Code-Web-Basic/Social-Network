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
    extraReducers: (builder) => {
        builder.addCase(signInPassWord.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(signInPassWord.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
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
        builder.addCase(signInFacebook.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(signInFacebook.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(signInFacebook.fulfilled, (state, action) => {
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
            state.currentUser = action.payload;
            state.typeLogin = '';
        });
    },
});

export default authSlice.reducer;
