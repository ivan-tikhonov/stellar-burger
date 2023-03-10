import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postIngredients  } from '../../utils/api';

export const postOrder = createAsyncThunk(
    'orderSlice/postOrder',
    async (ingredientsId, { rejectWithValue }) => {
        try {
            return postIngredients({ ingredients: ingredientsId })
                .then(data => data);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const OrderSlice = createSlice({
    name: 'orderSlice',
    initialState: {
        status: null,
        error: null,
        name: null,
        orderNumber: null
    },
    reducers: {
        closeOrderModal: (state) => {
            state.status = 'hidden';
            state.error = null;
            state.name = null;
            state.orderNumber = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postOrder.pending, (state) => {
                state.status = 'post';
                state.error = null;
            })
            .addCase(postOrder.fulfilled, (state, action) => {
                state.name = action.payload.name;
                state.orderNumber = action.payload.order.number;
                state.status = 'visible';
            })
            .addCase(postOrder.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload;
            });
    }
});

export const { closeOrderModal } = OrderSlice.actions;

export default OrderSlice.reducer;
