export const URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
}

export const getIngredientData = async () => {
    const res = await fetch(`${URL}/ingredients`);
    return checkResponse(res);
}

export const postIngredients = async (orderData) => {
    const res = await fetch(`${URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(orderData)
    });
    return checkResponse(res);
}
