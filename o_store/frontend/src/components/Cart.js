import React from 'react';


const Cart = ({ products, totalPrice, removeProductFromCart, quantityInput }) => {
    return (
        (!products)
            ? <h1>Loading...</h1>
            :
            <div className="container">
                <h2>Your Shopping Cart</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Remove</th>
                            <th scope="col">Unit Price</th>
                            <th scope="col">Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((p, i) => (
                                <tr key={p.id}>
                                    <th scope="row">{i + 1}</th>
                                    <td><img src={p.image || "/media/products/no-image.png"} /></td>
                                    <td>{p.name}</td>
                                    {quantityInput(p)}
                                    <td>
                                        <button className="btn btn-danger" onClick={() => removeProductFromCart(p.id)}>
                                            remove
                                </button>
                                    </td>
                                    <td>${p.price}</td>
                                    <td>${p.totalPrice}</td>
                                </tr>
                            ))
                        }

                    </tbody>
                    <tfoot>
                        <tr style={{ backgroundColor: 'lightgray' }}>
                            <td colSpan="2">
                                <strong>
                                    TOTAL:
                        </strong>
                            </td>
                            <td colSpan="5">
                                ${totalPrice}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div >
    );
}


export default Cart;