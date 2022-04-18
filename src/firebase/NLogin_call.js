import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";



export default function NLogin_call(){
    const location = useLocation();  
    const getNaverToken = () => {
        
        if (!location.hash) return;
        const token = location.hash.split('=')[1].split('&')[0]; //token 출력
        const userData = axios.get('https://openapi.naver.com/v1/nid/me', {
            headers : {
                'Authorization' : `Bearer ${token}`,
            }
        })
        .then((res)=> {
            window.location.replace('/')
            console.log(userData);
        //서버측에서 로직이 완료되면 홈으로 보내준다
        })
    };


    useEffect(() => {
    getNaverToken();
    }, []);
    }
    // return(
    //     <div>성공</div>
    // )
