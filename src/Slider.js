import React, { useState } from "react";
import { Card } from 'react-bootstrap';
import { useMediaQuery } from "react-responsive";
import AlertSong from "./AlertSong";
import styles from "./Slider.module.css";

export default function Slider(props) {
    const isMobile = useMediaQuery({
        query : "(max-width:768px)"
    });

    // random value for random song
    let chart_info = Object.values(props.chart_info);
    let dataList = [], randCheck = [], cnt = 0;
    while(cnt < 9) {
        let rand = Math.floor(Math.random() * chart_info.length);
        if(randCheck.indexOf(rand) < 0) {
            dataList.push(JSON.stringify(chart_info[rand]));
            randCheck.push(rand);
            cnt++;
        }
    }

    return (
        <>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/gsap.min.js" integrity="sha512-UxP+UhJaGRWuMG2YC6LPWYpFQnsSgnor0VUF3BHdD83PS/pOpN+FYbZmrYN+ISX8jnvgVUciqP/fILOXDjZSwg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
            <div className="row mt-5">
                <div>
                    <div className="col-md-4">

                    </div>
                    <div className="col-md-4">

                    </div>
                    <div className="col-md-4">

                    </div>
                </div>
                    <Deck song={dataList[2]}/>
            </div>
        </>
    );
}

function Deck(props) {
    let song = JSON.parse(props.song);

    return (
      <Card style={{ width: '18rem', height: '30rem' }} className={styles.card} >
        <Card.Img variant="top" src={song.image} className="mt-3" />
        <Card.Body>
          <Card.Title>{song.title}</Card.Title>
          <Card.Text>
            <p>가수 : {song.singer} </p>
          </Card.Text>
        </Card.Body>
        <AlertSong pick_song={song} />
        <hr/>
      </Card>
    )
}


/*

                {dataList.map((song, i) => (
                        <Deck key={i} song={song}/>
                    ))}

*/