import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    //instead of using history, need to declare and use navigate.
    const navigate = useNavigate();

    //a way to substitute "use location".
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get("redirect") || '';
    
    // a new way to use location.
    // const location = useLocation();
    // const redirect = location.search ? location.search.split('=')[1] : '/'
    // const redirect = location.state ? Number(location.state) : "/";


    // useSelector(): Allows you to extract data from the Redux store state, using a selector function.
    // it will also subscribe to the Redux store, and run your selector whenever an action is dispatched.
    // When an action is dispatched, useSelector() will do a reference comparison of the
    // previous selector result value and the current result value. If they are different,
    // the component will be forced to re-render. If they are the same, the component
    // will not re-render.
    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, userInfo } = userLogin;


    
    useEffect(() => {

        // if(userInfo?.length !==0)
        if (userInfo) {
            navigate(`/${redirect}`);
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = (e) => {
        //this avoid the submit handle to conclude it's action
        e.preventDefault();
        dispatch(login(email, password));
    };

  


    return (
        <FormContainer>
            {/* {error && <Message variant='danger'>{error.data}</Message>} */}
            {loading && <Loader />}
            {error ? (
                <Message variant="danger"> Sorry, we got an error! {error.data.detail? error.data.detail: ""}</Message>
                
            ) : (
                <></>
            )}
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>

                    <Form.Control
                        type="email"
                        placeholder="Enter email"
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
                        type="password"
                        placeholder="Enter password"
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
                <Button type="submit" variant="primary">
                    Sign In
                </Button>
            </Form>
            <Row className="py-3">
                <Col>
                    New Customer?{" "}
                    <Link
                        to={
                            redirect
                                ? `/register?redirect=${redirect}`
                                : "/register"
                        }
                    >
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
}

export default LoginScreen;
