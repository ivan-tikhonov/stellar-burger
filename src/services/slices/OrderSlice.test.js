import { setupStore } from '../store';
import { closeOrderModal, openOrderModal } from './OrderSlice';

describe("orderSlice", () => {

  test("get empty store", async () => {
    const store = setupStore();
    expect(store.getState().order).toEqual({
      status: 'hidden',
      confirmStatus: 'hidden',
      error: null,
      name: null,
      orderNumber: null
    });
  });

  test("test open modal", async () => {
		const store = setupStore();
    await store.dispatch({
			type: openOrderModal.type
		});
		expect(store.getState().order).toEqual({
			status: 'hidden',
      confirmStatus: 'visible',
      error: null,
      name: null,
      orderNumber: null
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
			status: 'hidden',
      confirmStatus: 'hidden',
      error: null,
      name: null,
      orderNumber: null
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
			status: 'visible',
      confirmStatus: 'hidden',
      error: null,
      name: "Ivan",
      orderNumber: "12345"
		});
	});

})
