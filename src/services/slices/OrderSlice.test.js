import { setupStore } from '../store';
import { initialState, closeOrderModal, openOrderModal } from './OrderSlice';

describe("orderSlice", () => {

  test("get empty store", async () => {
    const store = setupStore();
    expect(store.getState().order).toEqual({
      ...initialState
    });
  });

  test("test open modal", async () => {
		const store = setupStore();
    await store.dispatch({
			type: openOrderModal.type
		});
		expect(store.getState().order).toEqual({
			...initialState,
      confirmStatus: 'visible',
		});
	});

  test("test close modal", async () => {
		const store = setupStore();
    await store.dispatch({
			type: openOrderModal.type
		});
    await store.dispatch({
			type: closeOrderModal.type
		});

		expect(store.getState().order).toEqual({
			...initialState
		});
	});

  test("test post order", async () => {
		const store = setupStore();
    await store.dispatch({
			type: 'orderSlice/postOrder/fulfilled',
      payload: {
        name: "Ivan",
        order: {
          number: "12345"
        }
      }
		});
		expect(store.getState().order).toEqual({
      ...initialState,
			status: 'visible',
      name: "Ivan",
      orderNumber: "12345"
		});
	});

})
