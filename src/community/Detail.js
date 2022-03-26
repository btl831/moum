import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { db } from '../firebase/fBase';
import './Detail.module.css';

export default function Detail() {
    const params = useParams();
    let [item,setItems] = useState([]);
    
    useEffect(()=>{
        db.collection('Comment').doc(params.id).get().then((result)=>{
           console.log(result.data());
        })
    },[]);
    
    return(
        <>
        <div class="full container">
            <p>{`${params.id} 상세페이지입니다. `}</p>
            <div class="detail-pic my-4"/>
            <div>
                {/*
                <h5>{item.context}</h5>
                <hr/>
                <h5 class="title">{item.title}</h5>
                <p class="date">올린날짜</p>
                <p class="price">가격</p>
                */}
            </div>
        </div>
        </>
    )
}
