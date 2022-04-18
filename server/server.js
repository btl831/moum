const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 4000;

app.get('/user/login', (req, res) => {
    naverLogin();
})

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})


let clientId = ''
let clientSecret = ''
let token = ''

let randomId = '' // 클라이언트에게 전달될 값

const naverLogin = async () => {
    let accessTokenRequestURL = `https://nid.naver.com/oauth2.0/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=authorization_code&state=${randomId}&code=${token}`

    let auctualTokenRequestResponse = await axios.get(
        accessTokenRequestURL
    )

    if (auctualTokenRequestResponse.data) {
        let accessToken =
            auctualTokenRequestResponse.data.access_token
        let response = await axios.get(
            'https://openapi.naver.com/v1/nid/me',
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        )
    }

    if (response.data) {
        //console.log('NAVER OK!')
        //console.log(JSON.stringify(response.data))
        /**
            resultcode: "00"
            message: "success"
            response:
                id: "1234"
                nickname: ""
                profile_image: ""
                age: "10-20"
                gender: "M"
                email: "blabla@naver.com"
                name: "이름름"
                birthday: "01-01"
         */
    }
}