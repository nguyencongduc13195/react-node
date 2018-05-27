import { GET_ERRORS } from '../actions/types';

export const errorsAction = (error)=>{
    return {
        type: GET_ERRORS,
        payload: error
    }
}