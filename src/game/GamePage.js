import { Button } from 'react-bootstrap';

export default function GamePage() {
    return (
        <>
        <br/><br/>
        <h1>임시 게임 페이지입니다.</h1>
        <br/><br/><br/>
        <div>
            <Button onClick={()=>window.location.href='/game/wordle'}>Worlde</Button>
        </div>
        </>
    );
}