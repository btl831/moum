// App.js
import React, { useState } from 'react';
import { authService,firebaseInstance } from './fBase';
import { Button, Container,Form } from 'react-bootstrap'

// 로그인 컴포넌트 작성
const Login = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [newAccount, setNewAccount] = useState(true);	// 새로운 유저인지 확인(초기값: true)

// 구글버튼 클릭 함수
const onGoogleClick = async (event) => {
    const {target: {name}} = event;

    let provider;
    if (name === 'google') {
    provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
}

// 바뀌는 것에 대한 메소드
const onChange = (event) => {
    const {target: {name, value}} = event;
    if (name==='email') {
    setEmail(value)
    } else if (name=== "password") {
    setPassword(value);
    }
}

// 등록하는 메소드
const onSubmit = async (event) => {
    event.preventDefault();
    try {
    let data;
    if (newAccount) {
        // create account
        data = await authService.createUserWithEmailAndPassword(email, password);
    } else {
        // login
        data = await authService.signInWithEmailAndPassword(email, password);
    }
    console.log(data);
    } catch(error) {
    console.log(error)
    }
}

// 바꿔주는 메소드
const toggleAccount = () => setNewAccount((prev) => !prev);

return (
    <>
    <Container>
    
    <head>
    
    // bootstrap css cdn
        <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
    crossorigin="anonymous"
    />
    </head>

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