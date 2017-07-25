var linebot = require('linebot');
var express = require('express');
// var _ = require('underscore');
var extension = require('./extension');

var port = process.env.PORT || 3000;

var bot = linebot({
    channelId: process.env.channelId,
    channelSecret: process.env.channelSecret,
    channelAccessToken: process.env.channelAccessToken
});

bot.on('message', function(event) {
    if (event.message.type=='text') {
        var msg = event.message.text;
        // var replyMsg = rateAnswer(msg);
        var replyMsg = findExt(msg);

        event.reply(replyMsg).then(function(data) {
            console.log(`replyMsg: ${replyMsg}`);
        }).catch(function(error) {
            console.log('error');
        });
    }
});



const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);


app.listen(port, function() {
    console.log(`linebot now running on port ${port}`);
});



function findExt(msg) {
    var replyMsg = '';
    extension.exts.forEach(function(element) {
        if (element.cname.toLowerCase().indexOf(msg.toLowerCase()) != -1 ||
            element.name.toLowerCase().indexOf(msg.toLowerCase()) != -1) {
            replyMsg += `${element.cname} ${element.name} 分機: ${element.ext}\n`;
        }
        if (replyMsg.length==0) {
            replyMsg = '查無此人，請輸入中文名字或英文名字';
        }
    });
    return replyMsg;
}


function rateAnswer(msg) {
    var regex = /^[1-9]{1}[0-9]*$/;
    var replyMsg = '你說什麼我不知道，請你輸入數字';
    if (regex.test(msg)) {
        if (0<=msg && msg<=500){
            replyMsg = `換人民幣 ${msg}, 匯率：4.50`;
        }
        else {
            replyMsg = `換人民幣 ${msg}, 匯率：4.49`;
        }
    }
    return replyMsg;
}