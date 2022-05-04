import React from "react";
import { Button, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css'

export default function Header() {
    var userObj = JSON.parse(localStorage.getItem('user'));
    var navigate = useNavigate();

    if(window.location.pathname === "/") return null;
    return(
        <>
            <div className={styles.static}>
                <div className="row">
                    <Navbar bg="dark" variant="dark" style={{ height:"70px" }}>
                        <div className="col-sm-1 col-md-1" />
                        <div className="col-sm-6 col-md-6">
                            <div style={{float:"left"}}>
                                <Navbar.Brand href="/" >
                                    <img
                                        alt="MOUM"
                                        src="/logo.png"
                                        height="50px"
                                        className="d-inline-block align-top"
                                    />
                                </Navbar.Brand>
                            </div>
                            <div style={{marginTop:"4px"}}>
                                <Nav className="me-auto">
                                    <Nav.Link href="/music">Music</Nav.Link>
                                    <Nav.Link href="/game">Game</Nav.Link>
                                    {
                                        userObj != null
                                        ? <Nav.Link href="/music/chatroom">채팅방</Nav.Link>
                                        : null
                                    }
                                </Nav>
                            </div>
                        </div>
                        <div className="col-sm-4 col-md-4">
                            <div style={{float:"right"}}>
                                {
                                    userObj != null
                                    ?<div className= "text-white">{userObj.displayName}님 환영합니다!   <Button onClick={() => {localStorage.removeItem('user'); navigate(0);}}>로그아웃</Button></div>
                                    :<Button className='primary' href={"/login"}>로그인</Button>
                                }
                            </div>
                        </div>
                        <div className="col-sm-1 col-md-1" />
                    </Navbar>
                </div>
            </div>

            {/*
            <div className={styles.fixed}>
                <div className="row">
                    <Navbar style={{ height:"70px" }}>
                        <div className="col-md-1" />
                        <div className="col-md-3">
                            <div style={{float:"left"}}>
                                <Navbar.Brand href="/" >
                                    <img
                                        alt="MOUM"
                                        src="/logo.png"
                                        height="50px"
                                        className="d-inline-block align-top"
                                    />
                                </Navbar.Brand>
                            </div>
                            <div style={{marginTop:"4px"}}>
                                <Nav className="me-auto">
                                    <Nav.Link href="/music">Music</Nav.Link>
                                    <Nav.Link href="/game">Game</Nav.Link>
                                    {
                                        userObj != null
                                        ? <Nav.Link href="/music/chatroom">채팅방</Nav.Link>
                                        : null
                                    }
                                </Nav>
                            </div>
                        </div>
                        <div className="col-md-8" />
                    </Navbar>
                </div>
            </div>
            */}
        </>
    )
}

