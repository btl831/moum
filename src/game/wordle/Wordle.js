import React, { useState } from 'react';
import './Wordle.css'

export default function Wordle() {
    var answer = 'abcde'; //5글자 단어 준비하는법 생각, 쓰는 단어만 써야하는걸 생각
    var count = 0
    let [failed, setFailed] = useState(0);
    function matchWord() {
        {

            var input = document.querySelectorAll('#input');
            // 문자열 비교
            for (let i = 5 * count; i < 5 * (count + 1); i++) {
                // 자리가 맞았을때
                if (input[i].value == answer[i]) {
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
            }
            // 틀렸을 경우 그 다음 기회
            if (input.value != answer) {
                count += 1;
                if (count < 5) {
                    for (let i = 5 * count; i < 5 * (count + 1); i++) {
                        input[i].disabled = false;
                    }
                }
                if (count == 5) {
                    alert("오늘은 성공하지 못했어요! 내일 하세요.")
                    setFailed(1)
                }

            }
            // 맞았을 경우 그다음 기회를 주지 않고 축하해준다.
            else {
                alert("축하해요! 맞았습니다!")
            }

        }
    }

    const input_tag = () => {
        const result = [];
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (i == 0) {
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
            <div className='main_wordle'>
                {input_tag()}
            </div>
            {
                failed == 0
                    ? <button onClick={matchWord} className="button_position">제출</button>
                    : null
            }

        </>
    )
}
