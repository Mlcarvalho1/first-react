/* eslint-disable import/no-anonymous-default-export */
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

export default reducers => {
    const persistedReducers = persistReducer({
        key: 'REACT-BASE',
        storage,
        whitelist: ['auth']
    },
    reducers   
    )

    return persistedReducers
}