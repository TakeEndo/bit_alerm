'use strict';
const exec = require('child_process').exec;
let https = require('https');
const price = require('./price');
const URL = "https://api.bitflyer.jp/v1/ticker?product_code=BTC_JPY";
https.get(URL, (res) => {
    let body = '';
    res.setEncoding('utf8');

    res.on('data', (chunk) => {
        body += chunk;
    });
    res.on('end', (res) => {
        res = JSON.parse(body);
        const ltp = parseInt(res.ltp,10);

        if (ltp > price.max){
            exec('osascript -e \'display notification "高値！ ¥' + ltp + '"\'');
        } else if (ltp < price.min){
            exec('osascript -e \'display notification "安値！ ¥' + ltp + '"\'');
        }
    });
}).on('error', (e) => {
    console.log(e.message); //エラー時
});