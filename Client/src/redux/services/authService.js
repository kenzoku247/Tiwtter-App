import axios from "axios";

const register = async (url, data, token) => {
  
  const res = await axios
  .post(url, data, {
      headers: {Authorization: token}
    
  })

  return res;
};
const refresh_token = async (url, data, token) => {

  const res = await axios
    .post(url,data, {
      headers: {Authorization: token}
    })
  return res;
  
  
}
const login = async (url,data, token) => {
  const res = await axios
    .post(url, 
      data, 
      {
        headers: {Authorization : token
        }
      }
      )
    
    return res;
};
const logout = async (url,data,token) => {
  const res = await axios
      .post(url)
  return res;
};
const authService = {
  register,
  refresh_token,
  login,
  logout,
};
export default authService;