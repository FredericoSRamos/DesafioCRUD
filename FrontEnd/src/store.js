import { configureStore } from "@reduxjs/toolkit";
import phonesReducer from './phones/PhoneSlice';

export const store = configureStore({
    reducer: {
        phones: phonesReducer
    }
});