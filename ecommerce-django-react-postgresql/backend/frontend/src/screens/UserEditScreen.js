import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
    getUserDetails,
    updateUser,
    resetUpdateUser,
} from "../actions/userActions";
import FormContainer from "../components/FormContainer";

function UserEditScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const userId = params.id;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    // console.log("isAdmin:", isAdmin);

    const userDetails = useSelector((state) => state.userDetails);
    const { error, loading, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const {
        error: errorUpdate,
        loading: loadingUpdate,
        success: successUpdate,
    } = userUpdate;

    // console.log("user:", user);

    useEffect(() => {
        if (successUpdate) {
            dispatch(resetUpdateUser());
            navigate("/admin/userlist");
        } else {
            if (!user || user?._id !== Number(userId)) {
                console.log("1");
                dispatch(getUserDetails(userId));
            } else {
                console.log("2");
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    }, [user, userId, successUpdate, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: user._id, name, email, isAdmin }));
    };

    return (
        <div>
            <Link to="/admin/userlist" className="btn btn-light my-3">
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'> {errorUpdate}</Message>}
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
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>

                            {error?.data.username ? (
                                <Message variant="danger">
                                    {" "}
                                    {errorUpdate.data.name}
                                </Message>
                            ) : (
                                <></>
                            )}
                        </Form.Group>
                        <p></p>
                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>

                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>

                            {error?.data.email ? (
                                <Message variant="danger">
                                    {" "}
                                    {errorUpdate.data.email}
                                </Message>
                            ) : (
                                <></>
                            )}
                        </Form.Group>
                        <p></p>
                        <Form.Group controlId="isadmin">
                            <Form.Check
                                isInvalid={isAdmin}
                                
                                type="checkbox"
                                label="Is Admin"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></Form.Check>

                            {error?.data.isAdmin ? (
                                <Message variant="danger">
                                    {error.data.isAdmin}
                                </Message>
                            ) : (
                                <></>
                            )}
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

export default UserEditScreen;
