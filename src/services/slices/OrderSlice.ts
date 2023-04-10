import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postIngredients, placeOrderRequest  } from '../../utils/api';
import { IOrderResponse } from '../../utils/types';

export const postOrder = createAsyncThunk<IOrderResponse, string[], { rejectValue: string }>(
  'orderSlice/postOrder',
  async (ingredientsId, { rejectWithValue }) => {
      try {
          return postIngredients({ ingredients: ingredientsId })
              .then(data => data);
      } catch (error: any) {
          return rejectWithValue(error.message);
      }
  }
);

export const onPlaceOrder = createAsyncThunk<TPlaceOrder, string[], { rejectValue: TError }>(
  'orderSlice/postOrder',
  async function (cart, { rejectWithValue }) {
    const response = await placeOrderRequest(cart);
    if (!response.ok) {
      return rejectWithValue({ status: response.status, message: 'Server Error, take a look on method onPlaceOrder' });
    }
    const data: TPlaceOrder = await response.json();
    return data;
  }
)

export type TPlaceOrder = {
  order: TOrder,
  name: string,
  success: boolean
}

export type TOrder = {
  _id: string,
  ingredients: Array<string>,
  status: string,
  name: string,
  createdAt: string,
  updatedAt: string,
  number: number
}

export type TError = {
  success?: boolean;
  message?: string
  status?: number
}

type TInitialState = {
  status: string;
  confirmStatus: string;
  error: string | null;
  name: string | null;
  orderNumber: number | null;
};

const initialState: TInitialState = {
  status: 'hidden',
  confirmStatus: 'hidden',
  error: null,
  name: null,
  orderNumber: null
};

const OrderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
      closeOrderModal: (state) => {
          state.status = 'hidden';
          state.confirmStatus = 'hidden';
          state.error = null;
          state.name = null;
          state.orderNumber = null;
      },
      openOrderModal: (state) => {
          state.confirmStatus = 'visible';
      }
  },
  extraReducers: (builder) => {
      builder
          .addCase(postOrder.pending, (state) => {
              state.status = 'pending';
              state.error = null;
              state.name = null;
              state.orderNumber = null;
          })
          .addCase(postOrder.fulfilled, (state, action) => {
              state.name = action.payload.name;
              state.orderNumber = action.payload.order.number;
              state.status = 'visible';
          })
          .addCase(postOrder.rejected, (state, action) => {
              state.status = 'error';
              if (action.error.message) {
                  state.error = action.error.message;
              }
          });
  }
});

export const { closeOrderModal, openOrderModal } = OrderSlice.actions;

export default OrderSlice.reducer;
