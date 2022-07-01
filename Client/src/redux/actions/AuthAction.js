import * as AuthApi from '../api/AuthRequest'

export const login = (formData) => async(dispatch) => {

    dispatch({type: "AUTH_START"})
    try {
        const { data } = await AuthApi.logIn(formData)
        dispatch({type: "AUTH_SUCCESS", data: data})
    } catch (error) {
        console.log(error.response.data);
        dispatch({type: "AUTH_FAIL"})
    }
}

export const signup = (formData) => async(dispatch) => {

    dispatch({type: "AUTH_START"})
    try {
        const { data } = await AuthApi.signUp(formData)
        dispatch({type: "AUTH_SUCCESS", data: data})
    } catch (error) {
        console.log(error.response.data);
        dispatch({type: "AUTH_FAIL"})
    }
}

export const logout = () => async(dispatch) => {
    dispatch({type: "LOG_OUT"})
}