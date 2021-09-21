import React from "react";
import { InputGroup,FormControl, Button } from "react-bootstrap";

export default function WritePage(){
    return(
        <>
        <div className="row">
            <InputGroup className="mb-3">
                <InputGroup.Text id="title">제목</InputGroup.Text>
                <FormControl
                aria-label="제목"
                aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="writer">작성자</InputGroup.Text>
                <FormControl
                aria-label="writer"
                aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>

            <InputGroup>
                <InputGroup.Text id ="content">내용</InputGroup.Text>
                <FormControl as="textarea" aria-label="내용" />
            </InputGroup>
        </div>
        <Button variant="secondary" className="mt-8 mr-5"
         onclick={()=>{
                // 여기에다가 값보내는 메소드 적으면 댐 axios.put
        }}>저장</Button>
        </>
    )
}