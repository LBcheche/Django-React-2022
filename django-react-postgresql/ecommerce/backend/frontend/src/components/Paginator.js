import React from "react";
import { Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Paginator({ page, pages, keyword, preUrl="" }) {

    const navigate = useNavigate();

    const paginatorHandle = (pg) => {
        navigate(`${preUrl}/?keyword=${keyword}&page=${pg}`);
    };

    return (
        pages > 1 && (
            <Pagination>
                {/* First */}
                {page === 1 ? (
                    <Pagination.First disabled> First</Pagination.First>
                ) : (
                    <Pagination.First onClick={() => paginatorHandle(1)}>
                        First
                    </Pagination.First>
                )}

                {/* Prev */}
                {page > 1 ? (
                    <Pagination.Prev onClick={() => paginatorHandle(page - 1)}>
                        &laquo;
                    </Pagination.Prev>
                ) : (
                    <Pagination.Prev disabled>&laquo;</Pagination.Prev>
                )}

                {/* Numbers */}
                {[...Array(pages).keys()].map((x) => (
                    <Pagination.Item
                        active={x + 1 === page}
                        key={x + 1}
                        onClick={() => paginatorHandle(x + 1)}
                    >
                        {x + 1}
                    </Pagination.Item>
                ))}

                {/* Next */}
                {page < pages ? (
                    <Pagination.Next onClick={() => paginatorHandle(page + 1)}>
                        &raquo;
                    </Pagination.Next>
                ) : (
                    <Pagination.Next disabled>&raquo;</Pagination.Next>
                )}

                {/* Last */}
                {pages != page ? (
                    <Pagination.Last onClick={() => paginatorHandle(pages)}>
                        Last
                    </Pagination.Last>
                ) : (
                    <Pagination.Last disabled>Last</Pagination.Last>
                )}
            </Pagination>
        )
    );
}

export default Paginator;
