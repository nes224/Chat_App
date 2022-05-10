import React,{useState,useEffect, useCallback} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import { setAvatarRoute } from '../utils/APIRoutes'
import { useNavigate } from 'react-router-dom'
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/micah';
import { Buffer } from 'buffer'
const SetAvatar = () => {
    const navigate = useNavigate()
    const [avatars, setAvatars] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedAvatar, setSelectedAvatar] = useState(undefined)
    const setProfilePicture = async () => { 
        if(selectedAvatar === undefined){
            toast.error("Please select an avatar")
        }else{

            const user = await JSON.parse(localStorage.getItem("chat-app-user"))

            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
                image: avatars[selectedAvatar]
            })

            if(data.isSet){
                user.isAvatarImage = true
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user",JSON.stringify(user))
                navigate('/')
            }else{
                toast.error("Error setting avatar. Please try again")
            }
        }
    }

    const setAvatar = useCallback (async() => {
        const data = []
        const random = Math.floor(Math.random() * 10)
        const svg = createAvatar(style, {
            seed: `${random}`,
            // ... and other options
        });
        const buffer = new Buffer(svg)
        data.push(buffer.toString('base64'))
        //const base64 = `data:image/svg+xml;base64,${window.btoa(svg)}`;
        setAvatars(data)

    })

    useEffect(() => {

        setAvatar()
    }, [])

    useEffect(()=>{
        if(!localStorage.getItem("chat-app-user")){
            navigate("/login")
        }
    })
    return (
        <>
            <Container>
                <div className = "container">
                    <div className="title-container">
                        <h1>Pick an avatar as your profile picture</h1>
                    </div>
                    <div className="avatars">
                        {
                            avatars.map((avatar, index) => {
                                return (
                                    <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                                        <img src={`data:image/svg+xml;base64,${avatar}`} onClick={() => setSelectedAvatar(index)} width="100px" height="100px" />
                                        
                                    </div>
                                )
                            })
                        }
                    </div>
                    {selectedAvatar === undefined ? <button  className = "submit-btn" onClick = {setAvatar} >Random</button> : 
                                        <button className = "submit-btn" onClick = {setProfilePicture}>Set as Profile</button>}

                </div>
            </Container>
            <ToastContainer />
        </>
    )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap:3rem;
background: #a7cff0;  /* fallback for old browsers */


height: 100vh;
width: 100vw;
.container{
    display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        background-color: #041b2e76;
        border-radius: 2rem;
        padding: 3rem 5rem;
}
.loader{
    max-inline-size: 100;
}
.title-container h1{
    color:white;

}
.avatars{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    .avatar{
        border: 0.4rem solid transparent;
        padding: 0.4rem;
        border-radius: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: .5s ease-in-out;
        img{
            height: 6rem;
        }
    }button{
        margin-left: 50px;
        padding: 10px 20px;
        cursor: pointer;
        transition: .5s;
        font-size: 1rem;
        border: none;
        font-weight: bold;

    }button:hover{
        color: #59c270;
        background-color: #3781c7;
    }.selected{
        padding: 20px;
        border: 0.5rem solid #89d180;
    }
}
.submit-btn{
        background-color: #549ff5;
        color:white;
        padding: 0.5rem 1rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: .5s;
    }button:hover{
        background-color: #6daf6d;
}

`

export default SetAvatar