import React, { useState,useEffect} from 'react';
import './Wordle_Ranking.css'
import {db} from '../../firebase/fBase'
import { Table } from 'react-bootstrap';

export default function Wordle_Ranking(){
    let [item,setItems] = useState([]);
    useEffect(()=>{
        var users = db.collection("wordle").limit(10).orderBy("score");
        users.get().then(query => {
        // var array = query.map(a => a.data());
        // console.log(array);
        var array = [];
        query.forEach(function (doc) {
          array.push(doc.data());
        });
        setItems(array);
        console.log(item);
      });
    })


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
                        <th>점수</th>
                        <th>날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            item.map((a,i)=>{
                                return(
                                    <>
                                    <tr>
                                    <td>{i}</td>
                                    <td>{a.displayName}</td>
                                    <td>{a.score}</td>
                                    <td>{a.date}</td>
                                    </tr>
                                    </>
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