import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginator from "../components/Paginator";
import ProductCarosel from "../components/ProductCarosel";

import {  useSearchParams } from "react-router-dom";

import { listProducts } from "../actions/productActions";

function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { error, loading, products, pages, page } = productList;

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
    

    // console.log("home - keyword :", keyword);
    // console.log("home - pages :", pages);
    // console.log("home - page :", page);
    // console.log("home - products:", products);

    useEffect(() => {
        setParams(`?keyword=${keyword}&page=${pg}`);
    }, [keyword, pg]);

    useEffect(() => {
        if (params.includes("page")) {
        // console.log("BEFORE DISPATCH - params:", params);
        dispatch(listProducts(params));
        }
    }, [params]);

    return (
        <div>
            
            <h1>Latest Products</h1>
            {!keyword && <ProductCarosel/>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {" "}
                    SORRY, WE GOT AN ERROR! <p></p> Error {error.status} :{" "}
                    {error.statusText} {error.data.detail}{" "}
                </Message>
            ) : (
                <h3> </h3>
            )}

            {products ? (
                <>
               
                    <Row>
                        {products?.map((product) => (
                            <Col
                                key={product?._id}
                                sm={12}
                                md={6}
                                lg={4}
                                xl={3}
                            >
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginator page={page} pages={pages} keyword={keyword} />
                </>
            ) : (
                <></>
            )}
        </div>
    );
}

export default HomeScreen;
