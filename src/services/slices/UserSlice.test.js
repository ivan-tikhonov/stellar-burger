import { setupStore } from '../store';

const mockPayload = {
  "user": {
    "name": "Ivan",
    "email": "ivantikhonov1989@gmail.com"
  },
  "accessToken": "Bearer f4jt3r8sd8s",
  "refreshToken": "fkek3i29e82ei"
}

describe("UserSlice", () => {

  test("get empty store", async () => {
    const store = setupStore();
    expect(store.getState().userSlice).toEqual({
      user: {
        name: null,
        email: null
      },
      isLoggedIn: false,
      status: null,
      error: null,
      isUpdated: false
    });
  });

  test("test register", async () => {
    const store = setupStore();
    await store.dispatch({
			type: 'userSlice/register/fulfilled',
      payload: mockPayload
		});
    expect(store.getState().userSlice).toEqual({
      user: {
        name: "Ivan",
        email: "ivantikhonov1989@gmail.com"
      },
      isLoggedIn: true,
      status: "ok",
      error: null,
      isUpdated: false
    });
  });

  test("test login", async () => {
    const store = setupStore();
    await store.dispatch({
			type: 'userSlice/login/fulfilled',
      payload: mockPayload
		});
    expect(store.getState().userSlice).toEqual({
      user: {
        name: "Ivan",
        email: "ivantikhonov1989@gmail.com"
      },
      isLoggedIn: true,
      status: "ok",
      error: null,
      isUpdated: false
    });
  });

  test("test logout", async () => {
    const store = setupStore();
    await store.dispatch({
			type: 'userSlice/logout/fulfilled',
		});
    expect(store.getState().userSlice).toEqual({
      user: {
        name: null,
        email: null
      },
      isLoggedIn: false,
      status: null,
      error: null,
      isUpdated: false
    });
  });

  test("test getUserData", async () => {
    const store = setupStore();
    await store.dispatch({
			type: 'userSlice/getUserData/fulfilled',
      payload: mockPayload
		});
    expect(store.getState().userSlice).toEqual({
      user: {
        name: "Ivan",
        email: "ivantikhonov1989@gmail.com"
      },
      isLoggedIn: true,
      status: "ok",
      error: null,
      isUpdated: false
    });
  });

  test("test updateUser", async () => {
    const store = setupStore();
    await store.dispatch({
			type: 'userSlice/updateUser/fulfilled',
      payload: mockPayload
		});
    expect(store.getState().userSlice).toEqual({
      user: {
        name: "Ivan",
        email: "ivantikhonov1989@gmail.com"
      },
      isLoggedIn: false,
      status: "ok",
      error: null,
      isUpdated: false
    });
  });


})
