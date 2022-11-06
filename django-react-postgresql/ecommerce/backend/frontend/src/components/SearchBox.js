import React, { useState, useEffect} from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}


function SearchBox() {

    const [keyword, setKeyword] = useState("");
    let navigate = useNavigate();
    let location = useLocation();


    const submitHandler = (e) => {
 
        e.preventDefault();
        if (keyword) {
            // console.log('seachbox navigate keyword')
            navigate(`/?keyword=${keyword}&page=1`);

        } else {
            // console.log('seachbox navigate /')
            navigate(location.pathname)
        }
    };

    return (
        <Form onSubmit={submitHandler} >
            <Row>
                <Col xs={8} sm={8} md={9}>
                    <Form.Control
                        type="text"
                        name="q"
                        onChange={(e) => setKeyword(e.target.value)}
                        // className="mr-sm-2 ml-sm-5"
                        size="sm"
                        placeholder="search a product"
                    ></Form.Control>
                </Col>
                <Col style={{ padding: "0px" }}>
                    <Button
                        type="submit"
                        variant="outline-secondary"
                        className="p-1  "
                        size="sm"
                    >
                        Search
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

export default SearchBox;
