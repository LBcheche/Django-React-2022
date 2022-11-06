import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listOrders } from "../actions/orderActions";

function OrderListScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    // console.log("userInfo:", userInfo);
    // console.log("orders:", orders);

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders());
        } else {
            navigate("/login");
        }
    }, [dispatch, navigate, userInfo]);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">
            Error {error?.status}: {error.data?.detail}
        </Message>
    ) : (
        <>
            <h1>Orders</h1>
            <Table striped hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user?.name}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>${order.totalPrice}</td>
                            <td>
                                {order.isPaid ? (
                                    <>
                                        <i
                                            className="fas fa-check"
                                            style={{ color: "green" }}
                                        ></i>{" "}
                                        {order.paidAt.substring(0, 10)}
                                    </>
                                ) : (
                                    <i
                                        className="fas fa-times"
                                        style={{ color: "red" }}
                                    ></i>
                                )}
                            </td>
                            <td>
                                {order.isDelivered ? (
                                    <>
                                        <i
                                            className="fas fa-check"
                                            style={{ color: "green" }}
                                        ></i>{" "}
                                        {order.deliveredAt.substring(0, 10)}
                                    </>
                                ) : (
                                    <i
                                        className="fas fa-times"
                                        style={{ color: "red" }}
                                    ></i>
                                )}
                            </td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <i className="pointer fa-sharp fa-solid fa-info "></i>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default OrderListScreen;
