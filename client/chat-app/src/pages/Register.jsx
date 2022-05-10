import React,{useState} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import { ToastContainer,toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import { registerRoute } from '../utils/APIRoutes'
import { useNavigate } from 'react-router-dom'
const Register = () =>{
    const navigate = useNavigate()
    const [values,setValues] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword: "",
    })
    const handleSubmit = async(event) =>{
        event.preventDefault()
        if(handleValidate()){
            const {username,email,password} = values
            const  {data} = await axios.post(registerRoute,{
                username,
                email,
                password
            })
            if(data.status === false){
                toast.error(data.msg,toastOptions)
            }
            if(data.status === true){
                localStorage.setItem("chat-app-user",JSON.stringify(data.user))
                toast.success(data.msg)
                navigate("/login")
            }
            
        }
    }
    const handleChange = (e) =>{
        setValues({...values,[e.target.name]:e.target.value})
    }
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable:true,

    }
    const handleValidate = () =>{
        const {username,email,password,confirmPassword} = values 

        if(password!==confirmPassword){
            toast.error("Password and confirm password should be same.",toastOptions)
            return false
        }else if(username.length <3){
            toast.error("Username should be greater than 3 characters",toastOptions)
            return false
        }else if(email === " "){
            toast.error("email is required",toastOptions)
            return false
        }else if(password.length <3){
            toast.error("Password should be equal or greater than 8 characters",toastOptions)
            return false
        }
        return true
    }

    return(
        <>
            <FormContainer>
                <form onSubmit= {(event)=>handleSubmit(event)}>
                    <div className = "brand">

                        <h1>Register</h1>
                    </div>
                    <input type = "text" placeholder = "Username" name = "username" onChange = {(e)=>handleChange(e)} />
                    <input type = "email" placeholder = "Email" name = "email" onChange = {(e)=>handleChange(e)} />
                    <input type = "password" placeholder = "Password" name = "password" onChange = {(e)=>handleChange(e)} />
                    <input type = "password" placeholder = "Confirm Password" name = "confirmPassword" onChange = {(e)=>handleChange(e)} />
                    <button type = "submit">Create User</button>
                    <span>already have an account ?<Link to ="/login"> Login</Link></span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #53a7df;
    .brand{
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img{
            height: 5rem;
        }h1{
            color:#ffffff;
            text-transform: uppercase;
        }
    }form{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        background-color: #041b2e76;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input{
            background-color: transparent;
            padding: 1rem;
            border: .1rem solid #83b7e7;
            color: #ffffff;
            border-radius: 0.4rem;
            width: 100%;
            font-size: 1rem;
        }&:focus{
            border: 0.1rem solid #997af0;
            outline:none;
        }
    }
    button{
        background-color: #549ff5;
        color:white;
        padding: 1rem 6rem;
        width: 100%;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: .5s;
    }button:hover{
        background-color: #6daf6d;
    button:active{
        transform: translateY(2px);
    }
    }span{
        color:white;
        text-transform: uppercase;
        a{
            color:#ff0000;
            text-decoration: none;
            font-weight: bold;
            border: none;
        }
    }
`;
export default Register