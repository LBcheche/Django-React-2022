import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";

function ShippingScreen() {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [address, setAddress] = useState(shippingAddress?.address);
    const [adjunct, setAdjunct] = useState(shippingAddress?.adjunct);
    const [city, setCity] = useState(shippingAddress?.city);
    const [fs, setFS] = useState(shippingAddress?.fs);
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode);
    const [country, setCountry] = useState(shippingAddress?.country);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            saveShippingAddress({
                address,
                adjunct,
                city,
                fs,
                postalCode,
                country,
            })
        );
        navigate("/payment");
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>

                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter your address"
                        value={address ? address : ""}
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <p></p>
                <Form.Group controlId="adjunct">
                    <Form.Label>Adjunct</Form.Label>

                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter an adjunct"
                        value={adjunct ? adjunct : ""}
                        onChange={(e) => setAdjunct(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <p></p>
                <Row>
                    <Col>
                        <Form.Group controlId="city">
                            <Form.Label>City</Form.Label>

                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter your address"
                                value={city ? city : ""}
                                onChange={(e) => setCity(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="fs">
                            <Form.Label>FS</Form.Label>

                            <Form.Control
                                required
                                type="name"
                                placeholder="Enter your federation state"
                                value={fs ? fs : ""}
                                onChange={(e) => setFS(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <p></p>
                <Row>
                    <Col>
                        <Form.Group controlId="postalCode">
                            <Form.Label>Postal Code</Form.Label>

                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter your postal code"
                                value={postalCode ? postalCode : ""}
                                onChange={(e) => setPostalCode(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="country">
                            <Form.Label>Country</Form.Label>

                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter your country"
                                value={country ? country : ""}
                                onChange={(e) => setCountry(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <p></p>
                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
}

export default ShippingScreen;
