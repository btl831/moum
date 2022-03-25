import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import './Detail.module.css';
import { db  } from '../firebase/fBase';
export default function Detail() {
    
    
    let [item,setItems] = useState([]);

    useEffect(()=>{
        var 쿼리스트링 = new URLSearchParams(window.location.search)
        db.collection('Comment').doc(쿼리스트링.get('id')).get().then((result)=>{
            
           console.log(result.data());
    })
});
    return(
        <>
        {/* <div class="container">
            상세페이지임 
            <div class="detail-pic my-4"></div>
            <div>
            <h5>{item.context}</h5>
            <hr/>
            <h5 class="title">{item.title}</h5>
            <p class="date">올린날짜</p>
            <p class="price">가격</p>
            </div>
        </div> */}
        </>

    )
}
