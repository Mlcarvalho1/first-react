import { createStore } from "redux"

const reducer = ( state, action) => {
    switch(action.type){
        case 'Btn-clicked': 
            const newState = {...state}
            return newState
        default:
            return state
    }
}

const store = createStore(reducer)

export default store