import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '~/features/auth/authSlice';
import commentReducer from '~/features/comment/commentSlice';
import postReducer from '~/features/post/postSlice';
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['comment', 'post'],
};

export default configureStore({
    reducer: { auth: authReducer, comment: commentReducer, post: postReducer },
});
// auth: authReducer
const rootReducer = combineReducers({ auth: authReducer, comment: commentReducer, post: postReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
// export const storePublic = createStore({ auth: authReducer });
