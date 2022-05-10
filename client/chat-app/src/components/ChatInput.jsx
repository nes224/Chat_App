import React,{useState} from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'
const ChatInput = ({handleSendMsg}) =>{
    const [showEmojiPicker,setShowEmojiPicker] = useState(false)
    const [msg,setMsg] = useState("")
    const handleEmojiPickerHideShow = () =>{
        setShowEmojiPicker(!showEmojiPicker)
    }
    const handleEmojiClick = (event,emoji) =>{
        let message = msg ;
        message += emoji.emoji 
        setMsg(message)

    }

    const sendChat = (event) =>{
        event.preventDefault()
        if(msg.length > 0){
            handleSendMsg(msg)
            setMsg(' ')
        }
    }

    return(
        <Container>
            <div className = "button-container">
                <div className = "emoji">
                    <BsEmojiSmileFill onClick = {handleEmojiPickerHideShow}/>
                    {
                        showEmojiPicker && <Picker onEmojiClick = {handleEmojiClick}/>
                    }
                </div>
            </div>
            <form className = "input-container" onSubmit = {(e) => sendChat(e)}>
                <textarea type = "text" placeholder = "type your message here..." value = {msg} onChange = {(e) => setMsg(e.target.value)}/>
                <button className = "submit">
                    <IoMdSend />
                </button>
            </form>
        </Container>
    )
}

const Container = styled.div`
display: grid ;
grid-template-columns: 5% 95%;
align-items: center;
padding:0 1rem;

background-color: #8fc1e0;
.button-container{
    display: flex;
    height: 100%;
    align-items: center;
    color: #eed276;
    gap: 1rem;
    .emoji{
        position: relative;

        svg{
            font-size: 1.5rem;
            color:#ffff42c7;
            cursor: pointer;

        }
        .emoji-picker-react{
            position: absolute;
            top: -350px;
            background-color: #eed276;
            box-shadow:0 5px 10px #9a86f3
        }
    }

}
.input-container{
    width: 90%;
    border-radius: 2rem;
    display: flex;
    gap:2rem;
    background-color: #bee2cc;
    textarea{
        display: flex;
        padding-top: 1rem;
        width: 90%;
        height: 20%;
        background-color: transparent;
        color: #000000;
        border: none;
        padding-left: 1.5rem;
        font-size: 1rem;
        resize: none;
        &::selection{
            background-color: #92c79a;
        }
        &:focus{
            outline:none;
        }
    }
    button{
        padding: 0.3rem 2rem;
        border-radius: 0 1rem 1rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ae76db;
        border: none;
        svg{
            font-size: 2rem;
            color: white;
        }
    }
}
`

export default ChatInput 