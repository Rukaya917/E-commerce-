import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
import  authReducer from './authSlice';
import productReducer from './productSlice'


const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers ({
    cart: cartReducer,
    auth: authReducer,
    products: productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);