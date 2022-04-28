import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { db, storage } from 'firebase/fBase';


export default function WritePage() {
    const params = useParams();
    const [title, setTitle] = useState('');
    const [context, setConent] = useState('');
    const [image, setImage] = useState('');
    let navigate = useNavigate();
    // 입력되어있는 정보 출력
    useEffect(() => {
        db.collection('Comment').doc(params.id).get().then((result) => {
            setTitle(result.data().title);
            setConent(result.data().context);
            setImage(result.data().image);
        })

    }, []);

    // 바뀌는 것에 대한 메소드
    const onChange = (event) => {
        const { target: { id, value } } = event;
        if (id === 'title') {
            setTitle(event.target.value);

        }
        else if (id === "content") {
            setConent(event.target.value);
        }
    }

    const uploadimg = async (event) => {
        event.preventDefault();
        if (document.querySelector('#image').value) {
            var file = document.querySelector('#image').files[0];
            var storageRef = storage.ref();
            var path = storageRef.child('image/' + file.name);
            var setupload = path.put(file);

            setupload.on('state_changed',
                null,
                (error) => {
                    console.error('실패사유:', error);
                },
                // 성공시
                () => {
                    setupload.snapshot.ref.getDownloadURL().then((url) => {
                        // 정보 입력
                        var data = {
                            title: title,
                            context: context,
                            date: new Date(),
                            image: url,
                        }
                        db.collection('Comment').doc(params.id).update(data).then(() => {
                            window.location.href = '/music/list'
                        }).catch((error) => {
                            console.log(error)
                        })
                    })
                }

            )
        }
        else {
            var data = {
                title: title,
                context: context,
                date: new Date(),
            }
            db.collection('Comment').doc(params.id).update(data).then(() => {
                window.location.href = '/music/list'
            }).catch((error) => {
                console.log(error)
            })

        }

    }

    return (
        <>
            <div>
                <div class="container mb-3">
                    <br />
                    <input type="text" className="form-control" id="title" placeholder="title" onChange={onChange} value={title} />
                    <textarea className="form-control mt-2" id="content" onChange={onChange} placeholder="content" rows="4" cols="50" value={context}></textarea>
                    <input className="form-control mt-2" type="file" id="image" onChange={onChange} />
                </div>

                <button className="btn btn-danger" id="send" onClick={uploadimg}>올리기</button>
                <Button onClick={() => { navigate(-1) }}>돌아가기</Button>
            </div>
        </>
    )

}