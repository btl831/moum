import React, { useEffect, useState} from 'react';
import { Spinner } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import axios from 'axios';

import styles from './App.module.css';
import MainPage from './mainPage/MainPage'

import Header from './fixedComponent/Header'
import Footer from './fixedComponent/Footer'
import Developer from './fixedComponent/Developer';

import Body from './music/Body'
import WritePage from './music/etc/Write';
import ChartPage from './music/features/Chart';
import ListPage from './music/community/ListPage';
import Detail from './music/community/Detail';
import Chatroom from './music/community/Chatroom.js'

import Wordle from './game/wordle/Wordle.js'
import Wordle_Ranking from './game/wordle/Wordle_Ranking.js'
import Login from './firebase/Login';

function App() {
  let [loading, setLoading] = useState(true);
  let [chart_info, setChart_info] = useState([]);

  useEffect(() => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerHTML = "MOUM";

    axios.get("https://btl831.github.io/example.json")
      .then((result) => { console.log(result.data); setChart_info(result.data); setLoading(false) })
      .catch();
  }, []);

  // 로딩 UI
  if (loading) return (<>로딩중 <Spinner animation="border" variant="primary" className={styles.Spinner} /></>);

  return (
    <div className={styles.App}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossorigin="anonymous"
        />
      </head>
      <body>
        <div className='header'>
          <Header />
        </div>
        <div className={styles.wrapper}>
          <div className='body-content'>
            <Route exact path="/" component={MainPage}/>
            <Route path="/music" render={() => <Body chart_info={chart_info} />}/>
            <Route path="/chart" render={() => <ChartPage chart_info={chart_info} className="mt-20 mb-5" />} />
            <Route path="/write" component={WritePage} />
            <Route path="/login" component={Login} />
            <Route path="/developer" component={Developer}/>
            <Route path="/list" component={ListPage}/>
            <Route path="/detail/:id" component = {Detail}/>
            <Route path="/chatroom" component={Chatroom}  />
            <Route exact path="/game/wordle" component = {Wordle}/>
            <Route exact path="/game/wordle/ranking" component = {Wordle_Ranking}/>
          </div>
        </div>
        <Footer/>
      </body>
    </div>
  );
}

export default App;