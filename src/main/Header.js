import React, { useEffect, useState } from "react";
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import styles from '../App.module.css'
import {authService} from '../firebase/fBase.js'

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
    var userObj = JSON.parse(localStorage.getItem('user'));
    
    useEffect(()=>
    { console.log('값이 바뀜') }, 
    [userObj]);


    return(
        <div className={styles.sticky}>
        <Container>
            <Navbar bg="dark" variant="dark" style={{ height:"62px" }}>
                <Navbar.Brand href="/" >
                <img
                    alt="MOUM"
                    src="/logo.png"
                    height="50px"
                    className="d-inline-block align-top"
                />
                </Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="/chart">TOP 100</Nav.Link>
                <Nav.Link href="/write">Write</Nav.Link>
                </Nav>
                {
                    userObj != null
                    ? (<div className= "text-white">{userObj.user.displayName}님 환영합니다!  <Button onClick={() => { localStorage.removeItem('user'); window.location.href = "/";}}>로그아웃</Button> </div> )
                    :<Button className='primary' href={"/login"}>로그인</Button>

                }
                
            </Navbar>
        </Container>
        </div>
    )
}

