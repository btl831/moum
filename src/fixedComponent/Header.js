import React from "react";
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css'

export default function Header() {
    var userObj = JSON.parse(localStorage.getItem('user'));
    var navigate = useNavigate();

    if(window.location.pathname === "/") return null;
    return(
        <div className={styles.static}>
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
                    <Nav.Link href="/music">Music</Nav.Link>
                    <Nav.Link href="/game">Game</Nav.Link>
                    {
                        userObj != null
                        ? ( <>
                        <Nav.Link href="/music/chatroom">채팅방</Nav.Link>
                        </>
                        )
                        : null
                    }
                </Nav>
                {
                    userObj != null
                    ? (<div className= "text-white">{userObj.displayName}님 환영합니다!   <Button onClick={() => { localStorage.removeItem('user'); navigate(0);}}>로그아웃</Button> </div> )
                    :<Button className='primary' href={"/login"}>로그인</Button>
                }
            </Navbar>
        </Container>
        </div>
    )
}

