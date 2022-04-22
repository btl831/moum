import React, { Component, useEffect, useState } from 'react';
import "./Chatroom.css";
import { db } from 'firebase/fBase';

export default function Chatroom() {
    var myuid = JSON.parse(localStorage.getItem('user')).uid;
    console.log(myuid)
    var [chatlst, setchatlst] = useState([]);
    let [inputValue, setInputValue] = useState();
    let [chatid, setChatId] = useState("");
    let [message, setMessage] = useState([]);

    useEffect(() => {
        db.collection('chatroom').where('who', 'array-contains', myuid).get().then((result) => {
            var array = [];
            result.forEach((doc) => {
                array.push(doc);
            });
            setchatlst(array);
            console.log(array);
        })
    }, [chatlst.value]);


    // document.getElementsByClassName('list-group-item').onClick
    //     chatid = this.document.getElementsByClassName('text-small');
    //     read_msg();
    // })
    // 채팅 읽어오는 법
    const read_msg = async (event) => {

        console.log(chatid);
        // event bubbling 방지하는 함수
        // event.preventDefault();

        // 채팅방을 누르면 안에 message 항목들 가져오기
        // DB 실시간 변동사항 반영하기 (onSnapshot) + orderBy()정렬
        // onSnapshot 이미 읽었던 document 는 과금이 없다.
        db.collection('chatroom').doc(chatid).collection('messages').orderBy('date').onSnapshot((result) => {
            var array = [];
            result.forEach((a) => {
                // 두번 출력됨(event bubbling 때문에)
                console.log(a.data());

                array.push(a.data());
            })
            setMessage(array);
            console.log(message);
        })
    }
    useEffect(() => {
        console.log(read_msg);
    }, [read_msg]);

    // 채팅 보내는 법
    const send_msg = async (event) => {
        event.preventDefault();
        // 서브컬렉션으로 채팅방 채팅 기록하기
        var 데이터 = {
            content: inputValue,
            date: new Date(),
            uid: myuid
        }
        // 서브 컬렉션에 넣는 방법
        db.collection('chatroom').doc(chatid).collection('messages').add(데이터);
        document.getElementById('chat-input').value = null;
    }

    return (
        <>
            <div className="container p-4 detail">
                <div className="row">
                    <div className="col-3 p-0">
                        {/* 채팅 목록 */}
                        <ul className="list-group chat-list">
                            {
                                chatlst.map((a, i) => {
                                    return (
                                        <>
                                            <li className="list-group-item mt-3 ml-3" onClick={(event) => { read_msg(); setChatId(a.id) }}>
                                                <h6>{a.data().title}</h6>
                                                <h6 class="text-small" >{a.id}</h6>
                                            </li>
                                        </>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-9 p-0">
                        <div className="chat-room">
                            {/* 채팅창 */}
                            <ul className="list-group chat-content">
                                {
                                    message.map((a, i) => {
                                        if (a.uid == myuid) {
                                            return (
                                                <li><span class="chat-box mine">{a.content}</span></li>
                                            )
                                        }
                                        else {
                                            return (
                                                <li><span class="chat-box">{a.content}</span></li>
                                            )
                                        }
                                    })
                                }
                            </ul>
                            <div className="input-group">
                                <input className="form-control" id="chat-input" onChange={(event) => (event.preventDefault(), setInputValue(event.target.value))} />
                                <button className="btn btn-secondary" id="send" onClick={send_msg}>전송</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
