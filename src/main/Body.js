import { Button, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import styles from '../App.module.css'
import Slider from '../music/Slider';
import Summary from '../community/Summary.js';
import Recommend from '../etc/Recommend';
import ChartPage from '../music/Chart';
import {  useState } from 'react';
import { faMoneyCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Body(props) {
    let [clickvalue,setClickvalue] = useState("");

    
    return(
        <>
        <Container>
            <div className="row" style={{height:"100px"}} />
            <div className="row">
                <Slider chart_info={props.chart_info} />
            </div>
            <div className="row" style={{height:"200px"}} />

            {/* 가수별 Playlist */}
            <div className="row" style={{position:"relative"}}>
                {/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ SPACE ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */}
                <div className={styles.space} />
                <div className="row" style={{height:"100px"}} />
                <div className="row" id={styles.wrapper}>
                <div className="col-md-5" id={styles.index}>
                    <hr />
                    <h5>가수별 Playlist</h5>
                    <hr />
                    <div className="row mt-5">
                    <div className="col-sm-1 col-md-2" />
                    <div className="col-sm-5 col-md-4" id={styles.box}>
                        <Recommend />
                    </div>
                    <div className="col-sm-5 col-md-4" id={styles.box}>
                        <Recommend />
                    </div>
                    <div className="col-sm-1 col-md-2" />
                    </div>
                    
                    <div className="row">
                    <div className="col-sm-1 col-md-2" />
                    <div className="col-sm-5 col-md-4" id={styles.box}>
                        <Recommend />
                    </div>
                    <div className="col-sm-5 col-md-4" id={styles.box}>
                        <Recommend />
                    </div>
                    <div className="col-sm-1 col-md-2" />
                    </div>
                </div>

                {/* TOP 100 */}
                <div className="col-md-5 mt-5" id={styles.index}>
                    <div className="row mt-4">
                    <div className="col-sm-10 col-md-10">
                        <h5 className={styles.top100}>TOP 100</h5>
                    </div>
                    <div className="col-sm-2 col-md-2">
                        <Link to="/chart">
                        <button className={styles.btn}>
                            <h2>&gt;</h2>
                        </button>
                        </Link>
                    </div>
                    </div>
                    <div className="row mt-2">
                    <ChartPage chart_info={props.chart_info.slice(undefined, 5)} />
                    </div>
                    <div className="row" style={{ height:"100px"}} />
                </div>
                </div>
                <div className="row" style={{ height:"100px" }}>
                <div className="col-md-1" />
                <div className="col-md-10"><hr/></div>
                <div className="col-md-1" />
                </div>

                {/* 추가요청 게시판 */}
                <div className="row" id={styles.wrapper}>
                <div className="row">
                    <div className="col-sm-4 col-md-3" />
                    <div className="col-sm-5 col-md-6 " >
                        <FontAwesomeIcon icon={faMoneyCheck} size={"2x"} className="fa"/>
                        <h3>요청 게시판</h3>
                    </div>
                    <div className="col-sm-3 col-md-2 mt-3">
                        <div className="row">
                        <Button className ="col-sm-12 col-md-5 text-center "onClick={()=>window.location.href='/write'}>글쓰기</Button>
                        <div className='col-md-2'>/</div>
                        <Button className ="col-sm-12 col-md-5 text-center" onClick={()=>window.location.href='/list'}>더보기</Button>
                        </div>
                    </div>
                    <div className="col-sm-1 col-md-1"> </div>
                </div>
                <div className="row" >
                    <div className="col-md-1" />
                    <div className="col-md-3 mt-4">
                    <Summary setClickvalue={setClickvalue}/>
                    </div>
                    
                    <div className="col-md-7 mt-3" id={styles.subCommunity}>
                    <p> {clickvalue} </p>
                    </div>

                    <div className="col-md-1" />
                </div>
                <div className="row" style={{ height:"100px"}} />
                </div>
            </div>
        </Container>
        </>
    )
}

export default Body;