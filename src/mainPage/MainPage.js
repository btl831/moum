import React from 'react';
import { Button } from 'react-bootstrap';
export default function MainPage() {
    return (
        <>
        <br/><br/>
        <h1>임시 대문 페이지입니다.</h1>
        <br/><br/><br/>
        <div>
            <Button onClick={()=>window.location.href='/music'}>음악페이지로!</Button>&nbsp;&nbsp;&nbsp;
            <Button onClick={()=>window.location.href='/game/wordle'}>게임페이지로!</Button>
        </div>
        </>
    );
}