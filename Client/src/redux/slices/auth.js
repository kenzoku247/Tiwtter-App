import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authService from "redux/services/authService";
import valid from "utils/valid";

export const register = createAsyncThunk(
  "auth/register",
  async ( data , thunkAPI) => {
    const check = valid(data)
    if(check.errLength > 0)
    
    return thunkAPI.dispatch({type: "ALERT", payload : check.errMsg})
    try {
      const response = await authService.register("/auth/register",data);
      thunkAPI.dispatch( {
        type: "AUTH",
        payload: {
          token: response.data.access_token, 
          user: response.data.user
        }
      });
      localStorage.setItem("firstLogin", true);
      // response.cookie("access_token",response.data.access_token)
      return response
    } catch (error) {
      const message =
        (error.response &&
          error.response.data ) ||
        error.message 
      thunkAPI.dispatch({type: "ALERT", payload : message});
      // return thunkAPI.rejectWithValue();
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await authService.login("/auth/login",data);
      thunkAPI.dispatch( {
        type: "AUTH",
        payload: {
          token: res.data.access_token, 
          user: res.data.user
        }
      });
      localStorage.setItem("firstLogin", true);
      return res
      
      // console.log(res.data.access_token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data ) ||
        error.message 
      thunkAPI.dispatch({type: "ALERT", payload : message});
      // return thunkAPI.rejectWithValue();
    }
  }
);

export const refresh_token = createAsyncThunk(
  "auth/refresh_token",
  async (thunkAPI) => {
    const firstLogin = localStorage.getItem("firstLogin")
    if (firstLogin){
      try {
        const res = await authService.refresh_token("/auth/refresh_token");
        thunkAPI.dispatch( {
          type:"AUTH",
          payload: {
            token: res.data.access_token, 
            user: res.data.user
            
          }
          
        });
        return res
        
      } catch (error) {
        const message =
          (error.response &&
            error.response.data ) ||
          error.message 
        thunkAPI.dispatch({type: "ALERT", payload : message});
        // return thunkAPI.rejectWithValue();
      }
    }
  }
    
)



export const logout =  createAsyncThunk(
  "auth/logout", 
  async (thunkAPI) => {
    try {
      localStorage.removeItem("firstLogin");
      await authService.logout("/auth/logout");
      window.location.href = "/"
    } catch (error) {
      const message =
        (error.response &&
          error.response.data ) ||
        error.message 
      thunkAPI.dispatch({type: "ALERT", payload : message});
      // return thunkAPI.rejectWithValue();
    }
  
});

const initialState = {
  user: {},
  token: "",
  isLoggedIn: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.user = action.payload.data.user
      state.token = action.payload.data.access_token
      state.isLoggedIn = true
      // console.log(action.payload);
    },
    [register.rejected]: (state , action) => {
      state.user = null
    },
    [login.fulfilled]: (state , action) => {
      state.user = action.payload.data.user
      state.token = action.payload.data.access_token
      state.isLoggedIn = true
    },
    [login.rejected]: (state , action) => {
      state.user = null
    },
    [refresh_token.fulfilled]: (state , action) => {
      state.user = action.payload.data.user
      state.token = action.payload.data.access_token
      state.isLoggedIn = true
    },
    [refresh_token.rejected]: (state , action) => {
      state.user = null
    },
    [logout.fulfilled]: (state , action) => {
      state.user = null
    },
  },
});

const { reducer } = authSlice;
export default reducer;