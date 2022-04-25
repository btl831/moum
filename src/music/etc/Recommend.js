import './Recommend.css';
import { Button, Collapse } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { db } from 'firebase/fBase';


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
            setClick()
        })
    }, []);

    return (
        <>
            <div className='carousel'>
                <div className='container pt-5'>
                    <iframe className='pt-1  pl-3' width="400vh" height="270vh" src="https://www.youtube.com/embed/tHmc2mAXZSA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div>
            <div className='container row'>
                {
                    item.map((a, i) => {
                        return (
                            <>
                                <div className='col-1'></div>
                                <Button className='btn1 col-3' onClick={() => { setOpen(false); setOpen(!open); setClick(a); }}
                                    aria-controls="example-collapse-text" aria-expanded={open}>
                                        {a.singer}
                                </Button>
                            </>
                        )
                    })
                }

                {/* <div className='col-1'></div>

                <Button className='btn2 col-3'>유이카</Button>
                <div className='col-1'></div>
                <Button className='btn3 col-3'>요네즈 켄시</Button> */}
                <div>
                    {open === true
                        ? <Collapse in={open}>
                            <div id="example-collapse-text">
                                {click.context}
                            </div>
                        </Collapse>
                        : null
                    }
                </div>
            </div>
        </>
    );
}