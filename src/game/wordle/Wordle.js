import React, { useState } from 'react';
import {Button} from 'react-bootstrap';
import {db} from 'firebase/fBase'
import './Wordle.css'

import { faRankingStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Wordle() {
    var answer = 'abcde'; //5글자 단어 준비하는법 생각, 쓰는 단어만 써야하는걸 생각
    var count = 0
    let [failed, setFailed] = useState(0);
    var useranswer = ""
    var displayName = JSON.parse(localStorage.getItem('user')).displayName;

    const updateGrade = async(event) =>{
        // 정보입력
        var data = {
            uid : JSON.parse(localStorage.getItem('user')).uid,
            displayName : displayName,
            score : count + 1,
            date: new Date(),
        }

        db.collection('wordle').add(data).then(()=>{
            }).catch((error)=>{
            console.log(error)
        })  
    }

    function matchWord() {
        var input = document.querySelectorAll('#input');
        // 문자열 비교
        for (let i = 5 * count; i < 5 * (count + 1); i++) {
            // 자리가 맞았을때
            if (input[i].value === answer[i]) {
                input[i].style.background = 'green';
            }
            // 속한 문자가 맞았을때
            else if (answer.includes(input[i].value)) {
                input[i].style.background = 'yellow';
            }
            // 아무것도 아닐때.
            else {
                input[i].style.background = 'lightgrey';
            }
            useranswer += input[i].value;
        }
        // 틀렸을 경우 그 다음 기회
        if (useranswer !== answer) {
            count += 1;
            if (count < 5) {
                for (let i = 5 * count; i < 5 * (count + 1); i++) {
                    input[i].disabled = false;
                }
                useranswer = ""
            }
            if (count === 5) {
                alert(displayName+"님 성공하지 못했어요! 내일 하세요.");
                already();
            }
        }
        // 맞았을 경우 그다음 기회를 주지 않고 축하해준다.
        else {
            alert("축하해요! 맞았습니다!")
            already();
            updateGrade();
        }
    }
    
    // 버튼 지우기
    const already = () =>{
        setFailed(1);
    }
    const input_tag = () => {
        const result = [];
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                count += 1;
                if (i === 0) {
                    result.push(<input className={'input' + i} id='input' />);
                }
                else {
                    result.push(<input className={'input' + i} id='input' disabled />);
                }
            }
            result.push(<br />)
        }
        return result
    };
    return (
        <>
            <div>
                <FontAwesomeIcon icon={faRankingStar} size={"2x"} className="fa"/>
                <Button variant="light outline-secondary" onClick={()=>window.location.href='/game/wordle/ranking'}>랭킹보기</Button>
            </div>
            <div className='main_wordle'>
                {input_tag()}
            </div>
            {
                failed === 0
                    ? <Button onClick={matchWord} className="button_position" variant ="info">제출</Button>
                    : null
            }
        </>
    )
}
