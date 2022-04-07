import React, { useEffect, useState } from 'react';
import "./Chatroom.module.css";
import { db } from '../firebase/fBase';

export default function Chatroom() {
    var myuid = JSON.parse(localStorage.getItem('user')).uid;
    var chatlst = [];
    useEffect(() => {
        db.collection('chatroom').where('who', 'array-contains', myuid).get().then((result) => {
            var array = [];
            result.forEach((doc) => {
                array.push(doc.data());
                
            });
            console.log(array);
            chatlst =array;
            console.log(chatlst);
        })
    }, []);

    return (
        <>
            <div class="container p-4 detail">
                <div class="row">
                    <div class="col-3 p-0">
                        <ul class="list-group chat-list">

                            {
                                chatlst && chatlst.map((a,i)=> 
                                            
                                            <li class="list-group-item" key = {i}>
                                                <h6>{a.title}</h6>
                                                <h6 class="text-small">{a.date}</h6>
                                            </li>
                                                    
                                )
                            }
                            
                        </ul>
                    </div>
                    <div class="col-9 p-0">
                        <div class="chat-room">
                            <ul class="list-group chat-content">
                                <li><span class="chat-box">채팅방1 내용</span></li>
                                <li><span class="chat-box">채팅방1 내용</span></li>
                                <li><span class="chat-box mine">채팅방1 내용</span></li>
                            </ul>
                            <div class="input-group">
                                <input class="form-control" id="chat-input" />
                                <button class="btn btn-secondary" id="send">전송</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
