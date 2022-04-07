import React, { Component, useEffect, useState } from 'react';
import "./Chatroom.css";
import { db } from '../firebase/fBase';

export default function Chatroom() {
    var myuid = JSON.parse(localStorage.getItem('user')).uid;
    var chatlst;
    var [chat,setchat] = useState([]);
    useEffect(() => {
        db.collection('chatroom').where('who', 'array-contains', myuid).get().then((result) => {
            var array = [];
            result.forEach((doc) => {
                array.push(doc.data(),doc.id);
            });
            console.log(array);
            chatlst = array;
            setchat(array);
            console.log(chatlst);
            console.log(chat);
        })
    }, []);

    return (
        <>
            <div className="container p-4 detail">
                <div className="row">
                    <div className="col-3 p-0">
                        <ul className="list-group chat-list">
                            {   
                                chat.map((a,i)=>{
                                    return <Chatlist title ={a.title} date = {a.id}></Chatlist>
                                })
                            }
                            

                        </ul>
                    </div>
                    <div className="col-9 p-0">
                        <div className="chat-room">
                            <ul className="list-group chat-content">
                                <li><span className="chat-box">채팅방1 내용</span></li>
                                <li><span className="chat-box">채팅방1 내용</span></li>
                                <li><span className="chat-box mine">채팅방1 내용</span></li>
                            </ul>
                            <div className="input-group">
                                <input className="form-control" id="chat-input" />
                                <button className="btn btn-secondary" id="send">전송</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

class Chatlist extends Component{
    render(){
        return (
            <li className="list-group-item">
                                <h6>{this.props.title}</h6>
                                <h6 className="text-small">{this.props.date}</h6>
            </li> 
        )
    }
}