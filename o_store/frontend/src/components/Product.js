import React from 'react';
import PropTypes from 'proptypes';
import { Link } from 'react-router-dom';

const Product = ({ slug, name, description, images, price }) => {

    return (
        <div className="col-lg-3 col-md-6 mb-4">
            <div className="card h-100">
                <Link to={`/${slug}`} className="image-container"><img className="card-img-top" src={images[0] || "media/products/no-image.png"} alt={name} /></Link>
                <div className="card-body">
                    <h4 className="card-title">
                        <Link to={`/${slug}`}>{name}</Link>
                    </h4>
                    <h5>${price}</h5>
                    <p className="card-products">{description}</p>
                </div>
            </div>
        </div>
    );
}

export default Product;