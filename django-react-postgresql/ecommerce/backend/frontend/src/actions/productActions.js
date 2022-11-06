import axios from "axios";
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,

    PRODUCT_IMAGE_UPLOAD_REQUEST,
    PRODUCT_IMAGE_UPLOAD_SUCCESS,
    PRODUCT_IMAGE_UPLOAD_FAIL,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,

    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
} from "../constants/productConstants";
import store from "../store";

export const listProducts = (params='/') => async (dispatch) => {
    try {
        // dispatch({ type: PRODUCT_LIST_REQUEST });

        // console.log('Action Params:',params )

        const { data } = await axios.get(`/api/products${params}`);
        
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response,
            //Code bellow as Dennis Ivy's Course:
            // payload: error.response && error.response.data.detail
            //         ? error.response.data.detail
            //         : error.response.detail,
        });
    }
};


export const listTopProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_REQUEST });


        const { data } = await axios.get(`/api/products/top/`);
       
        
        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: error.response,
        });
    }
};

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/products/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response,
            //Code bellow as Dennis Ivy's Course:
            // payload: error.response && error.response.data.detail
            //         ? error.response.data.detail
            //         : error.response.detail,
        });
    }
};

export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = store.getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.delete(
            `/api/products/delete/${id}/`,
            config
        );

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response,
        });
    }
};

export const createProduct = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = store.getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`/api/products/create/`, {}, config);

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response,
        });
    }
};

export const resetProduct = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_CREATE_RESET });
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response,
        });
    }
};

export const updateProduct = (product) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = store.getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `/api/products/update/${product._id}/`,
            product,
            config
        );

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        });

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response,
        });
    }
};

export const resetUpdateProduct = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_RESET });
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response,
        });
    }
};

export const uploadProductImage = (file, productId) => async (dispatch) => {
    try {
        
        const formData = new FormData();
        formData.append("image", file);
        formData.append("product_id", productId);

        dispatch({ type: PRODUCT_IMAGE_UPLOAD_REQUEST });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        const { data } = await axios.post(
            "/api/products/upload/",
            formData,
            config
        );

        dispatch({
            type: PRODUCT_IMAGE_UPLOAD_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_IMAGE_UPLOAD_FAIL,
            payload: error.response,
        });
    }
};


export const createProductReview = (productId, review) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

        const {
            userLogin: { userInfo },
        } = store.getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            `/api/products/${productId}/reviews/`,
            review,
            config
        );

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response,
        });
    }
};


export const resetProductCreateReview = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response,
        });
    }
};


