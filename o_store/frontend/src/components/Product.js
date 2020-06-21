import React from 'react';
import PropTypes from 'proptypes';

const Product = ({ name, description, images, price }) => {

    return (
        <div className="card product" style={{ width: "18rem" }}>
            <div className="image-container">
                <img src={images[0]} className="card-img-top" alt={name} />
            </div>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>
                <a href="#" className="btn btn-primary">Add to Cart</a>
            </div>
        </div>
    );
}

export default Product;