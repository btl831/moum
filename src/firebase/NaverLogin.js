import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { db } from './fBase';

function NaverLogin() {
    const initializeNaverLogin = () => {
        const { naver } = window
        const naverLogin = new naver.LoginWithNaverId(
            {
            clientId: "NNJFr1UPv2ZgMcuk7WsY",
            callbackUrl: "http://localhost:3000/naver",
            isPopup: false,
            loginButton: { color: "green", type: 3, height: 40 }
            }
        );
        naverLogin.init();
    }

    useEffect(() => {
        initializeNaverLogin();
    }, []);

    const navigate = useNavigate();
    const location = useLocation(); 
    const getNaverToken = async () => {
        if (!location.hash) return;
        const token = location.hash.split('=')[1].split('&')[0];
        const axios = require('axios');
        var userData;
        try {
            await axios.get('/api/v1/nid/me', {
                headers : {
                    'Authorization' : `Bearer ${token}`,
                    'Access-Control-Allow-Origin' : "*",
                }
            }).then((res) => {
                userData = res.data.response;
            });
        } catch(err) {
            console.log(err);
        }

        var userprofile = {
            realName : userData.name,
            email : userData.email,
            displayName : (userData.nickname)?userData.nickname:userData.name
        }

        await db.collection('user').doc(userData.id).set(userprofile);
        localStorage.setItem('user', JSON.stringify(userprofile));
        navigate(-3);
    };

    useEffect(() => {
        getNaverToken();
    }, []);
    
    return(
        <div className="grid-naver" id="naverIdLogin"></div>
    )
}
export default NaverLogin;