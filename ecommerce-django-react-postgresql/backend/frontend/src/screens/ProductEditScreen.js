import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
    listProductDetails,
    updateProduct,
    resetUpdateProduct,
    uploadProductImage,
} from "../actions/productActions";
import FormContainer from "../components/FormContainer";

function ProductEditScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const productId = params.id;

    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [image, setImage] = useState();
    const [brand, setBrand] = useState();
    const [category, setCategory] = useState();
    const [countInStock, setCountInStock] = useState();
    const [description, setDescription] = useState();
    const [uploading, setUploading] = useState();

    const productDetails = useSelector((state) => state.productDetails);
    const { error, loading, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const {
        error: errorUpdate,
        loading: loadingUpdate,
        success: successUpdate,
    } = productUpdate;

    // console.log("product:", product);

    useEffect(() => {
        if (successUpdate) {
            dispatch(resetUpdateProduct());
            navigate("/admin/productlist");
        } else {
            if (!product || product?._id !== Number(productId)) {
                dispatch(listProductDetails(productId));
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            }
        }
    }, [product, productId, dispatch, navigate, successUpdate]);

    const uploadFileHandler = (e) => {
        setUploading(true);

        const file = e.target.files[0];
        dispatch(uploadProductImage(file, productId));

        setUploading(false);
    };

    const submitHandler = (e) => {
        
        // console.log("updated product:", {
        //     _id: product._id,
        //     name,
        //     price,
        //     image,
        //     brand,
        //     category,
        //     countInStock,
        //     description,
        // });

        e.preventDefault();

        dispatch(
            updateProduct({
                _id: product._id,
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description,
            })
        );
    };

    return (
        <div>
            <Link to="/admin/productlist" className="btn btn-light my-3">
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && (
                    <Message variant="danger"> {errorUpdate}</Message>
                )}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>

                            <Form.Control
                                type="name"
                                placeholder="Enter product's name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                            {/* 
                            {error?.data.name ? (
                                <Message variant="danger">
                                    {" "}
                                    {errorUpdate.data.name}
                                </Message>
                            ) : (
                                <></>
                            )} */}
                        </Form.Group>

                        <p></p>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>

                            <Form.Control
                                type="text"
                                placeholder="Enter product's stock"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                            {/* 
                            {error?.data.description ? (
                                <Message variant="danger">
                                    {" "}
                                    {errorUpdate.data.description}
                                </Message>
                            ) : (
                                <></>
                            )} */}
                        </Form.Group>

                        <p></p>

                        <Form.Group controlId="brand">
                            <Form.Label>Brand</Form.Label>

                            <Form.Control
                                type="text"
                                placeholder="Enter product's brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></Form.Control>

                            {/* {error?.data.brand ? (
                                <Message variant="danger">
                                    {" "}
                                    {errorUpdate.data.brand}
                                </Message>
                            ) : (
                                <></>
                            )} */}
                        </Form.Group>

                        <p></p>

                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>

                            <Form.Control
                                type="text"
                                placeholder="Enter product's category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>

                            {/* {error?.data.category ? (
                                <Message variant="danger">
                                    {" "}
                                    {errorUpdate.data.category}
                                </Message>
                            ) : (
                                <></>
                            )} */}
                        </Form.Group>

                        <p></p>

                        <Form.Group controlId="image">
                            <Form.Label>Image</Form.Label>

                            <Form.Control
                                type="text"
                                placeholder="Enter product's image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                            <Form.Control
                                type="file"
                                // id="image-file"
                                // isValid
                                
                                onChange={uploadFileHandler}
                            ></Form.Control>
                            {/* <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback> */}
                            {/* {error?.data.image ? (
                                <Message variant="danger">
                                    {" "}
                                    {errorUpdate.data.image}
                                </Message>
                            ) : (
                                <></>
                            )} */}
                        </Form.Group>

                        <p></p>

                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>

                            <Form.Control
                                type="double"
                                placeholder="Enter product's price"
                                value={price}
                                onChange={(e) =>
                                    setPrice(Number(e.target.value))
                                }
                            ></Form.Control>
                            {/* 
                            {error?.data.price ? (
                                <Message variant="danger">
                                    {" "}
                                    {errorUpdate.data.price}
                                </Message>
                            ) : (
                                <></>
                            )} */}
                        </Form.Group>
                        <p></p>

                        <Form.Group controlId="countinstock">
                            <Form.Label>Count In Stock</Form.Label>

                            <Form.Control
                                type="number"
                                placeholder="Enter product's stock"
                                value={countInStock}
                                onChange={(e) =>
                                    setCountInStock(Number(e.target.value))
                                }
                            ></Form.Control>

                            {/* {error?.data.countInStock ? (
                                <Message variant="danger">
                                    {" "}
                                    {errorUpdate.data.countInStock}
                                </Message>
                            ) : (
                                <></>
                            )} */}
                        </Form.Group>

                        <p></p>

                        <Button type="submit" variant="primary">
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </div>
    );
}

export default ProductEditScreen;
