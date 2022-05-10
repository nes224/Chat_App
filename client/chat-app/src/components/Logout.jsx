import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import {BiPowerOff} from 'react-icons/bi'
const Logout = () =>{
    const navigate = useNavigate()
    const handleClick = async() =>{
        localStorage.clear()
        navigate("/login")
    }
    return(
        <Button onClick = {handleClick}>
            <BiPowerOff />
        </Button>
    )
}

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 0.5rem;
    border: none;
    background-color: black;
    cursor: pointer;
    svg{
        font-size: 1.3rem;
        color:#00b7ff;
    }
`

export default Logout