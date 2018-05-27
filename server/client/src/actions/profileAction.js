import axios from 'axios';
import { GET_PROFILE, GET_PROFILES, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER } from './types';
import { errorsAction } from './errorAction';
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('http://localhost:5000/api/profile').then(res =>
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    ).catch(err =>
        dispatch({
            type: GET_PROFILE,
            payload: {}
        })
    );
}
export const getAllProfiles = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('http://localhost:5000/api/profile/all').then(res =>
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    ).catch(err =>
        dispatch({
            type: GET_PROFILES,
            payload: null
        })
    );
}
export const getProfileByHandle = handle => dispatch => {
    dispatch(setProfileLoading());
    axios.get('http://localhost:5000/api/profile/handle/' + handle).then(res =>
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    ).catch(err =>
        dispatch({
            type: GET_PROFILE,
            payload: null
        })
    );
}
export const createProfile = (profile, history) => dispatch => {
    axios.post('http://localhost:5000/api/profile', profile).then(res =>
        history.push('/dashboard')
    ).catch(err =>
        dispatch(errorsAction(err.response.data))
        )
}
export const addExperience = (exp, history) => dispatch => {
    axios.post('http://localhost:5000/api/profile/experience', exp).then(res =>
        history.push('/dashboard')
    ).catch(err =>
        dispatch(errorsAction(err.response.data))
        )
}
export const addEducation = (edu, history) => dispatch => {
    axios.post('http://localhost:5000/api/profile/education', edu).then(res =>
        history.push('/dashboard')
    ).catch(err =>
        dispatch(errorsAction(err.response.data))
        )
}
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}
export const deleteProfile = () => dispatch => {
    if (window.confirm('Bạn muốn xóa tài khoản?')) {
        axios.delete('http://localhost:5000/api/profile/delete-user').then(res =>
            dispatch({
                type: SET_CURRENT_USER,
                payload: {}
            })
        ).catch(err =>
            dispatch(errorsAction(err.response.data))
            )
    }
}
export const deleteExp = (id) => dispatch => {
    if (window.confirm('Bạn muốn xóa tài khoản?')) {
        axios.delete('http://localhost:5000/api/profile/experience/' + id).then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        ).catch(err =>
            dispatch(errorsAction(err.response.data))
            )
    }
}
export const deleteEdu = (id) => dispatch => {
    if (window.confirm('Bạn muốn xóa tài khoản?')) {
        axios.delete('http://localhost:5000/api/profile/education/' + id).then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        ).catch(err =>
            dispatch(errorsAction(err.response.data))
            )
    }
}
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}