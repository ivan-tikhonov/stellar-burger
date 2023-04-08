import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientData } from '../../utils/api';
import { TIngredientItem } from '../../utils/types';

export const fetchData = createAsyncThunk<TIngredientItem[], undefined, { rejectValue: string }>(
    'ingredientsItems/fetchData',
    async (_, { rejectWithValue }) => {
        try {
            return await getIngredientData();
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

type TInitialState = {
    status: string | null;
    error: string | null;
    items: TIngredientItem[];
};

const initialState: TInitialState = {
    status: null,
    error: null,
    items: []
}

export const IngredientsItemsSlice = createSlice({
    name: 'ingredientsItems',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'ok';
                state.items = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = 'error';
                if (action.error.message) {
                    state.error = action.error.message;
                }
            });
    }
});

export default IngredientsItemsSlice.reducer;
