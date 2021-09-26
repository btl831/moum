import React, { useEffect, useState } from 'react';
import { Button, Navbar, Container, Table, Figure, Spinner, Nav } from 'react-bootstrap';
import { Link, Route, useHistory } from 'react-router-dom';

import './App.css';
import styles from './App.module.css'
import axios from 'axios';
import AlertSong from './AlertSong.js'
import Slider from './Slider';
import GoogleButton from './Google_login';
import WritePage from './Write';
import Developer from './Developer';
import Recommend from './Recommend';
import Community from './Community';

function App() {
  let history = useHistory();
  let [loading, setLoading] = useState(true);
  let [chart_info, setChart_info] = useState([]);

  useEffect(() => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerHTML = "MOUM";

    axios.get("https://btl831.github.io/example.json")
      .then((result) => { console.log(result.data); setChart_info(result.data); setLoading(false) })
      .catch();
  }, []);

  // 로딩 UI 더 좋은거 사용하자
  if (loading) return (<>로딩중 <Spinner animation="border" variant="primary" className="spinner" /></>);

  return (
    <div className="App">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
          integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
          crossorigin="anonymous"
        />
      </head>

      {/* navbar */}
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="/" >
          <img
            alt="MOUM"
            src="/logo.png"
            height="50px"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/chart">TOP 100</Nav.Link>
            <Nav.Link href="/write">Write</Nav.Link>
          </Nav>
          <GoogleButton />
        </Container>
      </Navbar>

      {/* main page */}
      <body className="body">
        <Container>
          <Route exact path="/">
            <div className="row">
              <Slider chart_info={chart_info} />
            </div>
            <br /><br />

            {/* 가수별 Playlist */}
            <div className="row">
              <div className="col-md-6">
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
              <div className="col-md-1" />
              <div className="col-md-5 mt-5">
                <div className="row">
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
                  <Chart chart_info={chart_info.slice(undefined, 5)} />
                </div>
              </div>
            </div>
            <br /><br /><hr />

            {/* 추가요청 게시판 */}
            <br /><br />
            <div className="row">
              <h3 className="col-md-11">추가요청 게시판</h3>
              <Link to="/write" className="col-md-1">
                <Button >작성하기</Button>
              </Link>

              <div className="col-md-4 mt-2">
                <Community></Community>
              </div>
              <div className="col-md-8 mt-2" id={styles.subCommunity}>
                <a>여기에는 상세페이지 내용이 적힐 겁니다.</a>
              </div>
            </div>
          </Route>

          {/* chart */}
          <Route path="/chart">
            <br />
            <Chart chart_info={chart_info} className="mt-20 mb-5" />
          </Route>
          <Route path="/write">
            <div className={styles.full}>
              <br />
              <WritePage />
              <Button onClick={() => { history.goBack() }}>돌아가기</Button>
            </div>
          </Route>
        </Container>

        {/* developer */}
        <Route path="/developer" >
          <div className={styles.full}>
            <Developer />
          </div>
        </Route>
        <br /><br /><br />
      </body>

      {/* footer */}
      <footer className="py-4 bg-dark">
        <div className="container">
          <p className="m-0 text-center text-white">
            Copyright &copy; Btl_831 2021
          </p>
          <a onClick={() => { window.location.href = "/developer" }} style={{ color: "white" }}> developer</a>
        </div>
      </footer>
    </div>
  );
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
                <td><AlertSong pick_song={a} i={i} /></td>
              </tr>
            )
          })
        }

      </tbody>
    </Table>
  )
}

export default App;
