import React, { useEffect, useState } from 'react';
import { db } from 'firebase/fBase';
import { ListGroup, Button } from 'react-bootstrap';
import './ListPage.module.css';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function ListPage() {
    const [text, setText] = useState([]);
    const myuid = JSON.parse(localStorage.getItem('user')).uid;
    useEffect(() => {
        db.collection('Comment').get().then((result) => {
            var array = [];
            result.forEach((doc) => {
                array.push({ ...doc.data(), id: doc.id });
            });
            console.log(array)
            setText(array);
        })
    }, []);

    return (
        <>
            <div className="container pt-1">
                <ListGroup className='mt-3' >
                    {
                        text.map((a, i) =>
                            <ListGroup.Item
                                as="li"
                                className="mb-3"
                                key={i}
                            >
                                <div className='row'>
                                    <div className="col-md-10">
                                        <div className='row'>
                                            <div className='col-md-10'>
                                                <p>글: {i + 1} <a className="fw-bold" href={'detail/' + a.id} style={{ color: "black" }}>
                                                    {a.title}
                                                </a></p>
                                            </div>

                                            <div className='col-md-2'>
                                                <FontAwesomeIcon icon={faMessage} size={"md"} className="fa" />
                                                ??
                                            </div>

                                        </div>
                                        <div className='contextbox'>
                                        <p> {a.context} </p>
                                        </div>



                                    </div>

                                    <div className='col-md-2'>
                                        {myuid == a.uid
                                            ? <div className='pb-3'>
                                                <Button  >수정하기</Button>
                                            </div>
                                            :
                                            null

                                        }

                                        {
                                            a.image == null
                                                ? null
                                                : (

                                                    <img src={a.image} width="50%" ></img>

                                                )
                                        }
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