import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import styles from './App.module.css'
import MainPage from './mainPage/MainPage'

import Login from './firebase/Login'
import NaverLogin from './firebase/NaverLogin'
import Header from './fixedComponent/Header'
import Footer from './fixedComponent/Footer'
import Developer from './fixedComponent/Developer'

import MusicPage from './music/MusicPage'
import WritePage from './music/etc/Write';
import ChartPage from './music/features/Chart';
import ListPage from './music/community/ListPage';
import Detail from './music/community/Detail';
import Chatroom from './music/community/Chatroom';

import GamePage from './game/GamePage'
import Wordle from './game/wordle/Wordle';
import WordleRanking from './game/wordle/WordleRanking';

function App() {
  let [loading, setLoading] = useState(true);
  let [chart_info, setChart_info] = useState([]);

  useEffect(() => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerHTML = "MOUM";

    axios.get("https://btl831.github.io/example.json")
      .then((result) => { setChart_info(result.data); setLoading(false) })
      .catch();
  }, []);

  // 로딩 UI
  if (loading) return (<>로딩중 <Spinner animation="border" variant="primary" className={styles.Spinner} /></>);

  return (
    <div className={styles.App}>
      <div>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />
      </div>
      <div>
        <Header />
        <div className={styles.wrapper}>
          <Routes>
            <Route path="/">
              <Route path="" element={<MainPage />} />
              <Route path="login" element={<Login />} />
              <Route path="naver" element={<NaverLogin />} />
              <Route path="developer/*" element={<Developer />}/>

              <Route path="music">
                <Route path="" element={<MusicPage chart_info={chart_info} />} />
                <Route path="chart" element={<ChartPage chart_info={chart_info} className="mt-20 mb-5" />} />
                <Route path="write" element={<WritePage />} />
                <Route path="list" element={<ListPage />}/>
                <Route path="detail/:id" element={<Detail />}/>
                <Route path="chatroom" element={<Chatroom />} />
              </Route>
              
              <Route path="game">
                <Route path="" element={<GamePage />} />
                <Route path="wordle" element={<Wordle />}/>
                <Route path="wordle/ranking" element={<WordleRanking />}/>
              </Route>
            </Route>
          </Routes>
        </div>
        <Footer/>
      </div>
    </div>
  );
}

export default App;