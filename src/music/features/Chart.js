import React, { useEffect, useState } from "react";
import { Table, Figure, Pagination, Card, Button } from "react-bootstrap";
import ReactPlayer from "react-player";
import { CSSTransition } from "react-transition-group";
import AlertSong from './AlertSong.js'

export default function ChartPage(props) {
    let [page, setPage] = useState(1);
    let items = [];
    let [nowSong, setNowSong] = useState([]);
    let [clicker, setClicker] = useState(false);
    if (props.chart_info.length < 10)
        return (
            <>
                <br />
                <Chart chart_info={props.chart_info}></Chart>
            </>
        )
    else {
        for (let number = 1; number <= 5; number++) {
            items.push(
                <Pagination.Item key={number} active={number === page} onClick={() => { setPage(number) }}>
                    {number}
                </Pagination.Item>,
            );
        }
        const paginationBasic = (
            <div >
                <Pagination>{items}</Pagination>
            </div>
        );
        return (
            <>
                <br />
                <div className="row">
                    <div className="col-md-5">
                        {/* 아직해결못함 */}
                        <CSSTransition in={clicker} classNames="click" timeout={500}>
                            <PlayBox nowSong={nowSong} setClicker={setClicker} />
                        </CSSTransition>
                    </div>
                    <div className="col-sm-7 mt-2" >
                        <Chart chart_info={props.chart_info.slice(10 * (page - 1), 10 * page)} setNowSong={setNowSong} />
                        {paginationBasic}
                    </div>
                </div>
            </>
        )
    }
}
function Chart(props) {
    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>순위</th>
                    <th>앨범</th>
                    <th>제목</th>
                    <th>가수</th>
                    <th>듣기</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.chart_info.map((a, i) => {
                        return (
                            <tr>
                                <td>{a.id}</td>
                                <td><Figure.Image src={a.image} width={50} height={50} /></td>
                                <td>{a.title}</td>
                                <td>{a.singer}</td>
                                {props.chart_info.length < 10
                                    ? <td><AlertSong pick_song={a} i={i} /></td>
                                    : <td><Button variant="secondary" onClick={() => { props.setNowSong(a) }}>Listen</Button></td>
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}

// 노래 재생 박스 (pagination)
function PlayBox(props) {
    useEffect(() => {
        props.setClicker(true);
    });
    return (
        <Card style={{ width: '30rem', height: '45rem' }} className="j_card mt-5 pt-5">
            <Card.Body>
                <ReactPlayer
                    url={props.nowSong.link}
                    className="react-player"
                    width='95%'
                    height='50%'
                    playing
                    controls={true}
                />
                <Card.Title>{props.nowSong.title}</Card.Title>
                <Card.Text>
                    <p>{props.nowSong.singer} </p>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}