import React, { useEffect } from 'react'
import Footer from '../../components/footerLogin/Footer'
import NavbarLogin from '../../components/navbar/NavbarLogin'
import User from './../../Home_images/Username.svg'
import axios from 'axios';
import toast from 'react-hot-toast';
import './style.scss'
import Lock from './../../Home_images/Password.svg'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../../redux/userSlice';
import { useFetchPost } from '../../hooks/useFetchPost.jsx';
const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [Password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [body, setBody] = useState({
    "email" : email,
    "password" : Password
  });
  const nav = useNavigate();
  const {user} = useSelector(state=> state.user);
  if(user.email !== ""){
    nav("/profile");
  }
  const onLogin = ()=>{
  
  setBody(prev => ({
    ...prev,
    email: email,
    password: Password
  }));
  setIsLogin(true);
    
  }
  const {loading, error, data} = useFetchPost("http://localhost:8080/seeker/login",body,isLogin);
  useEffect(()=>{
    // console.log(body,loading);
    if(!loading )
      {
        if(data.name !== null)
        {
          dispatch(setUser(data));
          // console.log(data);
          toast.success(`Welcome ${data.name}`);
          navigate('/profile');
        }
        else if(error !== null ){
          console.log(error)
          toast.error("Invalid Email or Password");
        }
        
      }
      
  },[loading,body])
  return (
    <>
      <NavbarLogin/> 
      <p className='p1'>Log in to Seeker</p>      
      <div className='loginBox'>
        <div className='inputContainer'>
          <div>Email</div>
          <div className='inputWrapper'>
            <img src={User} alt="Username icon" style={{height:"30px"}} />
            <input type="text" name="email"  onChange={(event)=>{setEmail(event.target.value)}}/>
          </div>
        </div>
        <div className='inputContainer'>
          <div>Password</div>
          <div className='inputWrapper'>
            <img src={Lock} alt="Username icon" style={{height:"30px"}} />
            <input type="password" name="password" onChange={(event)=>{setPassword(event.target.value)}}/>
          </div>
        </div>
        <div className="loginButtonBox">
          <button onClick={onLogin}>Login</button>
          <div>Forgot Password?</div>
        </div>
        <div className="SignupButtonBox">
          <p>Don't have a Seeker Account?</p>
          <button onClick={()=>{navigate("/Signup")}}>Sign Up</button>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Login
