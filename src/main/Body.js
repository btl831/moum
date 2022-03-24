import { Button, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import styles from '../App.module.css'
import Slider from '../music/Slider';
import Community from '../community/Community.js';
import Recommend from '../etc/Recommend';
import ChartPage from '../music/Chart';

function Body(props) {
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
                    <div className="col-sm-4 col-md-6" >
                    <h3>요청 게시판</h3>
                    </div>
                    <div className="col-sm-4 col-md-3">
                    <Link to="/write">
                        <Button>글쓰기</Button>
                    </Link>
                    </div>
                </div>
                <div className="row" >
                    <div className="col-md-1" />
                    <div className="col-md-3 mt-3">
                    <Community />
                    </div>
                    <div className="col-md-7 mt-3" id={styles.subCommunity}>
                    <a>여기에는 상세페이지 내용이 적힐 겁니다.</a>
                    <Button onClick={()=>{window.location.href = "./list"}}></Button>
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