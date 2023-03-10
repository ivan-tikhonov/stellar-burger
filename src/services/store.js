import { configureStore } from '@reduxjs/toolkit';
import ConstructorItemsSlice from './slices/ConstructorItemsSlice';
import IngredientsItemsSlice from './slices/IngredientsItemsSlice';
import IngredientSlice from './slices/IngredientSlice';
import OrderSlice from './slices/OrderSlice';

export const store = configureStore({
    reducer: {
        constructorItems: ConstructorItemsSlice,
        ingredientsItems: IngredientsItemsSlice,
        order: OrderSlice,
        ingredientInfo: IngredientSlice
    }
});
