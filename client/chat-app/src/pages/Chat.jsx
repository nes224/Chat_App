import React,{useState,useEffect, useRef} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {allUsersRoute} from '../utils/APIRoutes'
import Contacts from '../components/Contacts'
import Welcomes from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
import {io} from 'socket.io-client'
import { host } from '../utils/APIRoutes'
const Chat = () =>{
    const socket = useRef()
    const navigate = useNavigate()
    const [contacts,setContacts] = useState([])
    const [currentUser,setCurrentUser] = useState(undefined)
    const [currentChat,setCurrentChat] = useState(undefined)
    const getUsers = async () =>{
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
    }
    const getUser = async()=>{
        const {data} = await axios.get(`${allUsersRoute}/${currentUser._id}`)

        setContacts(data.data)
    }
    
    useEffect(()=>{
        if(!localStorage.getItem("chat-app-user")){
            navigate("/login")
        }else{
            getUsers()
        }
    },[])
    useEffect(()=>{
        if(currentUser){
            if(currentUser.isAvatarImage){
                getUser()
            }else{
                navigate('/setAvatar')
            }
        }
    },[currentUser])
    useEffect(() =>{
        if(currentUser){
            socket.current = io(host)
            //privide the current user id we'll pass the current user id 
            //whenever the current user is logged in will add to the global map 
            socket.current.emit("add-user",currentUser._id)
        }
    },[currentUser])

    useEffect(()=>{
        handleChatChange()
    },[])

    const handleChatChange = (chat) =>{
        setCurrentChat(chat)
    }
    return(

            <Container >
                <div className = "container">
                    <Contacts contacts = {contacts} currentUser = {currentUser} changeChat = {handleChatChange}/>
                    {
                        currentChat === undefined ? <Welcomes currentUser = {currentUser} /> 
                        :<ChatContainer currentChat = {currentChat}  currentUser = {currentUser} socket = {socket}/>
                    }

                </div>
            </Container>

    )
}

const Container = styled.div `
    height:100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #92b3c7;
    .container{
        height: 100%;
        width: 100%;
        background-color: #8ed4fd76;
        display: grid;
        grid-template-columns: 25% 75%;

        @media screen and (min-width: 720px) and (max-width: 1080px){
            grid-template-columns: 35% 65%;
        }
    }
`

export default Chat