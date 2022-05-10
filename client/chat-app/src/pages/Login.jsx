import React, { useState,useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import { loginRoute } from '../utils/APIRoutes'
import { useNavigate } from 'react-router-dom'
import Robot from '../assets/robot-hi.gif'
const Login = () => {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        email: "",
        password: "",
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validateValue()) {
            const {email,password} = values
            const {data} = await axios.post(loginRoute,{
                email,password 
            })
            if(data.status === false){
                toast.error(data.msg)
            }
            if(data.status === true){
                localStorage.setItem("chat-app-user",JSON.stringify(data.user))
                navigate('/setAvatar')
            }
        }
    }
    const handleChange = (e) => {
        setValues({ ...values,[e.target.name]:e.target.value})
    }
    useEffect(() =>{
        if(localStorage.getItem('chat-app-user')){
            
        }
    },[])

    const validateValue = (e) => {
        const { email, password } = values
        if (email === "") {
            toast.error("Email and Password is required")
            return false
        } else if (password === "") {
            toast.error("Email and Password is required")
            return false
        }
        return true
    }
    return (
        <>
            <FormContainer>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className = "container">

                        <div className = "logo">
                            <img src = {Robot} alt = "logo" />
                        </div>
                        <div className="brand">
                            <h1>Login</h1>
                            <input type="email" placeholder="Email" name="email" onChange={(e) => handleChange(e)} />
                            <input type="password" placeholder="Passowrd" name="password" onChange={(e) => handleChange(e)} />
                            <button type="submit">Login</button>
                            <span>already have an account ?<Link to ="/register"> Register</Link></span>
                        </div>
                    </div>
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
    background-color: #bad1e0;
    .brand{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img{
            height: 1rem;
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
            color:#dd9292;
            text-decoration: none;
            font-weight: bold;
            border: none;
        }
    }.container{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-row: 1rem;
    }.logo img{
        width: 300px;
        height: 300px;
        padding-right: 4rem;
        border-radius: 10px 10px;
        border: none;
    }
`;
export default Login