import React,{useState} from "react";
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import {db} from '../firebase/fBase';

export default function WritePage(){
    const [title, setTitle] = useState('');
    const [content, setConent] = useState('');
    let history = useHistory();
    // 바뀌는 것에 대한 메소드
    const onChange = (event) => {
        const {target: {id, value}} = event;
        if (id==='title') {
            setTitle(value);
        }
        else if (id=== "content") {
            setConent(value);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        var 저장할거 = { 
            title : title,
            content : content

          }
          db.collection('product').add(저장할거).then((result)=>{
            window.location.href = '/write'
          }).catch((error)=>{
            console.log(error)
          })  
    }
    return(
    <>
        <div className="full">
            <div class="container mt-3">
                <input type="text" class="form-control mt-2" id="title" placeholder="title" onChange={onChange}/>
                <textarea class="form-control mt-2" id="content"onChange={onChange}placeholder="content"></textarea>
                <input type="text" class="form-control mt-2" id="price" placeholder="price"onChange={onChange}/>
                <input class="form-control mt-2" type="file" id="image"onChange={onChange}/>
                <button class="btn btn-danger mt-3" id="send"onClick={onSubmit}>올리기</button>
            </div>
            <Button onClick={() => { history.goBack() }}>돌아가기</Button>
            
        </div>
    </>
    )
}