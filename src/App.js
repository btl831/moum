import React, { useEffect, useState} from 'react';
import { Spinner } from 'react-bootstrap';
import { BrowserRouter, Link, Route, Switch, useHistory} from 'react-router-dom';
import axios from 'axios';

import './App.css';
import Header from './main/Header'
import Body from './main/Body'
import Footer from './main/Footer'

//firebase 적용
import "firebase/firestore";

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

  // 로딩 UI 더 좋은거 사용하자
  if (loading) return (<>로딩중 <Spinner animation="border" variant="primary" className="spinner" /></>);

  return (
    <BrowserRouter>
      <div className="App">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <Header />
        <Switch>
          <body className="body">
            <Body chart_info={chart_info} />
          </body>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
