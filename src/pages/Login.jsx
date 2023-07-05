import React from "react";
import { useNavigate } from "react-router-dom";
// import "./Login.css";
import { useState } from "react";
import SVGF from "../assets//ghi.svg";
import axios from "axios";
import { useDispatch } from "react-redux";
import {setLogin} from '../app/features/templateSlice'
function SignUp() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisibility] = useState(false);
  const [err, setError] = useState("");
  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisible);
  };

  const handleNavigate = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      }).then((response) => {
          if(response.status === 200) {
            dispatch(setLogin())
            navigate('/home')
          }
          else if(response.status === 204){
            setError(response.statusText)
          }
          else{
            setError(response.statusText)
          } 
      }).catch((error) => {
        setError('Password is wrong')
      })
    } 
    catch (err) {
      console.log(err);
    }
    setEmail('')
    setPassword('')
  };
  return (
    <div className="container">
      <div className="left_div">
        <img
          src="public/LOGO.png"
          alt=""
          style={{ marginLeft: "1rem", marginTop: "1.2rem" }}
        />
        <p id="desc">Find 3D Objects, Mockups and Illustrations here.</p>
        <img
          src={SVGF}
          height="65%"
          style={{
            width: "35rem",
            // marginBottom:'2rem',
            paddingLeft: "23rem",
            position: "absolute",
            bottom: "6.5rem",

            left: "10rem",
          }}
        />
      </div>

      <div className="right_div">
        <form onSubmit={handleSubmit}>
          <select className="select_class">
            <option value="1">English(UK)</option>
            <option value="2">Hindi</option>
            <option value="3">French</option>
            <option value="4">Spanish</option>
          </select>

          <div className="form-start">
            <p id="desc_1">Login Account</p>

            <div className="sign_up_container">
              <div className="google">
                <img src="public/google.svg" alt="" width="25px" />
                <p className="bhu">Sign In with Google</p>
              </div>

              <div className="facebook">
                <img src="public/facebook.svg" alt="" width="25px" />
                <p className="bhu">Sign In with Facebook</p>
              </div>
            </div>
            <p className="or">-OR-</p>

            <input
              type="email"
              className="inp"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type={passwordVisible ? "text" : "password"}
              className="inp1"
              placeholder="Password"
              required
              id="id_password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
              <h2>{err}</h2>
            <button className="btn1" type="submit">
              Log In
            </button>
            <div className="last_class">
              <p className="fg"> Register for new account? </p>
              <button id="re" onClick={() => handleNavigate()}>
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;