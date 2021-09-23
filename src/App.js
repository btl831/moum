import React, { useEffect, useState } from 'react';
import {
  Button, Navbar, Container, Carousel, Card, Row, Table, ListGroup,
  Figure, Spinner, Nav
} from 'react-bootstrap';
import './App.css';
import { Link, Route, useHistory } from 'react-router-dom';
import axios from 'axios';
import AlertSong from './AlertSong.js'
import GoogleButton from './Google_login';
import WritePage from './Write';
import Developer_intro from './Developer';


function App() {
  let history = useHistory();
  let [loading, setLoading] = useState(true);
  let [chart_info, setChart_info] = useState([]);
  var [cardpage, setCardpage] = useState([1, 2, 3]);

  useEffect(() => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerHTML = "Btl831";

    axios.get("https://btl831.github.io/example.json")
      .then((result) => { console.log(result.data); setChart_info(result.data); setLoading(false) })
      .catch();
  }, []);

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
            alt=""
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          BTL 831 INTRO
        </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/chart">TOP 100</Nav.Link>
            <Nav.Link href="/write">Write</Nav.Link>
          </Nav>
          <GoogleButton />
        </Container>
      </Navbar>

      {/* 첫번째 라우트 */}

      {/* 첫번째 섹션 */}
      <body className="body">
        <div className="container">

          <Route exact path="/">
            <div className="row">
              <hr />

              {/* 3페이지 짜리 카드 */}
              <Carousel className="carousel">
                {
                  cardpage.map((k, y) => {
                    return (
                      <Carousel.Item>
                        <Row className="justify-content-md-center">

                          {
                            chart_info.slice(3 * y, 3 * (y + 1)).map((a, i) => {
                              return (<Card_Jumbo pick_song={a} i={i} />)
                            })
                          }

                        </Row>
                      </Carousel.Item>
                    )
                  })
                }
              </Carousel>
            </div>
            <br />
            <br />


            {/* 두번째 섹션 */}
            <div className="row">
              <div className="col-md-7 sub_title ">
                <hr />
                <h6 className="mt-1">가수별 Playlist</h6>
                <hr />
                <Container className="row">
                  <div className="col-md-5 box ">
                    <Recommend />
                  </div>

                  <div className="col-md-5 box ">
                    <Recommend />
                  </div>
                </Container>
              </div>

              <div className="col-md-5 ">

                <h6 className="mr-10">TOP 100 &nbsp;&nbsp;
                  <Link to="/chart"><Button className="secondary">더보기</Button></Link>
                </h6>
                <Chart chart_info={chart_info.slice(undefined, 5)} />
              </div>
            </div>
            <hr />

            {/* 네번째 섹션 */}
            <div className="row">
              <h3 className="col-md-11">추가요청 게시판</h3>
              <Link to="/write" className="col-md-1"><Button >작성하기</Button></Link>

              <div className="col-md-4 mt-2">
                <Community></Community>
              </div>
              <div className="col-md-8 mt-2 sub_community">
                <a>여기에는 상세페이지 내용이 적힐 겁니다.</a>
              </div>
            </div>

            {/* container 마무리 */}
          </Route>

          {/* <Route path = "/title" component = {Card_Jumbo}/> */}
          <Route path="/chart">
            <br />
            <Chart chart_info={chart_info} className="mt-20 mb-5" />
          </Route>
          <Route path="/write">
            <div class="full">
              <br />
              <WritePage />
              <Button onClick={() => { history.goBack() }}>돌아가기</Button>
            </div>
          </Route>
        </div>

        <Route path="/developer" >
          <div class="full">
            <Developer_intro />
          </div>
        </Route>
        <br />
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

function Card_Jumbo(props) {
  return (
    <Card style={{ width: '18rem', height: '30rem' }} className="j_card mt-5" >
      <Card.Img variant="top" src={props.pick_song.image} className="mt-3" />
      <Card.Body>
        <Card.Title>{props.pick_song.title}</Card.Title>
        <Card.Text>
          <p>가수 :{props.pick_song.singer} </p>
        </Card.Text>

      </Card.Body>
      <AlertSong pick_song={props.pick_song} i={props.i} />
      <hr/>
    </Card>
  )
}

function Recommend() {
  return (
    <Figure className="mt-3">
      <Figure.Image
        width={180}
        height={180}
        alt="180x180"
        src="https://i.ytimg.com/vi/tHmc2mAXZSA/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDLny-RWs_I2o50OjZfWAA1vyNHRg"
        
        // 미구현
        onClick = {()=>{<AlertSong />}}
      />
      <Figure.Caption>
        [Playlist] J-POP 입문은 이 밴드로! 2021 요루시카 노래 모음 Yorushika songs ヨルシカ (15곡)
      </Figure.Caption>
    </Figure>
  )
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

function Community() {
  return (
    <ListGroup variant="flush">
      <ListGroup.Item variant="secondary">최근 게시물 1</ListGroup.Item>
      <ListGroup.Item variant="secondary">최근 게시물 2</ListGroup.Item>
      <ListGroup.Item variant="secondary">최근 게시물 3</ListGroup.Item>
      <ListGroup.Item variant="secondary">최근 게시물 4</ListGroup.Item>
    </ListGroup>
  )
}

export default App;
