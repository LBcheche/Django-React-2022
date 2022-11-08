import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginator from "../components/Paginator";
import {
    listProducts,
    deleteProduct,
    createProduct,
    resetProduct,
} from "../actions/productActions";


function ProductListScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, pages, page } = productList;

    const productDelete = useSelector((state) => state.productDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete;

    const productCreate = useSelector((state) => state.productCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    let [searchParams, setSearchParams] = useSearchParams();
    let keyword = searchParams.get("keyword");
    let pg = searchParams.get("page");

    if (!pg) {
        pg = 1;
    }

    if (!keyword) {
        keyword = "";
    }

    const [params, setParams] = useState("");


    useEffect(() => {
        setParams(`?keyword=${keyword}&page=${pg}`);
    }, [keyword, pg]);



    useEffect(() => {
        dispatch(resetProduct())
    
        if (!userInfo.isAdmin) {
            navigate("/login");
        } 
        if(successCreate){
            navigate(`/admin/product/${createdProduct._id}/edit/`);
        } else{
            dispatch(listProducts(params))
        }
    }, [dispatch, navigate, params, userInfo, successDelete, successCreate, createProduct]);

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteProduct(id));
        }
    };

    const createProductHandler = () => {
        dispatch(createProduct());
    };

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">
            Error {error?.status}: {error.data?.detail}
        </Message>
    ) : (
        <>
            <Row className="align-items-center">
                <Col md={11}>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button
                        className="my-3"
                        onClick={() => createProductHandler()}
                    >
                        <i className="pointer fas fa-solid fa-plus fa-lg"></i>
                    </Button>
                </Col>
                {/* <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col> */}
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}

            <Table striped hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                    </tr>
                </thead>
                <tbody>
                
                    {
                    products?(
                    
                    products?.map((product) => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>

                            <td>
                                &nbsp;
                                <LinkContainer
                                    to={`/admin/product/${product._id}/edit`}
                                >
                                    <i className="pointer fas fa-edit"></i>
                                </LinkContainer>
                                &nbsp;&nbsp;&nbsp;
                                <span
                                    className="pointer"
                                    onClick={() => deleteHandler(product._id)}
                                >
                                    <i className="pointer fas fa-trash"></i>
                                </span>
                            </td>
                        </tr>
                    ))):(<></>)}
                </tbody>
            </Table>
            <Paginator pages={pages} page={page} keyword={keyword} preUrl={'/admin/productlist'}/>
        </>
    );
}

export default ProductListScreen;
