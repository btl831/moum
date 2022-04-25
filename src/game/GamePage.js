import { Button } from 'react-bootstrap';

export default function GamePage() {
    return (
        <>
        <br/><br/>
        <h1>임시 게임 페이지입니다.</h1>
        <br/><br/><br/>
        <div>
            <Button onClick={() => {
                var userObj = JSON.parse(localStorage.getItem('user'));
                if(userObj) {
                    window.location.href='/game/wordle'
                }
                else {
                    alert("로그인이 필요한 작업입니다.");
                    window.location.href='/Login'
                }
            }}>
                Worlde
            </Button>
        </div>
        </>
    );
}