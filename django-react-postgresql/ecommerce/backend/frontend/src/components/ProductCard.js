import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
    return (
        <Card className="my-3 p-3 ">
            <Link to={`/product/${product._id}`}>
                {product.image ? (
                    <Card.Img src={product.image} />
                ) : (
                    <i className="fa-regular fa-image fa-10x"></i>
                )}
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>{product.name}</Link>

                <Card.Text as="div">
                    <div className="my-3">
                        <Rating
                            value={product.rating}
                            text={`${product.numReviews} reviews.`}
                            color={"#cccccc"}
                        />
                    </div>
                </Card.Text>

                <Card.Text as="h3">${product.price}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;
