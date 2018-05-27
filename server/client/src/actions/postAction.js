import axios from 'axios';
import { ADD_POST, GET_POSTS, GET_POST, POST_LOADING, DELETE_POST, CLEAR_ERRORS } from './types';
import { errorsAction } from './errorAction';

export const addPost = postData => dispatch => {
    axios.post('http://localhost:5000/api/posts', postData).then(res =>
        dispatch({
            type: ADD_POST,
            payload: res.data
        })
    ).catch(err => dispatch(errorsAction(err.response.data)))
}
export const addComment = (id, postData) => dispatch => {
    dispatch(clearErrors());
    axios.post('http://localhost:5000/api/posts/comment/' + id, postData).then(res =>
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    ).catch(err => dispatch(errorsAction(err.response.data)))
}
export const getPosts = () => dispatch => {
    dispatch(postLoading());
    axios.get('http://localhost:5000/api/posts').then(res =>
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    ).catch(err => dispatch({
        type: GET_POSTS,
        payload: null
    }))
}
export const getPost = (id) => dispatch => {
    dispatch(postLoading());
    axios.get('http://localhost:5000/api/posts/' + id).then(res =>
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    ).catch(err => dispatch({
        type: GET_POST,
        payload: null
    }))
}
export const deletePost = id => dispatch => {
    if (window.confirm('Are you sure ?')) {
        axios.delete('http://localhost:5000/api/posts/' + id).then(res =>
            dispatch({
                type: DELETE_POST,
                payload: id
            })
        ).catch(err => dispatch(errorsAction(err.response.data)));
    }
}
export const deleteComment = (postId, commentId) => dispatch => {
    if (window.confirm('Are you sure ?')) {
        axios.delete('http://localhost:5000/api/posts/comment/' + postId + '/' + commentId).then(res =>
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        ).catch(err => dispatch(errorsAction(err.response.data)));
    }
}
export const likePost = id => dispatch => {
    axios.post('http://localhost:5000/api/posts/like/' + id)
        .then(res => dispatch(getPosts()))
        .catch(err => dispatch(errorsAction(err.response.data)));
}
export const unlikePost = id => dispatch => {
    axios.post('http://localhost:5000/api/posts/unlike/' + id)
        .then(res => dispatch(getPosts()))
        .catch(err => dispatch(errorsAction(err.response.data)));
}
// LOADING
export const postLoading = () => { return { type: POST_LOADING } }
export const clearErrors = () => { return { type: CLEAR_ERRORS } }