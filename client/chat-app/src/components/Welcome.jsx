import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Logo from '../assets/robot-hi.gif'
export default function Welcomes({currentUser}) {
    const [users,setUsers] = useState(undefined)
    useEffect(()=>{
        if(currentUser){
            setUsers(currentUser)
        }
    },[currentUser])

    return (
        <>
            { users &&
                <Container >
                    <div className="Container" >
                        <img src={Logo} alt="Robot" />
                        <div className = "bottom-left">
                            <h1>
                                Welcome, <span>{users.username}?</span>
                            </h1>
                            <h3>Please select a chat to Start Messaging!</h3>
                        </div>
                    </div>
                </Container>
            }
        </>
    )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
.Container{
    position: relative;
}
.bottom-left{
    position: absolute;
    bottom: 8px;
    left: 16px;
}
span{
    text-transform: uppercase;
}
`