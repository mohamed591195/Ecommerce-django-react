import React from 'react';
import { connect } from 'react-redux';
import { removeProductFromCart, fillCartFromDB } from '../actions/creators';

class Cart extends React.Component {

    componentDidMount() {
        this.props.fillCartFromDB()
    }


    render() {
        const { cart, removeProductFromCart } = this.props;
        const { products, totalPrice } = cart;
        return (
            (!products)
                ? <h1>Loading...</h1>
                :
                <div className="container">
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
                                        <td><img src={p.image} /></td>
                                        <td>{p.name}</td>

                                        {
                                            (p.inventory >= p.number)
                                                ? <td>{p.number}</td>
                                                :
                                                <td>
                                                    {p.number} <br />
                                                    <span style={{ color: 'red' }}>
                                                        {p.inventory + ' Only Available'}
                                                    </span>
                                                </td>
                                        }
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
                            <tr>
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
}

const mapStateToProduct = ({ filledCart }) => ({ cart: filledCart });

export default connect(
    mapStateToProduct,
    {
        removeProductFromCart,
        fillCartFromDB
    }
)(Cart);