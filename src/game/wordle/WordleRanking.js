import React, { useState, useEffect} from 'react';
import { Table } from 'react-bootstrap';
import './WordleRanking.css'
import { db } from 'firebase/fBase'

export default function WordleRanking(){
    let [item,setItems] = useState([]);
    
    useEffect(()=>{
        db.collection('wordle').orderBy('score').get().then((result)=>{
            var array =[];
            result.forEach((doc)=>{
                array.push(doc.data());
            });
           setItems(array);
        })
    },[item])

    return(
        <>
        <div className='container'>
            <br/>
            <div className='header mt-5'>
                <h4>랭킹 보관소</h4>
            </div>

            <div className = "ranking_chart_form mt-5">
                <div className='chart'>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>이름</th>
                            <th>시도 횟수</th>
                            <th>날짜</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                item.map((a,i)=>{
                                    return(
                                        <React.Fragment key={i}>
                                            <tr>
                                                <td>{i}</td>
                                                <td>{a.displayName}</td>
                                                <td>{a.score}</td>
                                                <td>
                                                    {
                                                        Intl.DateTimeFormat('ko-KR', {
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            second: '2-digit',
                                                        }).format(a.date.seconds * 1000)
                                                    }
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    )      
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
        </>
    )
}