import React, { useEffect, useState } from 'react';
import {db} from '../firebase/fBase';
import './ListPage.css';

export default function ListPage() {
    const [text,setText] = useState([]);
    useEffect(()=>{
        db.collection('Comment').get().then((result)=>{
            var array =[];
            result.forEach((doc)=>{
                array.push(doc.data());
            });
            
            setText(array);
        })
    });
    
    return(
        <>
        <div class="container mt-3">
        {
            text.map((a,i)=>{
                return(
                    <div class="product">
                    <div class="thumbnail" ></div>
                    <div class="flex-grow-1 p-4">
                      <h5 class="title">{a.context}</h5>
                      <p class="date">{a.title}</p>
                      <p class="price"></p>
                      <p class="float-end"></p>
                    </div>
                    </div>
                )
            })
        }
        </div>
        </>
    )
}