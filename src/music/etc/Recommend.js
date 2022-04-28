import './Recommend.css';
import { Button, Collapse } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { db } from 'firebase/fBase';
import ReactPlayer from 'react-player';


export default function Recommend() {
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState([]);
    let [click, setClick] = useState();

    useEffect(() => {
        db.collection('Recommand').get().then((result) => {
            var array = [];
            result.forEach((doc) => {
                array.push({ ...doc.data(), id: doc.id });
            });
            console.log(array)
            setItem(array);
    
        })
    }, []);

    return (
        <>
            <div className='carousel'>
                <div className='container pt-5'>
                    {
                        open === false
                        ?<img src = "data:image/png;base64,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" alt = "Recommand.sum" width="400vh" height="270vh" />
                        :<ReactPlayer
                        url = {click.url}
                        className = "player"
                        width = '70vh'
                        height = '50vh'
                        playing
                        controls = {true}
                      />
                    }
                    
                </div>
            </div>
            <div className='container row'>
                {
                    item.map((a, i) => {
                        return (
                            
                            <React.Fragment key={i}>
                                <div className='col-1'></div>
                                <Button className='btn1 col-3 mt-3' onClick={() => { 
                                    if(open === false ){
                                        setOpen(!open); 
                                    }
                                    setClick(a);
    
                                 }}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={open}>{a.singer}</Button>
                                    
                            </React.Fragment>
                        )
                    })
                }

                <div>
                    {open === true
                        ? <Collapse in={open}>
                            <div id="example-collapse-text">
                                {click.context}
                                <br/>
                                <a href= {click.namu}>나무위키</a>
                            </div>
                        </Collapse>
                        : null
                    }
                </div>
            </div>
        </>
    );
}