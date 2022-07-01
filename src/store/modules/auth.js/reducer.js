import axios from '../../../services/axios';
import * as types from '../types';

const initialState = {
    isLoggedIn: false,
    token:false,
    isLoading: false
};

export default function(state = initialState, action) {
    switch(action.type) {

        case types.LOGUIN_SUCCESS: {
            const newState = {...state}
            newState.isLoggedIn = true;
            newState.token = action.payload.data.token;
            newState.isLoading = false;
            return newState
        }

        case types.LOGUIN_FAILURE: {
            delete axios.defaults.headers.Authorization;
            const newState = {...initialState}
            return newState
        }

        

        default: {
            return state;
        }
    }
}