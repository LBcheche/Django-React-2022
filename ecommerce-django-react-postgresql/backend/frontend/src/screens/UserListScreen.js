import React, { useState, useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listUsers, deleteUser } from "../actions/userActions";

function UserListScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userDelete = useSelector((state) => state.userDelete);
    const { success: successDelete } = userDelete;

    // console.log("userInfo:", userInfo);

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        } else {
            navigate("/login");
        }
    }, [dispatch, navigate, successDelete, userInfo]);

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUser(id));
        }
    };

    // console.log("error:", error);
    // console.log("users:", users);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">
            Error {error?.status}: {error.data?.detail}
        </Message>
    ) : (
        <>
            <h1>Users</h1>
            <Table striped hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                {user.isAdmin ? (
                                    <i
                                        className="fas fa-check"
                                        style={{ color: "red" }}
                                    ></i>
                                ) : (
                                    <i className="fas fa-times"></i>
                                )}
                            </td>
                            <td>
                                &nbsp;
                                <LinkContainer
                                    to={`/admin/user/${user._id}/edit`}
                                >
                                    <i className="pointer fas fa-edit"></i>
                                </LinkContainer>
                                &nbsp;&nbsp;&nbsp;
                                <span
                                    className="pointer"
                                    onClick={() => deleteHandler(user._id)}
                                >
                                    <i className="pointer fas fa-trash"></i>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default UserListScreen;
