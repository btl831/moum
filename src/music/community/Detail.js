import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { db } from 'firebase/fBase.js';
import './Detail.css';

export default function Detail() {
    const params = useParams();
    let [item, setItems] = useState([]);
    var chatuid = "";
    const myuid = JSON.parse(localStorage.getItem('user')).uid;

    useEffect(() => {
        db.collection('Comment').doc(params.id).get().then((result) => {
            setItems(result.data());
            console.log(result.data());
            chatuid = result.data().uid;
            console.log(chatuid);
            console.log(myuid)
        })
    }, []);

    // 채팅 기능
    const chat = async (event) => {
        console.log("작동");

        event.preventDefault();
        db.collection('chatroom').where('who', 'array-contains-any', [myuid, chatuid]).get().then((snapshot) => {

            // 만약 채팅방이 없다면
            if (snapshot.empty) {

                var data = {
                    who: [myuid, item.uid],
                    title: item.title,
                    date: new Date()
                }

                db.collection('chatroom').add(data).then(() => (
                    window.location.href = "/chatroom")).catch((error) => {
                        console.log(error)
                    });


            }
            else {
                alert("이미 채팅방이 존재합니다!");

                // var 데이터 = {
                //     content : "----"+item.title+"방 이야기---",
                //     date : new Date(),
                //     uid : "system"
                // }
                // // 서브 컬렉션에 넣는 방법
                // db.collection('chatroom').doc(snapshot.id).collection('messages').add(데이터).then(()=>(
                //     window.location.href = "/chatroom")).catch((error) => {
                //         console.log(error)
                //     });;
            }



        })
    }
    return (
        <>
            <div class="container pt-3">
                <div class="detail-pic">
                    <img className="phoneImage" alt="iPhone_01" src={item.image} width="30%" />
                </div>

                <div>
                    <h5>제목 : {item.title}</h5>
                    <hr/>
                    <h5 class="title">내용 : {item.context}</h5>
                    <p class="date">올린날짜</p>
                    <p class="price">가격</p>
                </div>
                <button onClick={chat}>채팅걸기</button>

            </div>
        </>
    )
}
