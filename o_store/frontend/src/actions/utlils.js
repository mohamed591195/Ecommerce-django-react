export const getTotalPrice = (products) => {

    let totalPrices = 0

    products.forEach(p => {
        totalPrices += p.totalPrice
    })

    return totalPrices;
}