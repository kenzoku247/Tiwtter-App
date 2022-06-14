import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css"
import Profile from "./pages/Profile/Profile";
import Register from "pages/Auth/Register";
import Login from "pages/Auth/Login";
import Home from "pages/home/Home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { refresh_token } from "redux/slices/auth";


function App() {
  const dispatch = useDispatch();
  const tokenValue = useSelector((state) => state.auth.token)
  useEffect(() => {
    dispatch(refresh_token)
  },[dispatch])

  // useEffect(() => {
  //   if (tokenValue) {

  //   }
  // },[dispatch, tokenValue])

  return (
    <Router>
      <div className="App">
        <div className="blur" style={{top: '-18%', right: '0'}}></div>
        <div className="blur" style={{top: '36%', left: '-8rem'}}></div>
        
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/" element={tokenValue ? <Home/> : <Login />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
