import { configureStore, combineReducers } from "@reduxjs/toolkit";

import cartReducer from "@/store/slices/cartSlice";
import authReducer from "@/store/slices/authSlice";
import wishlistReducer from "@/store/slices/wishlistSlice";
import orderReducer from "@/store/slices/ordersSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  wishlist: wishlistReducer,
  order: orderReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
