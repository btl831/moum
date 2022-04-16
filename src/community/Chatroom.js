import React, { Component, useEffect, useState } from 'react';
import "./Chatroom.css";
import { db } from '../firebase/fBase';
import $ from 'jquery';

export default function Chatroom() {
    var myuid = JSON.parse(localStorage.getItem('user')).uid;
    var [chatlst,setchatlst] = useState([]);
    let [inputValue,setInputValue] = useState();
    let [chatid,setChatId]= useState("");

    useEffect(() => {
        db.collection('chatroom').where('who', 'array-contains', myuid).get().then((result) => {
            var array = [];
            result.forEach((doc) => {
                array.push(doc);
                // let tagArea = document.getElementsByClassName('chat-list')[0];
                // let new_Tag = document.createElement('li');
                // new_Tag.setAttribute('class','list-group-item');
                // new_Tag.setAttribute('id','msg');
                // new_Tag.innerHTML = '<h6 className = "chat-lst">'+doc.data().title+'</h6> <h6 class="text-small" id ="doc_id">'+doc.id+'</h6>';
                // tagArea.appendChild(new_Tag);
                // let element = document.getElementById('msg');  
                // element.addEventListener('click', read_msg);
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
        setChatId($(this).children('.text-small').text());
        console.log(chatid);
        // event bubbling 방지하는 함수
        event.preventDefault();
        
        // 채팅방을 누르면 안에 message 항목들 가져오기
        // DB 실시간 변동사항 반영하기 (onSnapshot) + orderBy()정렬
        // onSnapshot 이미 읽었던 document 는 과금이 없다.
        db.collection('chatroom').doc(chatid).collection('messages').orderBy('date').onSnapshot((result)=>{
            // html 비우기
            
            document.getElementsByClassName('chat-content')[0].innerHTML= " ";
            result.forEach((a)=>{
                // 두번 출력됨(event bubbling 때문에)
                console.log(a.data());
                if(a.data().uid == myuid){
                    let tagArea = document.getElementsByClassName('chat-content')[0];
                    let new_Tag = document.createElement('li');
                    new_Tag.innerHTML = '<span class="chat-box mine">'+a.data().content+'</span>';
                    tagArea.appendChild(new_Tag);
                }
                else{
                    let tagArea = document.getElementsByClassName('chat-content')[0];
                    let new_Tag = document.createElement('li');
                    new_Tag.innerHTML = '<span class="chat-box">'+a.data().content+'</span>';
                    tagArea.appendChild(new_Tag);
                }
                

            })

        })
    }

    // 채팅 보내는 법
    const send_msg = async (event) => {
        // 서브컬렉션으로 채팅방 채팅 기록하기
        var 데이터 = {
            content : inputValue ,
            date : new Date(),
            uid : myuid
        }
        // 서브 컬렉션에 넣는 방법
        db.collection('chatroom').doc(chatid).collection('messages').add(데이터);

        let tagArea = document.getElementsByClassName('chat-content')[0];
        let new_Tag = document.createElement('li');
        new_Tag.innerHTML = '<span class="chat-box mine">'+inputValue+'</span>';
        tagArea.appendChild(new_Tag);

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
                                chatlst.map((a,i)=>{
                                    return(
                                    <>
                                    <li class="list-group-item">
                                    <h6>{a.data().title}</h6>
                                    <h6 class="text-small">{a.id}</h6>
                                    </li>
                                    </>
                                    )
                                })
                            }


                        </ul>
                    </div>
                    <div className="col-9 p-0">
                        <div className="chat-room">
                            <ul className="list-group chat-content">
                                
                            </ul>
                            <div className="input-group">
                                <input className="form-control" id="chat-input" onChange={(event) => setInputValue(event.target.value)} />
                                <button className="btn btn-secondary" id="send" onClick={send_msg}>전송</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={read_msg}>확인용</button>
            </div>
        </>
    )
}
