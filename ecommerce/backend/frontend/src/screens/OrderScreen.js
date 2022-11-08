import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
    getOrderDetails,
    orderPay,
    deliverOrder,
} from "../actions/orderActions";
import { PayPalButton } from "react-paypal-button-v2";
import {
    ORDER_PAY_RESET,
    ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

function OrderScreen() {
    const orderId = useParams().id;

    const [sdkReady, setSdkReady] = useState(false);

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, error, loading } = orderDetails;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading: loadingDeliver, success:successDeliver } = orderDeliver;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const { loading: loadingPay, success: successPay } = useSelector(
        (state) => state.orderPay
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Create your Paypal Client ID at https://developer.paypal.com/ Sandbox App:
    
    const ClientID = "write your Paypal Client ID here"

    const addPayPalScript = () => {
        const script = document.createElement("script");

        script.type = "text/javascript";
        script.src =
            `https://www.paypal.com/sdk/js?client-id=${ClientID}`;
        script.async = true;
        script.currency = "BRL";
        script.onload = () => {
            setSdkReady(true);
        };

        document.body.appendChild(script);
    };

    if (!loading && !error && order?.orderItems) {
        order.itemsPrice = order?.orderItems
            ?.reduce((acc, item) => acc + item.price * item.qty, 0)
            .toFixed(2);
    }

    useEffect(() => {

        if(!userInfo){
            navigate('/login')
        }

        if (
            !order ||
            successPay ||
            order._id !== Number(orderId) ||
            successDeliver
        ) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(getOrderDetails(orderId));
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [successPay, dispatch, order, successDeliver, orderId, userInfo]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(orderPay(orderId, paymentResult));
    };

    const deliverHandler = () => {
        dispatch(deliverOrder(order));
    };

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : order ? (
        <div>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <>
                                <h5 className="noMargin noPadding">
                                    {order.user.name}
                                </h5>
                            </>
                            <p>
                                Email:{" "}
                                <a href={`mailTo:${order.user.email}`}>
                                    {order.user.email}
                                </a>
                            </p>
                            <p>
                                Address: {order.shippingAddress.address},{" "}
                                {order.shippingAddress.adjunct},{" "}
                                {order.shippingAddress.city},{" "}
                                {order.shippingAddress.postalCode},{" "}
                                {order.shippingAddress.country}.
                            </p>
                            <>
                                {order.isDelivered ? (
                                    <Message variant="success">
                                        Delivered on {order.deliveredAt.substring(0,10)}
                                    </Message>
                                ) : (
                                    <Message variant="warning">
                                        Not Delivered
                                    </Message>
                                )}
                            </>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>{order.paymentMethod}.</p>
                            <>
                                {order.isPaid ? (
                                    <Message variant="success">
                                        Paid on {order.paidAt.substring(0,10)}
                                    </Message>
                                ) : (
                                    <Message variant="warning">
                                        Not Paid
                                    </Message>
                                )}
                            </>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>

                            {order.orderItems.length === 0 ? (
                                <Message variant="info">Order is empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => (
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
                                            ${order.itemsPrice}
                                        </h5>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>
                                        <h5 className="noMargin noPadding inLine">
                                            ${order.shippingPrice}{" "}
                                        </h5>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>
                                        <h5 className="noMargin noPadding inLine">
                                            ${order.taxPrice}{" "}
                                        </h5>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>
                                        <h4 className="noMargin noPadding inLine">
                                            ${order.totalPrice}{" "}
                                        </h4>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}

                            {error && (
                                <ListGroup.Item>
                                    <Message variant="danger">{error}</Message>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                        {loadingDeliver && <Loader/>}
                        {userInfo &&
                            userInfo.isAdmin &&
                            order.isPaid &&
                            !order.isDelivered && (
                                <ListGroup>
                                    <Button
                                        type="button"
                                        className="btn btn-block"
                                        onClick={deliverHandler}
                                    >Mark As Delivered</Button>
                                    
                                </ListGroup>
                            )}
                    </Card>
                </Col>
            </Row>
        </div>
    ) : (
        <>
            <Message variant="info">{"You have no Order Items"}</Message>
        </>
    );
}

export default OrderScreen;
