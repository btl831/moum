
import React, { Component, useEffect } from 'react';
import { db } from './fBase';
import {axios} from 'axios'

function NaverLogin() {

    
    const Naver =()=> {
        const naverLogin = new window.naver.LoginWithNaverId({
            clientId: "jsIZ08qqS6zaoW5Gvz59",
            callbackUrl: "http://127.0.0.1:4000/",
            isPopup: false,
            loginButton: { color: "green", type: 1, height: 25 },
            callbackHandle: true,
        });

        // 네이버 로그인 초기화
        naverLogin.init();
        naverLogin.logout();

        naverLogin.getLoginStatus((status) => {
            if (status) {
                console.log("Naver 로그인 상태", naverLogin.user);

                // var naver_id_login = new naver_id_login("jsIZ08qqS6zaoW5Gvz59", "http://localhost:3000/")
                // var uid = naver_id_login.getProfileData('email');
                // var displayName = naver_id_login.getProfileData('name');

                // var userprofile = {
                //     displayName :displayName ,
                //     uid : uid
                // }

                // localStorage.setItem('user',JSON.stringify(userprofile));
                // db.collection('user').doc(uid).set(userprofile);
                // GetProfile()
                console.log("success");
            }
            else {
                console.log("Naver 비로그인 상태")
            }
        })
    }


    return <div id="naverIdLogin"></div>
}
export default NaverLogin;