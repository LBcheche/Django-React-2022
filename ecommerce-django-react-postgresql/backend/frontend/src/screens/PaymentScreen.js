import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

function PaymentScreen() {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState("");

    if (!shippingAddress) {
        navigate("/shipping");
    }


    const submitHandler = (e) => {
        // e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/placeorder");
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="payment">
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            required
                            type="radio"
                            label="PayPal & Credit Card"
                            id="paypal"
                            name="paymentMethod"
                            onChange={(e) => setPaymentMethod("PayPal")}
                        ></Form.Check>
                        <Form.Check
                            disabled
                            required
                            type="radio"
                            label="Credit Card"
                            id="credit_card"
                            name="paymentMethod"
                            onChange={(e) => setPaymentMethod("CreditCard")}
                        ></Form.Check>
                        <Form.Check
                            disabled
                            required
                            type="radio"
                            label="Bank Slip"
                            id="bank_slip"
                            name="paymentMethod"
                            onChange={(e) => setPaymentMethod("BankSlip")}
                        ></Form.Check>
                    </Col>
                </Form.Group>
                <p></p>

                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
}

export default PaymentScreen;
