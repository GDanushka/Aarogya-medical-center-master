import React , { useState,useContext }  from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../src/security/AuthProvider';
import Axios from 'axios'
import { toast } from 'react-toastify';
import { Footer } from "./Footer";

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const { login = () => {} } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
      Axios.post('http://localhost:3001/login', {
      username: username,
      password: password,
     
    })
    .then((response) => {
      if (response.data.success) {
        login(response.data.username);
        console.log(response.status);
      toast.success('Login Successfull', {autoClose: 2000})
      setTimeout(() => {
        navigate("/layout/dashbord");
      }, 2000);
        
      } else {
        setErrorMessage("Incorrect username or password. Please try again.");
        toast.error('Incorrect username or password. Please try again.');
      }
  } ) 
  };

 

  return (
    <>
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <div className="border w-[350px] h-auto p-5 border-slate-900">
        <h1 className="flex w-[100] justify-center items-center mb-5 font-bold uppercase text-[25px]">Arogya Login</h1>
        <div className="flex flex-col mb-5">
          <label className="mb-2">User Name</label>
          <input type="text" className="border bg-gray-100 outline-none h-[35px] rounded-md" onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="flex flex-col mb-5">
          <label className="mb-2">Password</label>
          <input type="password" className="border bg-gray-100 outline-none h-[35px] rounded-md" onChange={(e) => setPassword(e.target.value)} />
        </div>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        <button className="bg-cyan-900 w-[100%] h-[35px] text-white rounded-md font-semibold mt-5" onClick={handleLogin}>Login</button>
      </div>
      <Footer/>
    </div>
    
    </>
  );
}
