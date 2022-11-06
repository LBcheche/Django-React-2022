import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder, resetOrder } from "../actions/orderActions";

function PlaceOrderScreen() {
    const orderCreated = useSelector((state) => state.orderCreated);
    const { order, error, success } = orderCreated;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);

    cart.itemsPrice = cart.cartItems
        .reduce((acc, item) => acc + item.price * item.qty, 0)
        .toFixed(2);

    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2);
    cart.taxPrice = (0.082 * cart.itemsPrice).toFixed(2);
    cart.totalPrice = (
        Number(cart.taxPrice) +
        Number(cart.shippingPrice) +
        Number(cart.itemsPrice)
    ).toFixed(2);


    useEffect(() => {
        if (success) {
            navigate(`/order/${order?._id}`);
           
            dispatch(resetOrder(order))
        
        }
    }, [success, navigate]);

    const placeOrder = () => {


        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            })
        );
    };

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            {cart.shippingAddress.address},{" "}
                            {cart.shippingAddress.adjunct},{" "}
                            {cart.shippingAddress.city},{" "}
                            {cart.shippingAddress.postalCode},{" "}
                            {cart.shippingAddress.country}.
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            {cart.paymentMethod}.
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>

                            {cart.cartItems.length === 0 ? (
                                <Message variant="info">
                                    Your cart is empty
                                </Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link
                                                        to={`/product/${item.product}`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={5}>
                                                    ({item.qty}x) ${item.price}{" "}
                                                    = $
                                                    {(
                                                        item.qty * item.price
                                                    ).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Item:</Col>
                                    <Col>
                                        <h5 className="noMargin noPadding inLine">
                                            ${cart.itemsPrice}
                                        </h5>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>
                                        <h5 className="noMargin noPadding inLine">
                                            ${cart.shippingPrice}{" "}
                                        </h5>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>
                                        <h5 className="noMargin noPadding inLine">
                                            ${cart.taxPrice}{" "}
                                        </h5>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>
                                        <h4 className="noMargin noPadding inLine">
                                            ${cart.totalPrice}{" "}
                                        </h4>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            
                                {error && (
                                    <ListGroup.Item>
                                    <Message variant="danger">{error}</Message>
                                    </ListGroup.Item>
                                )}
                            
                            <ListGroup.Item>
                                <Row className="hrzPadding">
                                    <Button
                                        type="button"
                                        className="btn-block "
                                        variant="primary"
                                        disabled={cart.cartItems === 0}
                                        onClick={placeOrder}
                                    >
                                        Place Order
                                    </Button>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default PlaceOrderScreen;
