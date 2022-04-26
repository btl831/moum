import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { db } from 'firebase/fBase.js';
import './Detail.css';
import { Button } from 'react-bootstrap';
import { faMessage, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Detail() {
    const params = useParams();
    let [item, setItems] = useState([]);
    let [chatuid, setUid] = useState("");
    const myuid = JSON.parse(localStorage.getItem('user')).uid;
    const [title, setTitle] = useState('');
    const [context, setConent] = useState('');
    const [review, setReview] = useState('');

    useEffect(() => {
        db.collection('Comment').doc(params.id).get().then((result) => {
            setItems(result.data());
            setUid(result.data().uid);
        })

    }, []);
    useEffect(() => {
        db.collection('Comment').doc(params.id).collection('review').orderBy('date').onSnapshot((result) => {
            var array = [];
            result.forEach((doc) => {
                array.push(doc.data());
            });
            setReview(array);
        })
    }, [])

    // 채팅 기능
    const chat = async (event) => {event.preventDefault();
        db.collection('chatroom').where('who', 'array-contains-any', [myuid, chatuid]).get().then((snapshot) => {
            // 만약 채팅방이 없다면
            if (snapshot.empty) {
                var data = {
                    who: [myuid, item.uid],
                    title: item.title,
                    date: new Date()
                }
                db.collection('chatroom').add(data).then(() => (
                    window.location.href = "/chatroom")).catch((error) => {
                        console.log(error)
                    });
            }
            else {
                alert("이미 채팅방이 존재합니다!");

                // var 데이터 = {
                //     content : "----"+item.title+"방 이야기---",
                //     date : new Date(),
                //     uid : "system"
                // }
                // // 서브 컬렉션에 넣는 방법
                // db.collection('chatroom').doc(snapshot.id).collection('messages').add(데이터).then(()=>(
                //     window.location.href = "/chatroom")).catch((error) => {
                //         console.log(error)
                //     });;
            }
        })
    }
    // 댓글작성

    const onChange = (event) => {
        const { target: { id, value } } = event;
        if (id === 'title') {
            setTitle(value);
        }
        else if (id === "content") {
            setConent(value);
        }
    }
    const reviewupload = async (event) => {
        event.preventDefault();
        var data = {
            title: title,
            context: context,
            date: new Date(),
            uid: JSON.parse(localStorage.getItem('user')).uid,
            displayName: JSON.parse(localStorage.getItem('user')).displayName
        }
        db.collection('Comment').doc(params.id).collection('review').add(data).then(() => {
            alert("작성완료!")
        }).catch((error) => {
            console.log(error)
        })

    }
    return (
        <>
            <div className="container pt-3">
                <div className='itemShow'>
                    {
                        item.image == null
                            ? null
                            : <div className="detail-pic">
                                <img className="itemimg" alt="로딩불가" src={item.image} width="30%" />
                            </div>
                    }
                    <div>
                        <h5>제목 : {item.title}</h5>
                        <p>작성자: {item.displayName}</p>
                        <hr />
                        <h5 className="title">내용 : {item.context}</h5>
                        {/* 작성일자: {
                                    Intl.DateTimeFormat('ko-KR', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                }).format(item.date.seconds * 1000)
                                } */}
                    </div>
                    <Button onClick={chat} variant="dark">채팅걸기</Button>
                    <hr />
                    <hr />
                </div>

                <div className='reviewShow'>
                    {
                        review && review.map((a, i) => {
                            return (
                                <div className='reviewitem mb-3' id="box">
                                    <FontAwesomeIcon icon={faComment} size={"2x"} className="fa" />
                                    <p>{a.displayName}</p>
                                    <p>제목:{a.title}</p>
                                    <p>내용:{a.context}</p>
                                    <p>작성 일자: {
                                                    Intl.DateTimeFormat('ko-KR', {
                                                        year: 'numeric',
                                                        month: '2-digit',
                                                        day: '2-digit',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        second: '2-digit',
                                                    }).format(a.date.seconds * 1000)
                                                }</p>
                                </div>
                            )

                        })
                    }



                </div>
                <div className='wirtereview'>
                    <div>
                        <FontAwesomeIcon icon={faMessage} size={"2x"} className="fa" />
                        <h3>댓글을 달아보세요</h3>
                    </div>
                    <div>
                        <input type="text" class="form-control" id="title" placeholder="title" onChange={onChange} />
                        <textarea class="form-control mt-2" id="content" onChange={onChange} placeholder="content" rows="4" cols="50"></textarea>
                        <Button className="send" variant='secondary' onClick={reviewupload}>올리기</Button>
                    </div>

                </div>



            </div>


        </>
    )
}
