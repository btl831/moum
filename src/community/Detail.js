import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { db } from '../firebase/fBase';
import './Detail.module.css';

export default function Detail() {
    const params = useParams();
    let [item,setItems] = useState([]);

    // 채팅 기능
    function chat(){

    }

    useEffect(()=>{
        db.collection('Comment').get().then((result)=>{
            var array =[];
            result.forEach((doc)=>{
                array.push(doc.data());
            });
           setItems(array[params.id]);
        })
    },[]);
    
    return(
        <>
        <div class="full container">
            <p>{`${params.id}번 상세페이지입니다. `}</p>
            <div class="detail-pic my-4">
                 <img className="phoneImage" alt="iPhone_01" src={item.image} width = "30%"/>
            </div>

            <div>
                <h5>제목 : {item.title}</h5>
                <hr/>
                <h5 class="title">내용 : {item.context}</h5>
                <p class="date">올린날짜</p>
                <p class="price">가격</p>
            </div>
            <button onClick={chat()}>채팅걸기</button>

        </div>
        </>
    )
}
