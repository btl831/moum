import React, { useState } from "react";
import { Image, Card } from 'react-bootstrap';
import { useMediaQuery } from "react-responsive";
import AlertSong from "./AlertSong";

export default function Slider(props) {
    const isMobile = useMediaQuery({
        query : "(max-width:800px)"
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

    if(isMobile) {
        return (
            <>
                <head>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/gsap.min.js"
                        integrity="sha512-UxP+UhJaGRWuMG2YC6LPWYpFQnsSgnor0VUF3BHdD83PS/pOpN+FYbZmrYN+ISX8jnvgVUciqP/fILOXDjZSwg=="
                        crossorigin="anonymous"
                        referrerpolicy="no-referrer">
                    </script>
                </head>
                <div className="row mt-5" style={{marginLeft:"13vw"}}>
                    <div>
                        <Deck song={dataList[1]}/>
                    </div>
                </div>
                <br/>
            </>
        );
    }
    else {
        return (
            <>
                <head>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/gsap.min.js"
                        integrity="sha512-UxP+UhJaGRWuMG2YC6LPWYpFQnsSgnor0VUF3BHdD83PS/pOpN+FYbZmrYN+ISX8jnvgVUciqP/fILOXDjZSwg=="
                        crossorigin="anonymous"
                        referrerpolicy="no-referrer">
                    </script>
                </head>
                <div className="row mt-5" style={{display:"flex", justifyContent:"center"}}> 
                    <div className="col-md-3">
                        <Deck song={dataList[0]}/>
                    </div>
                    <div className="col-md-3">
                        <Deck song={dataList[1]}/>
                    </div>
                    <div className="col-md-3">
                        <Deck song={dataList[2]}/>
                    </div>
                </div>
                <br/>
            </>
        );
    }
}

function Deck(props) {
    let song = JSON.parse(props.song);
    return (
      <Card style={{ width: '18rem', height: '29rem', margin : '10px' }} >
        <Image style={{ width: '90%', margin : '15px' }} src={song.image} thumbnail/>
        <Card.Body>
            <Card.Title>{song.title}</Card.Title>
            <Card.Text>
                <p>가수 : {song.singer} </p>
            </Card.Text>
            <AlertSong pick_song={song} />
        </Card.Body>
        <br/>
      </Card>
    )
}