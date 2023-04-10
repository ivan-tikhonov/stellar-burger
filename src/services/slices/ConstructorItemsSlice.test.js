import { setupStore } from '../store';

const testBun = {
  "__v": 0,
  "_id": "60d3b41abdacab0026a733c7",
  "calories": 643,
  "carbohydrates": 85,
  "dragId": "2a31bbd9-a7bb-2d34-dcf6-6e374c3562dc",
  "fat": 26,
  "image": "https://code.s3.yandex.net/react/code/bun-01.png",
  "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  "name": "Флюоресцентная булка R2-D3",
  "price": 988,
  "proteins": 44,
  "type": "bun",
}

const testNotBun = {
  "_id": "60d3b41abdacab0026a733c8",
  "name": "Филе Люминесцентного тетраодонтимформа",
  "type": "main",
  "proteins": 44,
  "fat": 26,
  "carbohydrates": 85,
  "calories": 643,
  "price": 988,
  "image": "https://code.s3.yandex.net/react/code/meat-03.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
  "__v": 0
}

describe("constructorItems", () => {

  test("get empty store", async () => {
    const store = setupStore();
    expect(store.getState().constructorItems).toEqual({
      items: []
    });
  });

  test("test addConstructorItem, not bun", async () => {
    const store = setupStore();
    await store.dispatch({
      type: 'constructorItems/addConstructorItem',
      payload: testNotBun
    });
    expect(store.getState().constructorItems).toEqual({
      items: []
    });
  });

  test("test addConstructorItem, bun", async () => {
    const store = setupStore();
    await store.dispatch({
      type: 'constructorItems/addConstructorItem',
      payload: testBun
    });
    expect(store.getState().constructorItems).toEqual({
      items: [testBun]
    });
  });

  test("test deleteConstructorItem, bun", async () => {
    const store = setupStore();
    await store.dispatch({
      type: 'constructorItems/addConstructorItem',
      payload: testBun
    });

    await store.dispatch({
      type: 'constructorItems/addConstructorItem',
      payload: testNotBun
    });

    await store.dispatch({
      type: 'constructorItems/deleteConstructorItem',
      payload: testNotBun
    });

    await store.dispatch({
      type: 'constructorItems/deleteConstructorItem',
      payload: testBun
    });

    expect(store.getState().constructorItems).toEqual({
      items: []
    });
  });

  test("test updateConstructorItems", async () => {
    const store = setupStore();
    await store.dispatch({
      type: 'constructorItems/addConstructorItem',
      payload: testBun
    });

    await store.dispatch({
      type: 'constructorItems/updateConstructorItems',
      payload: [testNotBun]
    });

    expect(store.getState().constructorItems).toEqual({
      items: [testBun, testNotBun]
    });
  });

  test("test deleteConstructorItem, bun", async () => {
    const store = setupStore();
    await store.dispatch({
      type: 'constructorItems/addConstructorItem',
      payload: testBun
    });

    await store.dispatch({
      type: 'constructorItems/addConstructorItem',
      payload: testNotBun
    });

    await store.dispatch({
      type: 'constructorItems/clearConstructorItems',
    });

    expect(store.getState().constructorItems).toEqual({
      items: []
    });
  });

})


