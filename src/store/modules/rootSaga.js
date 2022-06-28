import { all } from "redux-saga/effects";

import auth from "./auth.js/sagas";

export default function* rootSaga() {
    return yield all([auth]);
}