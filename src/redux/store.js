import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducer/cartReducer";
import {
  persistReducer
} from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, cartReducer)
export const store = configureStore({
  reducer: {
    cart: persistedReducer
  }
})

