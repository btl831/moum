import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { db } from '../firebase/fBase';
import './Detail.module.css';

export default function Detail() {
    const params = useParams();
    let [item,setItems] = useState([]);
    
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
            <p>{`${params.id} 상세페이지입니다. `}</p>
            <div class="detail-pic my-4"/>
            <div>
                <h5>제목 : {item.title}</h5>
                <hr/>
                <h5 class="title">내용 : {item.context}</h5>
                <p class="date">올린날짜</p>
                <p class="price">가격</p>
            </div>
        </div>
        </>
    )
}
