import React from "react";

function Star({ starValue, color }) {
    return (
        <span>
            <i
                style={{ color }}
                className={
                    starValue >= 1
                        ? "fas fa-star"
                        : starValue >= 0.5
                        ? "fas fa-star-half-alt"
                        : "far fa-star"
                }
            ></i>
        </span>
    );
}

export default Star;
