export const getTotalPrice = (products) => {

    let totalPrices = 0

    products.forEach(p => {
        totalPrices += p.totalPrice
    })

    return totalPrices;
}

export const getConfig = getState => {
    // loading the user
    // // getting token
    const token = getState().auth.token;

    // // setting headers
    let config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    // // putting token in headers if exist
    if (token) config.headers['Authorization'] = `Token ${token}`;

    return config;
}