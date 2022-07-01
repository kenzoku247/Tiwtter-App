const initialState = { 
    posts: null, 
    loading: false,
    error: false,
    uploading: false
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPLOAD_START":
            return {
                ...state,
                error: false,
                uploading: true
            };
        case "UPLOAD_SUCCESS":
            localStorage.setItem("profile", JSON.stringify({...action?.data}))
            return {
                ...state, 
                posts: [action.data,...state.posts],
                uploading: false,
                error: false
            };
        case "UPLOAD_FAIL":
            return {
                ...state,
                error: true,
                uploading: false
            };
        case "RETRIEVING_START":
            return { 
                ...state, 
                loading: true, 
                error: false 
            };
        case "RETRIEVING_SUCCESS":
            return { 
                ...state, 
                posts: action.data, 
                loading: false, 
                error: false 
            };
        case "RETRIEVING_FAIL":
            return { 
                ...state, 
                loading: false, 
                error: true 
            };
        default:
            return state;
    }
}

export default postReducer