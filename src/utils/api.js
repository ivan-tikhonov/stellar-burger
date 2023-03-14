export const URL = 'https://norma.nomoreparties.space/api';

function request(url, options) {
  return fetch(url, options).then(checkResponse)
}

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
}

export const getIngredientData = async () => {
    const res = await request(`${URL}/ingredients`);
    return res;
}

export const postIngredients = async (orderData) => {
    const res = await request(`${URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(orderData)
    });
    return res;
}
