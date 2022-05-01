import { Button, Container} from 'react-bootstrap';
import { useState } from 'react';

import styles from './MusicPage.module.css'
import Recommend from './etc/Recommend';

import Slider from './features/Slider';
import ChartPage from './features/Chart';
import Summary from 'music/community/Summary';

import { faMoneyCheck, faHeadphones} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MusicPage(props) {
    let [clickvalue,setClickvalue] = useState("");
    
    return(
        <>
        <Container>
            <div className="row" style={{height:"100px"}} />
            <div className="row">
                <Slider chart_info={props.chart_info} />
            </div>
            <div className="row" style={{height:"200px"}} />

            <div className="row" style={{position:"relative"}}>
                <div className={styles.space} />
                <div className="row" style={{height:"85px"}} />
                <div className="row" id={styles.wrapper}>
                    {/* 가수별 Playlist */}
                    <div className="col-md-5" id={styles.index}>
                        <div className='pt-4 margin-left-auto'>
                            <hr />
                            <h5>가수별 Playlist</h5>
                            <FontAwesomeIcon icon={faHeadphones} size={"2x"} className="fa"/>
                            <hr />
                        </div>
                        <div>
                            <Recommend />
                        </div>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {/* TOP 100 */}
                    <div className="col-md-5 mt-1" id={styles.index}>
                        <div className="row mt-4">
                            <div className="col-sm-10 col-md-10">
                                <h5 className={styles.top100}>TOP 100 </h5> 
                            </div>
                            <div className="col-sm-2 col-md-2">
                                <button className={styles.btn} onClick={()=>window.location.href="/music/chart"}>
                                    <h2>&gt;</h2>
                                </button>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <ChartPage chart_info={props.chart_info.slice(undefined, 7)} />
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
                        <div className="col-sm-5 col-md-6">
                            <FontAwesomeIcon icon={faMoneyCheck} size={"2x"} className="fa"/>
                            <h3 className="reqlist" onClick={()=>window.location.href='/list'}>요청 게시판</h3>
                        </div>
                        <div className="col-sm-3 col-md-2 mt-3">
                            <div className="row">
                                <Button className ="col-sm-12 col-md-5 text-center "onClick={()=>window.location.href='/music/write'}>글쓰기</Button>
                                <div className='col-md-2'>/</div>
                                <Button className ="col-sm-12 col-md-5 text-center" onClick={()=>window.location.href='/music/list'}>더보기</Button>
                            </div>
                        </div>
                        <div className="col-sm-1 col-md-1" />
                    </div>
                    <div className="row">
                        <div className="col-md-1" />
                        <div className="col-md-3 mt-4">
                            <Summary setClickvalue={setClickvalue}/>
                        </div>
                        <div className="col-md-7 mt-3" id={styles.subCommunity}>
                            <p> {clickvalue} </p>
                        </div>
                        <div className="col-md-1" />
                    </div>
                    <div className="row" style={{ height:"120px"}} />
                </div>
            </div>
        </Container>
        </>
    )
}

export default MusicPage;