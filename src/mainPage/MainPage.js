import { Container } from 'react-bootstrap';
import styles from './MainPage.module.css'

export default function MainPage() {
    return (
        <>
        <Container>
            <div className="row" style={{height:"50px"}} />
            <div className="row">
                <img src="mainPage/MOUM.svg" alt="MOUM" /> 
            </div>
            <div className="row" style={{height:"100px"}} />
            <div className="row mt-3" >
                <div className="col-sm-1 col-md-3" />
                <div className="col-sm-5 col-md-3">
                    <div className={styles.boxContainer}>
                        <p className={styles.text}>
                            &nbsp;&nbsp;음악페이지로!
                        </p>
                        <button className={styles.btn} onClick={()=>window.location.href="/music"}>
                            <img src="mainPage/music.png" alt="" className={styles.image} width="260"/>
                        </button>
                    </div>
                </div>
                <div className="col-sm-5 col-md-3">
                    <div className={styles.boxContainer}>
                        <p className={styles.text}>&nbsp;&nbsp;게임페이지로!</p>
                        <button className={styles.btn} onClick={()=>window.location.href="/game"}>
                            <img src="mainPage/game.jpg" alt="" className={styles.image} height="200"/>
                        </button>
                    </div>
                </div>
                <div className="col-sm-1 col-md-3" />
            </div>
        </Container>
        </>
    );
}