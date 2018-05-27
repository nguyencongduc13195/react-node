import axios from 'axios';
import setAuthToken from './../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { SET_CURRENT_USER } from './types';
import {errorsAction} from './errorAction';
export const registerUser = (user, history) => dispatch => {
    axios.post('http://localhost:5000/api/users/register', user)
        .then((response) => {
            return history.push('/login')
        })
        .catch((error) => {
            dispatch(errorsAction(error.response.data))
        });
}
export const loginUser = user => dispatch => {
    axios.post('http://localhost:5000/api/users/login', user)
        .then((response) => {
            const {token} = response.data;
            localStorage.setItem('jwtToken', token);
            // set header
            setAuthToken(token);
            // decode
            const decoded = jwt_decode(token);
            // set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch((error) => {
            dispatch(errorsAction(error.response.data))
        });
}

export const setCurrentUser = (decoded)=>{
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logOutUser = ()=> dispatch => {
    localStorage.removeItem('jwtToken');
    // xóa header
    setAuthToken(false);
    // set state user
    dispatch(setCurrentUser({}));
}