import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import Rating from "./Rating";
import { listTopProducts } from "../actions/productActions";


function ProductCarosel() {
    const dispatch = useDispatch();
    const productTopRated = useSelector((state) => state.productTopRated);
    const { error, loading, products } = productTopRated;

 
    useEffect(() => {
        // console.log('dispatching listTopProducts...')
        dispatch(listTopProducts());
    }, [dispatch]);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        
        <Carousel pause="hover" className="bg-light" variant="dark">
            {products.map((product) => (
                <Carousel.Item key={product.id}>
                    <Link to={`product/${product._id}`}>
                        <Image src={product.image} alt={product} fluid />
                        <Carousel.Caption >
                            <h4>
                                {product.name}(${product.price})
                                <h6><Rating value ={product.rating} color='#cccccc'/></h6>
                            </h4>
                            
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default ProductCarosel;
