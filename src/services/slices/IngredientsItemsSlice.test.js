import { setupStore } from '../store';

const testItems = [{
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
},
{
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
]

const testOrder = [{
  "_id:": "6433ed9d0905fd001b628df2",
  "createdAt": "2023-04-10T11:06:05.858Z",
  "ingredients": ["60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c7"],
  "name": "Флюоресцентный бургер",
  "number": 48381,
  "status": "done",
  "updatedAt": "2023-04-10T11:06:06.394Z",
}]

describe("ingridientSlice", () => {

  test("get empty store", async () => {
    const store = setupStore();
    expect(store.getState().ingredientsItems).toEqual({
      status: null,
      error: null,
      items: [],
      wsOpen: false,
      wsUrl: '',
      wsConnectionStatus: true,
      wsError: null,
      orders: null,
      fetchError: null,
      fetchRequest: false,
    });
  });

  test("get fetchData", async () => {
    const store = setupStore();
    await store.dispatch({
      type: 'ingredientsItems/fetchData/fulfilled',
      payload: testItems
    });
    expect(store.getState().ingredientsItems).toEqual({
      status: "ok",
      error: null,
      items: testItems,
      wsOpen: false,
      wsUrl: '',
      wsConnectionStatus: true,
      wsError: null,
      orders: null,
      fetchError: null,
      fetchRequest: false,
    });
  });

  test("get onFetchOrder", async () => {
    const store = setupStore();
    await store.dispatch({
      type: ' ingredientsItems/onFetchOrder/fulfilled',
      payload: testOrder
    });
    expect(store.getState().ingredientsItems).toEqual({
      status: null,
      error: null,
      items: [],
      wsOpen: false,
      wsUrl: '',
      wsConnectionStatus: true,
      wsError: null,
      orders: null,
      fetchError: null,
      fetchRequest: false,
    });
  });


})
