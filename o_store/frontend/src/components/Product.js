import React from 'react';
import PropTypes from 'proptypes';

const Product = ({ name, description, images, price }) => {

    return (
        <div className="col-lg-3 col-md-6 mb-4">
            <div className="card h-100">
                <a href="#" className="image-container"><img className="card-img-top" src={images[0] || "media/products/no-image.png"} alt={name} /></a>
                <div className="card-body">
                    <h4 className="card-title">
                        <a href="#">{name}</a>
                    </h4>
                    <h5>${price}</h5>
                    <p className="card-products">{description}</p>
                </div>
                <div className="card-footer">
                    <small className="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                </div>
            </div>
        </div>
    );
}

export default Product;