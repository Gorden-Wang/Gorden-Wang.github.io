/**
 * Created by gorden on 15/10/16.
 */


var request = require("request");

var http= require("http");


http.createServer(function(req,res){

    //router


    var url = req.url;
    if(url == "/favicon.ico"){
        return;
    }

    console.log(url)
    var path = req.url.split("?")[0];
    var param = req.url.split("?")[1];
    var callback = (req.url+"").match(/callback=([^&]+)/)[1];

    request.get("http://121.199.57.142:8081/"+url,function(d,r,b){
        var result = callback+"("+b+")";
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write(result);
        res.end("");
    })


}).listen(8081);