import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientData, getOrderRequest, placeOrderRequest } from '../../utils/api';
// import { TIngredientItem } from '../../utils/types';



export const onFetchOrder = createAsyncThunk<TOrders, string, { rejectValue: TError }>(
  'ingredientsItems/onFetchOrder',
  async function (number, { rejectWithValue }) {
    const response = await getOrderRequest(number);
    if (!response.ok) {
      return rejectWithValue({ status: response.status, message: 'Server Error, take a look on method onFetchOrder' });
    }
    const data: TOrders = await response.json();
    return data;
  }
)

export const onPlaceOrder = createAsyncThunk<TPlaceOrder, string[], { rejectValue: TError }>(
  'constructor/onPlaceOrder',
  async function (cart, { rejectWithValue }) {
    const response = await placeOrderRequest(cart);
    if (!response.ok) {
      return rejectWithValue({ status: response.status, message: 'Server Error, take a look on method onPlaceOrder' });
    }
    const data: TPlaceOrder = await response.json();
    return data;
  }
)

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

type TIngredientItem = {
  dragId?: string;
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export type TOrders = {
  success: boolean,
  orders: Array<TOrder>,
  total: number,
  totalToday: number
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

export type TPlaceOrder = {
  order: TOrder,
  name: string,
  success: boolean
}

export type TError = {
  success?: boolean;
  message?: string
  status?: number
}

type TInitialState = {
  status: string | null;
  error: string | null;
  items: TIngredientItem[];
  wsOpen: boolean;
  wsUrl: string;
  wsConnectionStatus: boolean;
  wsError: null | string;
  orders: null | TOrders;
};

const initialState: TInitialState = {
  status: null,
  error: null,
  items: [],
  wsOpen: false,
  wsUrl: '',
  wsConnectionStatus: true,
  wsError: null,
  orders: null
}

export const IngredientsItemsSlice = createSlice({
  name: 'ingredientsItems',
  initialState,
  reducers: {
    setWebsocketOpen: (state, action: PayloadAction<boolean>) => {
      state.wsOpen = action.payload;
      state.wsError = null;
    },
    setWebsocketClose: (state, action: PayloadAction<boolean>) => {
      state.wsOpen = false;
      state.wsUrl = ''
      state.wsError = null;
      state.orders = null;
    },
    setWebsocketConnection: (state, action: PayloadAction<string>) => {
      state.wsConnectionStatus = true;
      state.wsUrl = action.payload
    },
    setWebsocketOffline: (state) => {
      state.wsConnectionStatus = false;
    },
    setWebsocketConnectionError: (state, action: PayloadAction<null | string>) => {
      state.wsError = action.payload;
    },
    setWebsocketGetOrders: (state, action: PayloadAction<TOrders>) => {
      state.orders = action.payload;
    },
  },
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

    builder
      .addCase(onFetchOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(onFetchOrder.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.status = 'ok';
        state.error = null;
      })
    builder.addCase(onFetchOrder.rejected, (state, action) => {
      state.status = 'error';
      if (action.error.message) {
        state.error = action.error.message;
      }
    })
  }
});

export const { setWebsocketOpen, setWebsocketClose, setWebsocketConnection, setWebsocketOffline, setWebsocketConnectionError, setWebsocketGetOrders } = IngredientsItemsSlice.actions
export default IngredientsItemsSlice.reducer;
