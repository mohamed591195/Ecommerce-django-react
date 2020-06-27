import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProductDetail } from '../actions/creators';



class ProductDetail extends React.Component {


    componentDidMount() {
        const { getProductDetail, match } = this.props;
        getProductDetail(match.params.slug);
    }

    render() {
        const { product } = this.props;
        return (
            (!product)
                ? <h1>Loading...</h1>
                : (
                    <div id="carouselExampleFade" className="carousel slide carousel-fade col-lg-3 col-md-6" data-ride="carousel">
                        <div className="carousel-inner">
                            {product.images.map((img, i) =>
                                <div key={i} className={`carousel-item ${i ? 'active' : ''}`}>
                                    <img src={img} className="d-block w-100" alt="..." />
                                </div>
                            )}

                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                )

        );

    }
}



const mapStateToProps = ({ products }) => ({ product: products.currentProduct });

export default connect(mapStateToProps, { getProductDetail })(ProductDetail);