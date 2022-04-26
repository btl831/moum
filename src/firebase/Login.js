import React, { useState } from 'react';
import { Button, Container,Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

import { authService,firebaseInstance,db } from './fBase';
import NaverLogin from './NaverLogin';

// 로그인 컴포넌트 작성
const Login = () => {
    var navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(false);	// 로그인으로 먼저 들어올꺼니깐(초기 False)
    const [displayName,setdisplayName]  = useState('');
    
    // 구글버튼 클릭 함수
    const onGoogleClick = async (event) => {
        const {target: {name}} = event;
        let provider;
        if (name === 'google') {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
        localStorage.setItem('user',JSON.stringify(data));
        navigate(-1);
    }

    // 바뀌는 것에 대한 메소드
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if (name === 'email') {
            setEmail(value)
        }
        else if (name === "password") {
            setPassword(value);
        }
        else if (name === "displayName") {
            setdisplayName(value)
        }
    }

    // 로그인 및 생성
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if (newAccount) {
                // create account
                await authService.createUserWithEmailAndPassword(email, password).then(result =>{
                    // store 저장
                    var userprofile = {
                        displayName : displayName,
                        email : email
                    }

                    db.collection('user').doc(result.user.uid).set(userprofile);
                    result.user.updateProfile({
                        displayName : displayName
                    });
                    alert("가입이 성공적으로 되었습니다. 로그인 버튼을 누르고 진행해주세요.");
                }).catch(err=>{
                    console.error(err);
                    alert("로그인이 되지않았습니다. 다시 시도해주세요.");
                })
            } else {
                // login
                await authService.signInWithEmailAndPassword(email, password).then((result)=>{
                    console.log(result.user)
                    localStorage.setItem('user',JSON.stringify(result.user));
                    navigate(-1);
                });
                
            }
            
        } catch(error) {
        console.log(error)
        }
    }

    // 바꿔주는 메소드
    const toggleAccount = () => setNewAccount((prev) => !prev);

    return (
        <>
        <Container className='full'>
            <form onSubmit={onSubmit}>
                <Form.Label>ID</Form.Label>
                <Form.Control
                    name="email" 
                    type="email"
                    placeholder="Email" 
                    required value={email} 
                    onChange={onChange}
                />
                <br/>

                {/* 패스워드 */}
                <Form.Label>Password</Form.Label>
                <Form.Control
                    name="password"
                    type="password"
                    placeholder="password"
                    aria-describedby="passwordHelpBlock"
                    required value={password} 
                    onChange={onChange}
                />
                <Form.Text id="passwordHelpBlock" muted>
                    Your password must be 8-20 characters long, contain letters and numbers, and
                    must not contain spaces, special characters, or emoji.
                </Form.Text>
                {
                    newAccount
                    ? <Form.Control
                        name="displayName" 
                        type="displayName"
                        placeholder="displayName" 
                        required
                        onChange={onChange}
                    />
                    :
                    null
                }

                <input type="submit" value={ newAccount ? "Create Account" : "Login" } />
                <hr/>
            </form>

            {/* 버튼을 클릭하면 변경과 로그인 가입을 바꿔줌 */}
            <Button variant="secondary" onClick={toggleAccount}> {newAccount ? "Login" : "Create Account"} </Button>
            <Button  variant="primary" name="google" onClick={onGoogleClick}>구글 계정으로 로그인</Button>
            <NaverLogin />
        </Container>
        </>
    )
}

export default Login;