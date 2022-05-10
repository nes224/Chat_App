import React,{useState,useEffect,useRef} from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput'
import Logout from './Logout'
import axios from 'axios'
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes'
import {v4 as uuidv4} from 'uuid'


const ChatContainer = ({ currentChat,currentUser,socket }) => {
    const [messages,setMessages] = useState([])
    const [changeMessage, setChangeMessage] = useState()
    const [arrival,setArrival] = useState(null)
    const scrollRef = useRef()
    const response = async() =>{
        const response = await axios.post(getAllMessagesRoute,{
            from: currentUser._id,
            to:currentChat._id
        })
        setMessages(response.data)

    }

    const handleSendMsg = async (msg) =>{

        const sendMessage = await axios.post(sendMessageRoute,{
            from:currentUser._id,
            to: currentChat._id,
            message:msg
        })
        //whenever we send the message 
        //emit an  event which is socket.current.emit
        const messageSend = {
            from:currentUser._id,
            to:currentChat._id,
            message:msg,
        }
        await socket.current.emit("send-msg",messageSend)
        const msgs = [...messages]
        msgs.push({fromSelf:true,message:msg})
        setMessages(msgs)

    }

    useEffect(() =>{
        if(socket.current){
            socket.current.on("msg-receive",(msg)=>{
                setArrival({fromSelf:false,message:msg})
            })
        }
    },[socket.current])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({
            behavious:"smooth"
        })
    },[messages])

    useEffect(()=>{
        response()

    },[])

    useEffect(()=>{
        {arrival && setMessages((prve) => [...prve,arrival])}
    },[arrival])

    useEffect(()=>{
        if(currentChat){
            setChangeMessage(currentChat)
        }
    },[changeMessage])
    return (
        <Container>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        <img
                            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                            alt="avatar" width="100px" height="100px"
                        />
                    </div>
                    <div className="username">
                        <h3>{currentChat.username}</h3>
                    </div>

                </div>
                <Logout />
            </div>
            <div className = "chat-messages">
                { changeMessage &&
                    messages.map((message,index)=>{
                        return(
                            <div ref = {scrollRef} key={index}>
                                <div className = {`message ${message.fromSelf ? "sended":"received"}`}>
                                    <div className = "content">
                                        <p>
                                            {message.message}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        )
                    })
                    }
            </div>
            <ChatInput handleSendMsg = {handleSendMsg} />
        </Container>
    )
}
const Container = styled.div `
padding-top: 1rem;
padding-left: 1rem;
display: grid;
grid-template-rows: 10% 79% 11%;
gap: 0.1rem;
.chat-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5 2rem;
    margin-right: 50px;
    .user-details{
        display: flex;
        align-items: center;
        gap: 1rem;
        .avatar{
            img{
                height: 5rem;
            }
        }
        .username{
            h3{
                color:#ffffff;
            }
        }
    }
}
.chat-messages{
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow: auto;
    height: 30vw;
    background-color: #b9d9e9;
    border-radius: 0.5rem;
    margin-right: 3%;
    margin-left: 3%;
    margin-bottom: 2%;
    padding-top: 10%;
    .message{
        display: flex;
        align-items: center;
        
        .content{
            max-width: 40%;

            overflow-wrap: break-word;
            padding: 0.2rem;
            font-size: 1rem;
            border-radius: 1rem;
            color: #000000;
        }
    }
    .sended{
        justify-content: flex-end;
        .content{
            background-color: #4f04ff21;
        }
    }.received{
        justify-content: flex-start;
        .content{
            background-color: #9900ff20;
        }
    }
}
`
export default ChatContainer 