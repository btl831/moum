// App.js
import React, { useState } from 'react';
import { authService,firebaseInstance } from './fBase';
import { Button, Container,Form } from 'react-bootstrap'

// 로그인 컴포넌트 작성
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);	// 새로운 유저인지 확인(초기값: true)
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
        window.location.href = "/";
    }

    // 바뀌는 것에 대한 메소드
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if (name==='email') {
            setEmail(value)
        }
        else if (name=== "password") {
            setPassword(value);
        }
        else if (name == "displayName"){
            setdisplayName(value)
        }
    }

    // 로그인 및 생성
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                // create account
                data = await authService.createUserWithEmailAndPassword(email, password).then(result =>{
                    result.user.updateProfile({
                        displayName : displayName
                    });
                }).catch(err=>{
                    console.error(err);
                })
            } else {
                // login
                data = await authService.signInWithEmailAndPassword(email, password);
                localStorage.setItem('user',JSON.stringify(data));
                window.location.href = "/";
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
        </Container>
        </>
    )
}

export default Login;