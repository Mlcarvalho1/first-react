import * as types from '../types'

export function loginRequest(payload){
    return {
        type: types.LOGUIN_REQUEST,
        payload
    };
}   

export function loginSuccess(payload){
    return {
        type: types.LOGUIN_SUCCESS,
        payload
    };
}

export function loginFailure(payload){
    return{
        type: types.LOGUIN_FAILURE,
        payload
    };
}