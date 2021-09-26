import React, { useState, useRef, useEffect } from "react";
import { Image, Card, Button } from 'react-bootstrap';
import { useMediaQuery } from "react-responsive";
import { gsap } from 'gsap'

import AlertSong from "./AlertSong";
import styles from "./Slider.module.css"

export default function Slider(props) {
    /* display size check */
    const isMobile = useMediaQuery({
        query : "(max-width:767px)"
    });

    /* 랜덤 값 뽑기 */
    const NUM = 8;
    let chart_info = Object.values(props.chart_info);
    let dataList = [], randCheck = [], cnt = 0;
    while(cnt < NUM) {
        let rand = Math.floor(Math.random() * chart_info.length);
        if(randCheck.indexOf(rand) < 0) {
            dataList.push(JSON.stringify(chart_info[rand]));
            randCheck.push(rand);
            cnt++;
        }
    }
    const randSongs = useRef(dataList);         // immutable data
    
    /* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ Animation - Mobile ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */
    const [page, changePage] = useState(1);

    const smInitCard = useRef(null);
    const smLeftCard = useRef(null), smRightCard = useRef(null);
    const prevLeftCard = useRef(null), prevRightCard = useRef(null);

    const [smCards, direction] = useState(smInitCard);

    useEffect(() => {
        gsap.fromTo(smInitCard.current, 
            { y:-100, opacity:0, duration:2 },
            { y:0, opacity:1, duration:1 }
        );
    }, []);

    useEffect(() => {
        gsap.fromTo(smLeftCard.current, 
            { scaleX:0, scaleY:0.7, x:-300, opacity:0, duration:2 },
            { scaleX:1, scaleY:1, x:0, opacity:1, duration:1 }
        );
        gsap.to(prevLeftCard.current, 
            { scaleX:0, scaleY:0.7, x:300, opacity:0, duration:2 }
        );
    }, [page]);

    useEffect(() => {
        gsap.fromTo(smRightCard.current, 
            { scaleX:0, scaleY:0.7, x:300, opacity:0, duration:2 },
            { scaleX:1, scaleY:1, x:0, opacity:1, duration:1 }
        );
        gsap.to(prevRightCard.current, 
            { scaleX:0, scaleY:0.7, x:-300, opacity:0, duration:2 }
        );
    }, [page]);

    /* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ Animation - PC ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */
    const initCard1 = useRef(null), initCard2 = useRef(null), initCard3 = useRef(null);
    const leftCard1 = useRef(null), rightCard1 = useRef(null);
    const leftCard2 = useRef(null), rightCard2 = useRef(null);
    const leftCard3 = useRef(null), rightCard3 = useRef(null);

    const [firstCards, action1] = useState(initCard1);
    const [secondCards, action2] = useState(initCard2);
    const [thirdCards, action3] = useState(initCard3);

    useEffect(() => {
        gsap.fromTo(initCard1.current,
            { scaleX:0.8, scaleY:0.8, y:-100, opacity:0, duration:2 },
            { scaleX:0.8, scaleY:0.8, y:0, opacity:0.7, duration:1 }
        );
        gsap.fromTo(initCard2.current, 
            { y:-100, opacity:0, duration:2 },
            { y:0, opacity:1, duration:1 }
        );
        gsap.fromTo(initCard3.current,
            { scaleX:0.8, scaleY:0.8, y:-100, opacity:0, duration:2 },
            { scaleX:0.8, scaleY:0.8, y:0, opacity:0.7, duration:1 }
        );
    }, []);

    useEffect(() => {
        gsap.fromTo(leftCard1.current, 
            { scaleX:0, scaleY:0.3, x:-300, opacity:0, duration:2 },
            { scaleX:0.8, scaleY:0.8, x:0, opacity:0.7, duration:1 }
        );
        gsap.fromTo(leftCard2.current, 
            { scaleX:0.8, scaleY:0.8, x:-330, opacity:0.7, duration:2 },
            { scaleX:1, scaleY:1, x:0, opacity:1, duration:1 }
        );
        gsap.fromTo(leftCard3.current, 
            { scaleX:1, scaleY:1, x:-330, opacity:1, duration:2 },
            { scaleX:0.8, scaleY:0.8, x:0, opacity:0.7, duration:1 }
        );
    }, [page]);

    useEffect(() => {
        gsap.fromTo(rightCard1.current, 
            { scaleX:0, scaleY:0.3, x:300, opacity:0, duration:2 },
            { scaleX:0.8, scaleY:0.8, x:0, opacity:0.7, duration:1 }
        );
        gsap.fromTo(rightCard2.current, 
            { scaleX:0.8, scaleY:0.8, x:330, opacity:0.7, duration:2 },
            { scaleX:1, scaleY:1, x:0, opacity:1, duration:1 }
        );
        gsap.fromTo(rightCard3.current, 
            { scaleX:1, scaleY:1, x:330, opacity:1, duration:2 },
            { scaleX:0.8, scaleY:0.8, x:0, opacity:0.7, duration:1 }
        );
    }, [page]);

    /* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ Return ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */
    /* 페이지 전환 - Mobile */
    function smShowLeft() {
        if(page-1 >= 0) {
            changePage(page-1);
            direction(smLeftCard);
        }
    }
    function smShowRight() {
        if(page+1 < NUM) {
            changePage(page+1);
            direction(smRightCard);
        }
    }

    /* 이하 모바일 크기일 때 실행 */
    if(isMobile) {
        return (
            <>
            <div className="row mt-5" />
            <div className="row mt-5" style={{display:"flex", justifyContent:"center"}}>
                <div className="col-1">
                    <Button variant="dark" className={styles.smbtn} onClick={smShowLeft}>
                        &lt;
                    </Button>
                </div>
                <div className="col-9" id={styles.smcard} ref={smCards}>
                    <Deck song={randSongs.current[page]}  />
                </div>
                <div className="col-1">
                    <Button variant="dark" className={styles.smbtn} onClick={smShowRight}>
                        &gt;
                    </Button>
                </div>
            </div>
            <br/>
            <div className="row mt-5" />
            </>
        );
    }

    /* 페이지 전환 - PC */
    function showLeft() {
        if(page-1 >= 0) {
            changePage(page-1);
            action1(leftCard1);
            action2(leftCard2);
            action3(leftCard3);
        }
    }
    function showRight() {
        if(page+1 < NUM) {
            changePage(page+1);
            action1(rightCard3);
            action2(rightCard2);
            action3(rightCard1);
        }
    }    

    /* 이하 PC 크기일 때 실행 */
    if(!isMobile) {
        return (
            <>
            <div className="row mt-5" />
            <div className="row mt-5" style={{display:"flex", justifyContent:"center"}}>
                <div className="col-md-1">
                    <Button variant="dark" className={styles.btn} onClick={showLeft}>
                        &lt;
                    </Button>
                </div>
                <div className="col-md-3" ref={firstCards}>
                    {page-1 >= 0 &&
                        <Deck song={randSongs.current[page-1]}/>
                    }
                </div>
                <div className="col-md-3" ref={secondCards}>
                    <Deck song={randSongs.current[page]}/>
                </div>
                <div className="col-md-3" ref={thirdCards}>
                    {page+1 < NUM &&
                        <Deck song={randSongs.current[page+1]}/>
                    }
                </div>
                <div className="col-md-1">
                    <Button variant="dark" className={styles.btn} onClick={showRight}>
                        &gt;
                    </Button>
                </div>
            </div>
            <br/>
            <div className="row mt-5" />
            </>
        );
    }
}

/* 화면에 띄울 카드 덱 */
function Deck(props) {
    let song = JSON.parse(props.song);
    return (
      <Card className={styles.card}>
        <Image className={styles.cardimg} src={song.image} thumbnail/>
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