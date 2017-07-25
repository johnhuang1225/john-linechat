var linebot = require('linebot');
var express = require('express');
var _ = require('underscore');

var port = process.env.PORT || 3000;

var bot = linebot({
    channelId: process.env.channelId,
    channelSecret: process.env.channelSecret,
    channelAccessToken: process.env.channelAccessToken
});

bot.on('message', function(event) {
    if (event.message.type=='text') {
        var msg = event.message.text;
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
