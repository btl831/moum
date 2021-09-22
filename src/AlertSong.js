import React, { useState } from "react";
import { Alert, Modal, Button, Image } from 'react-bootstrap';
import ReactPlayer from "react-player";
import './AlertSong.css';

export default function InfoModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous"></link>
      <Button className="nextButton" variant="secondary" onClick={handleShow}>
        Go Song
      </Button>
      <Modal show={show} onHide={handleClose} size="xl" centered>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
          
        <Modal.Body>
          <div className = "row">
            <div className="col-md-7 player-wrapper">
              <ReactPlayer
                url = {props.곡.link}
                className = "react-player"
                width='100%'
                height='100%'
                playing
                controls = {true}
              />
            </div>
            <div className="col-md-5">
              <div id="songinfo">
                {/* 테스트용 이미지 */}
                <Image src='https://lh3.googleusercontent.com/yoZbj8OKj9ELsG8CJtph113lsYXzOuD26gNZG6HvkEdleVuTMedIxVs8HYqD1AGjO13Fjm1-1yoMNSw=w544-h544-l90-rj' thumbnail />
                <hr/>
                <Alert variant="secondary">제목 : {props.곡.song}</Alert>
                <Alert variant="secondary">가수 : {props.곡.singer}</Alert>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}