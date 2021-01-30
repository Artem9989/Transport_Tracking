import { getAuthUserData } from './AuthAdmin-reducer';
 

let INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';


let initialState = {
    initialized: false
    //  isFetching: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }

}

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS })

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    dispatch(getAuthUserData());
    // //еще диспатч
    // //еще диспатч
    // //еще диспатч
    // //еще диспатч
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        });

}

export default appReducer;