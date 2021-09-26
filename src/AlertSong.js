import React, { useState } from "react";
import { Alert, Modal, Button, Image } from 'react-bootstrap';
import { useMediaQuery } from "react-responsive";
import ReactPlayer from "react-player";
import styles from './AlertSong.module.css';

export default function InfoModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const isMobile = useMediaQuery({
    query : "(max-width:767px)"
  });

  if(isMobile) {
    return (
      <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous"></link>
        <Button className="nextButton" variant="secondary" onClick={handleShow}>
          Go
        </Button>
        <Modal show={show} onHide={handleClose} size="xl" backdrop="static" centered>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
            
          <Modal.Body>
            <div className = "row">
              <div className="row" style={styles.playerWrapper}>
                <ReactPlayer
                  url = {props.pick_song.link}
                  className = {styles.reactPlayer}
                  width = '100%'
                  height = '100%'
                  playing
                  controls = {true}
                />
              </div>
              <div className="row" style={{height:"20px"}}/>
              <hr/>
              <div className="row">
                <div>
                  <Image src={props.pick_song.image} style={{width:"80%", marginLeft:"55px"}} thumbnail />
                  <hr/>
                  <Alert variant="secondary" style={{marginLeft:"20px"}}>제목 : {props.pick_song.title}</Alert>
                  <Alert variant="secondary" style={{marginLeft:"20px"}}>가수 : {props.pick_song.singer}</Alert>
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
  else {
    return (
      <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous"></link>
        <Button className="nextButton" variant="secondary" onClick={handleShow}>
          Go
        </Button>
        <Modal show={show} onHide={handleClose} size="xl" backdrop="static" centered>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
            
          <Modal.Body>
            <div className = "row">
              <div className="col-md-7" id={styles.playerWrapper}>
                <ReactPlayer
                  url = {props.pick_song.link}
                  className = {styles.reactPlayer}
                  width = '100%'
                  height = '100%'
                  playing
                  controls = {true}
                />
              </div>
              <div className="col-md-5">
                <div id={styles.songinfo}>
                  <Image src={props.pick_song.image} thumbnail />
                  <hr/>
                  <Alert variant="secondary">제목 : {props.pick_song.title}</Alert>
                  <Alert variant="secondary">가수 : {props.pick_song.singer}</Alert>
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
}