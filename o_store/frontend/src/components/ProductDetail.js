import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProductDetail, addProductToCart, removeProductFromCart } from '../actions/creators';
import { withRouter } from 'react-router-dom';


class ProductDetail extends React.Component {


    componentDidMount() {
        const { getProductDetail, match } = this.props;
        getProductDetail(match.params.slug);
    }

    render() {
        const { product, addProductToCart, removeProductFromCart, history } = this.props;
        return (
            (!product)
                ? <h1>Loading...</h1>
                : (
                    <div className="container">
                        <div id="carouselExampleFade" className="carousel slide carousel-fade col-lg-4 col-md-6" data-ride="carousel">
                            <div className="carousel-inner">
                                {product.images.length > 1
                                    ?
                                    product.images.map((img, i) =>
                                        <div key={i} className={`carousel-item ${i ? 'active' : ''}`}>
                                            <img src={img} className="d-block w-100" alt="..." />
                                        </div>
                                    )
                                    :
                                    <div className={`carousel-item active`}>
                                        <img src={product.images[0] || "media/products/no-image.png"} className="d-block w-100" alt="..." />
                                    </div>
                                }

                            </div>
                            <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon slider-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                                <span className="carousel-control-next-icon slider-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>

                        <div className='product-detail'>
                            <h3>{product.name}</h3>

                            <p><span>Description: </span> <br />{product.description}</p>
                            <p><span>Price:</span> ${product.price}</p>
                            <button onClick={() => { addProductToCart(product.id, 1); history.push('/cart/detail') }} type="button" className="btn btn-primary">Add to cart</button>
                        </div>
                    </div>
                )
        );

    }
}



const mapStateToProps = ({ products }) => ({ product: products.currentProduct });

const mapDispatchToProps = (dispatch) => ({

    getProductDetail: (slug) => dispatch(getProductDetail(slug)),
    addProductToCart: (productId, number) => dispatch(addProductToCart(productId, number)),
    removeProductFromCart: productId => dispatch(removeProductFromCart(productId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductDetail));