const initialState = { 
    authData: null, 
    loading: false,
    error: false,
    updateLoading: true
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "AUTH_START":
            return {
                ...state, 
                loading: true, 
                error: false
            };
        case "AUTH_SUCCESS":
            localStorage.setItem("profile", JSON.stringify({...action?.data}))
            return {
                ...state, 
                authData: action.data,
                loading: false
            };
        case "AUTH_FAIL":
            return {
                ...state,
                loading: false,
                error: true
            };
        case "UPDATING_START":
            return {
                ...state,
                updateLoading: true,
                error: false
            }
        case "UPDATING_SUCCESS":
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return {
                ...state,
                updateLoading: false,
                authData: action.data,
                error: false
            }
        case "UPDATING_FAIL":
            return {
                ...state,
                updateLoading: false,
                error: true
            }
        case "LOG_OUT":
            localStorage.clear();
            return {
                ...state,
                authData: null,
                loading: false,
                error: false
            };
        default:
            return state;
    }
}

export default authReducer