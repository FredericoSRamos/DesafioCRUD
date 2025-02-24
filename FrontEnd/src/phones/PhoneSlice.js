import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { httpDelete, httpGet, httpPost, httpPut } from '../utils';

const phonesAdapter = createEntityAdapter();

const initialState = phonesAdapter.getInitialState({
    status: "not_loaded",
    error: null
});

const baseUrl = "http://localhost:3004";

export const fetchPhones = createAsyncThunk("phones/fetchPhones", async () => {
    return await httpGet(`${baseUrl}/phones`);
});

export const addPhoneServer = createAsyncThunk("phones/addPhoneServer", async (phone) => {
    return await httpPost(`${baseUrl}/phones`, phone);
});

export const updatePhoneServer = createAsyncThunk("phones/updatePhoneServer", async (phone) => {
    return await httpPut(`${baseUrl}/phones/${phone.id}`, phone);
});

export const removePhoneServer = createAsyncThunk("phones/removePhoneServer", async (phoneId) => {
    await httpDelete(`${baseUrl}/phones/${phoneId}`);
    return phoneId;
});

export const phoneSlice = createSlice({
    name: 'phones',
    initialState: initialState,
    extraReducers: builder => {
        builder.addCase(fetchPhones.fulfilled, (state, action) => {
            state.status = "loaded";
            phonesAdapter.setAll(state, action.payload);
        });
        builder.addCase(fetchPhones.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchPhones.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
        builder.addCase(addPhoneServer.fulfilled, (state, action) => {
            state.status = "saved";
            phonesAdapter.addOne(state, action.payload);
        });
        builder.addCase(addPhoneServer.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(updatePhoneServer.fulfilled, (state, action) => {
            state.status = "saved";
            phonesAdapter.upsertOne(state, action.payload);
        });
        builder.addCase(updatePhoneServer.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(removePhoneServer.fulfilled, (state, action) => {
            state.status = "deleted";
            phonesAdapter.removeOne(state, action.payload);
        });
        builder.addCase(removePhoneServer.pending, (state) => {
            state.status = "loading";
        });
    }
});

export default phoneSlice.reducer;

export const {
    selectAll: selectAllPhones,
    selectById: selectPhonesById
} = phonesAdapter.getSelectors(state => state.phones);