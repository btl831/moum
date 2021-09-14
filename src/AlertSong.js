import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import ReactPlayer from "react-player";

export default function InfoModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
      <Button className="nextButton" variant="secondary" onClick={handleShow}>
        Go Song
      </Button>
      <Modal show={show} onHide={handleClose}  
             centered>
        
        <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        
        <Modal.Body>
            <div className = "row">
            <div className="col-6"  >
              <ReactPlayer
              url = {props.곡.link} 
              width='100%'
              height='100%'
              playing controls/>
            </div>
            <div className ="col-6">
             제목 : {props.곡.song}
            </div>
            </div>
  

        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}