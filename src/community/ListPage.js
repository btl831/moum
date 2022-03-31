import React, { useEffect, useState } from 'react';
import {db} from '../firebase/fBase';
import { ListGroup,Badge } from 'react-bootstrap';
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
        <div className="full container mt-3">
            <ListGroup as="ol" numbered>
            {
                text.map((a,i)=>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                        key = {i}
                    >
                        <div className="ms-2 me-auto">
                            <a className="fw-bold" href={'/detail/' + i} style={{color:"black"}}>
                                {i}.{a.title}
                            </a><br/>
                            {a.context}
                        </div>
                        <Badge bg="primary" pill> 14 </Badge>
                    </ListGroup.Item>
                )
            }
            </ListGroup>
        </div>
        </>
    )
}