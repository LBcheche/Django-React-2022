import React from "react";
import { Spinner } from "react-bootstrap";
function Loader() {
    return (
        <div>
            <Spinner
                animation="border"
                role="status"
                style={{
                    height: "100px",
                    width: "100px",
                    margin: "auto",
                    display: "block",
                }}
                
            >
                <span className="sr-only"><h3>Loading...</h3></span>

            </Spinner>
        </div>
    );
}

export default Loader;
