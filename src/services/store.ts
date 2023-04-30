import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ConstructorItemsSlice from './slices/ConstructorItemsSlice';
import IngredientsItemsSlice from './slices/IngredientsItemsSlice';
import IngredientSlice from './slices/IngredientSlice';
import OrderSlice from './slices/OrderSlice';
import UserSlice from './slices/UserSlice';
import { socketMiddleware } from './middleware/socketMiddleware';

const wsActions = {
  wsConnection: 'ingredientsItems/setWebsocketConnection',
  wsOffline: 'ingredientsItems/setWebsocketOffline',
  wsOpen: 'ingredientsItems/setWebsocketOpen',
  wsError: 'ingredientsItems/setWebsocketConnectionError',
  wsMessage: 'ingredientsItems/setWebsocketGetOrders',
  wsClose: 'ingredientsItems/setWebsocketClose',
}

export const rootReducer = combineReducers({
  constructorItems: ConstructorItemsSlice,
  ingredientsItems: IngredientsItemsSlice,
  order: OrderSlice,
  ingredientInfo: IngredientSlice,
  userSlice: UserSlice
});

export const setupStore = () => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(wsActions)),
});


export const store = setupStore();
export default store;

