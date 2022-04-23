import React, { useEffect, useState } from 'react';
import {db} from 'firebase/fBase';
import { ListGroup,Button } from 'react-bootstrap';
import './ListPage.module.css';

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
    },[]);    

    return(
        <>
        <div className="container mt-3">
            <ListGroup as="ol" >
            {
                text.map((a,i)=>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start mb-3"
                        key = {i}
                    >
                        <div className='row'>
                            <div className="ms-2 col-10">
                                <a className="fw-bold" href={'detail/' + i} style={{color:"black"}}>
                                    {i}.{a.title}
                                </a>
                                <img src= {a.image} width ="10%"></img>
                                <br/>
                                {a.context}
                            </div>
    
                            <div className="ms-2 col-2">
                                <Button>수정하기</Button>
                            </div>
                        </div>
                    </ListGroup.Item>
                )
            }
            </ListGroup>
        </div>
        </>
    )
}