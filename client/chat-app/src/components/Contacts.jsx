import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Logo from "../assets/robot-hi.gif"
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/micah';
export default function Contacts({ contacts, currentUser,changeChat }) {
    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [avatars, setAvatars] = useState([])
    const [currentUserImage, setCurrentUserImage] = useState([])
    const [currentSelected, setCurrentSelected] = useState(undefined)
    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage)
            setCurrentUserName(currentUser.username)
            changeCurrentChat()

        }
    }, [currentUser])


    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index)
        changeChat(contact)
    }
    return (
        <>
            {currentUserImage && currentUserImage && (
                <Container>
                    <div className="brand">
                        <img src={Logo} alt="logo" />
                        <h3>Chat Room</h3>
                    </div>
                    <div className="contacts">
                        {contacts.map((contact, index) => {
                            return (
                                <div key={index}
                                    className={`contact ${currentSelected === index ? "selected" : ""}`} onClick={() => changeCurrentChat(index, contact)}>
                                    <div className="avatar">
                                        <img
                                            src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                            alt=""
                                        />
                                        
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="current-user">
                        <div className="avatar">
                            <img
                                src={`data:image/svg+xml;base64,${currentUserImage}`}
                                alt="avatar" width = "80px" height= "80px"
                            />
                        </div>
                        <h2>{currentUserName}</h2>
                    </div>
                </Container>
            )}
        </>
    );

}


const Container = styled.div`
display: grid;
grid-template-rows: 10% 70% 20%;
overflow:hidden;
background-color: #a1bdcf;
    .brand{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        img{
            height: 2rem;;
        }
        h3{
            color: white;
            text-transform: uppercase;
        }
    }
    .contacts{
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        &::-webkit-scrollbar{
            width: 0.1rem;
            &-thumb {
                background-color: #ffffff39;
            }
        }.selected{
        background-color: #6595a8;
    }
    }.contact{
        background-color: #ffffff;
        min-height: 5rem;
        width: 90%;
        cursor: pointer;
        border-radius: 0.2rem;
        padding: 0.3rem;

        align-items: center;
        display: flex;
        transition: 0.5s ease-in-out;
        .avatar{
            img{
                height: 4rem;
            }
        }
        h2{
            color: #ff0000;
        }

    }
    .current-user{
        background-color: #98c9a3;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

    }

`