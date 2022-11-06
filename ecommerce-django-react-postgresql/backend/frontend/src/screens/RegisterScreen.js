import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

function RegisterScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const redirect = location.state ? Number(location.state) : "/";
    const userRegister = useSelector((state) => state.userRegister);
    const { error, loading, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else {
            dispatch(register(name, email, password));
        }
    };

    return (
        <FormContainer>
            <h1>Register</h1>
            {message && <Message variant="danger"> {message}</Message>}
            {/* {error && <Message variant='danger'>{error.data}</Message>} */}
            {loading && <Loader />}
            {error ? (
                <Message variant="danger">
                    {" "}
                    Sorry, we got an error!{" "}
                    {error.data.detail ? error.data.detail : ""}
                </Message>
            ) : (
                <></>
            )}
            
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>

                    <Form.Control
                        required
                        type="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>

                    {error?.data.username ? (
                        <Message variant="danger"> {error.data.name}</Message>
                    ) : (
                        <></>
                    )}
                </Form.Group>
                <p></p>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>

                    <Form.Control
                        required
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>

                    {error?.data.username ? (
                        <Message variant="danger">
                            {" "}
                            {error.data.username}
                        </Message>
                    ) : (
                        <></>
                    )}
                </Form.Group>
                <p></p>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Enter a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>

                    {error?.data.password ? (
                        <Message variant="danger">
                            {error.data.password}
                        </Message>
                    ) : (
                        <></>
                    )}
                </Form.Group>
                <p></p>
                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>

                    {error?.data.password ? (
                        <Message variant="danger">
                            {error.data.password}
                        </Message>
                    ) : (
                        <></>
                    )}
                </Form.Group>
                <p></p>
                <Button type="submit" variant="primary">
                    Register
                </Button>
            </Form>
            <Row className="py-3">
                <Col>
                    Have an Account?{" "}
                    <Link
                        to={redirect ? `/login?redirect=${redirect}` : "/login"}
                    >
                        Sign In
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
}

export default RegisterScreen;
