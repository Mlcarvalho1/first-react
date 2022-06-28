import { call, put, all, takeLatest } from "redux-saga/effects";
import { get } from "lodash";
import Swal from "sweetalert2";

import axios from "../../../services/axios";
import * as actions from './actions'
import * as types from '../types'

function* loginRequest({payload}) {
    try {
        const resp = yield call(axios.post, '/tokens', payload)

        yield put(actions.loginSuccess({...resp}))

        Swal.fire({
            icon: 'success',
            title: 'Logado com sucesso',
          })        
        axios.defaults.headers.Authorization = `Bearer ${resp.data.token}`;
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Credenciais inválidas'
          })
        yield put(actions.loginFailure())
    }
}

function persistRehydrate( {payload} ){
  const token = get(payload, 'auth.token', '')
  if(!token) return; 
  axios.defaults.headers.Authorization = `Bearer ${token}`
}

export default all([
  takeLatest(types.LOGUIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate)
])