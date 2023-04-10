import {setupStore} from '../store';
import {initialState, showIngredientInfo,closeIngredientInfo} from './IngredientSlice'

describe("ingridientSlice", () => {

  test("get empty store", async () => {
		const store = setupStore();
		expect(store.getState().ingredientInfo).toEqual({
			...initialState
		});
	});

  test("test show modal", async () => {
		const store = setupStore();
    await store.dispatch({
			type: showIngredientInfo.type
		});
		expect(store.getState().ingredientInfo).toEqual({
			status: 'visible'
		});
	});

  test("test close modal", async () => {
		const store = setupStore();
    await store.dispatch({
			type: showIngredientInfo.type
		});
    await store.dispatch({
			type: closeIngredientInfo.type
		});
		expect(store.getState().ingredientInfo).toEqual({
			...initialState
		});
	});

})
