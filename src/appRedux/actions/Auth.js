import Axios from "../../networking/Axios";
import {
    INIT_URL,
    FETCH_START,
    FETCH_SUCCESS,
    FETCH_ERROR,
    USER_TOKEN_SET,
    USER_DATA,
    UPDATE_LOAD_USER,
    SIGNOUT_USER_SUCCESS,
} from "./ActionTypes";
import { success, error } from '../../functions/toast'

export const setInitUrl = (url) => {
    return {
        type: INIT_URL,
        payload: url
    };
};

export const userSignUp = ({ email, password, username, user_type }) => {
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        Axios.post('/register', {
            email: email,
            password: password,
            name: username,
            user_type_id: user_type
        }
        ).then(({ data }) => {
            if (data.result) {
                success('İşlem başarılı')
                localStorage.setItem("token", data.token.access_token);
                Axios.defaults.headers.common['x-access-token'] = "Bearer " + data.token.access_token;
                dispatch({ type: FETCH_SUCCESS });
                dispatch({ type: USER_TOKEN_SET, payload: data.token.access_token });
                dispatch({ type: USER_DATA, payload: data.user });
                console.log(data)

            } else {
                dispatch({ type: FETCH_ERROR, payload: data.error });
                error('İşlem Başarısız')
            }

        }).catch(function (error) {
            dispatch({ type: FETCH_ERROR, payload: error.message });
        });
    }
};


export const userSignIn = ({ email, password, user_type_id }) => {
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        Axios.post('/login', {
            email: email,
            password: password,
            user_type_id
        }
        ).then(({ data }) => {
            console.log(data)
            if (data.result) {
                localStorage.setItem("token", data.token);
                Axios.defaults.headers.common['x-access-token'] = "Bearer " + data.token;
                dispatch({ type: FETCH_SUCCESS });
                dispatch({ type: USER_TOKEN_SET, payload: data.token });
                dispatch(getUser(data.token));
            } else {
                dispatch({ type: FETCH_ERROR, payload: data.error });
                error('işlem başarısız')
            }
        }).catch(function (error) {
            dispatch({ type: FETCH_ERROR, payload: error.message });
        });
    }
};

export const getUser = (token) => {
    return (dispatch) => {
        if (!token) {
            const token = localStorage.getItem('token');
        }
        Axios.defaults.headers.common['x-access-token'] = 'Bearer ' + token;

        dispatch({ type: FETCH_START });
        Axios.post('/api/auth/me',
        ).then(({ data }) => {
            if (data.result) {

                dispatch({ type: FETCH_SUCCESS });
                dispatch({ type: USER_DATA, payload: data.user });

            } else {
                localStorage.removeItem("token");
                dispatch({ type: FETCH_ERROR, payload: data.error });
                dispatch({ type: UPDATE_LOAD_USER, payload: false });

            }
        }).catch(function (error) {
            dispatch({ type: FETCH_SUCCESS });
            dispatch({ type: UPDATE_LOAD_USER, payload: false });
        });
    }
};

export const userSignOut = () => {

    return (dispatch) => {
        dispatch({ type: FETCH_START });

        Axios.post('/logout').then(({ data }) => {
            if (data.result) {

                localStorage.removeItem("token");
                dispatch({ type: FETCH_SUCCESS });
                dispatch({ type: SIGNOUT_USER_SUCCESS });
            } else {
                dispatch({ type: FETCH_ERROR, payload: data.error });
            }
        }).catch(function (error) {
            dispatch({ type: FETCH_ERROR, payload: error.message });
        });
    }
};