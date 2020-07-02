import React from 'react';
import { connect } from 'react-redux';
import Cart from './Cart';

import {
    removeProductFromCart,
    fillCartFromDB,
    updateCartProductQuantity
} from '../actions/creators';

class CartContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectInput: null,
        }
        this.productQuantityUpdateInput = this.productQuantityUpdateInput.bind(this)
    }
    componentDidMount() {
        this.props.fillCartFromDB()
    }

    componentDidUpdate() {
        const { selectInput } = this.state;

        selectInput && (selectInput.disabled = false);

    }

    updateProductQuantity(e, productId) {
        e.target.disabled = true;
        this.setState({ selectInput: e.target })
        this.props.updateCartProductQuantity(productId, e.target.value);

    }

    productQuantityUpdateInput = (p) =>
        (
            <td>
                <select
                    value={p.quantity}
                    className="custom-select custom-select-sm"
                    onChange={(e) => this.updateProductQuantity(e, p.id)}
                >
                    {
                        [...Array(p.inventory > 14 ? 14 : p.inventory).keys()].map((i) =>
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        )
                    }
                </select>
            </td>
        )

    render() {
        const { cart, removeProductFromCart } = this.props;

        return (
            <Cart
                {...cart}
                removeProductFromCart={removeProductFromCart}
                quantityInput={this.productQuantityUpdateInput}
            />
        );
    }
}

const mapStateToProduct = ({ filledCart }) => ({ cart: filledCart });

export default connect(
    mapStateToProduct,
    {
        removeProductFromCart,
        fillCartFromDB,
        updateCartProductQuantity
    }
)(CartContainer);