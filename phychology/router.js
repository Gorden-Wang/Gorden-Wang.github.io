/**
 * Created by Gorden on 16/5/8.
 */
var Request = require("request");
var http = require("http");
var url = require("url");
var querystring = require("querystring")
var RouterURL = "http://icefox-cool.xicp.net";
//127.0.0.1:3000/?r=index.php?r=default/api/square&callback=123
//http.createServer(function (req, resp) {
//    var postData = "";
//    var info = "";
//    var path = url.parse(req.url);
//    console.log(path);
//    var u = RouterURL + path.path;
//    if (req.method === "GET") {
//        Request.get(u).pipe(resp);
//    } else {
//        //console.log(req.postData);
//        //req.pipe(Request.post(u)).pipe(resp);
//    }
//
//    req.addListener("data", function (postDataChunk) {
//        postData += postDataChunk;
//
//        console.log(postData)
//    });
//
//    req.addListener("end", function (postDataChunk) {
//        var data = querystring.parse(postData);
//        Request.post({
//            url : RouterURL + req.url.split("?")[0],
//            form : data,
//            headers: {
//                Host: "icefox-cool.xicp.net",
//                Origin: "http://icefox-cool.xicp.net"
//            }
//        },function(e,h,b){
//            resp.end(b);
//        })
//
//
//    });
//
//
//}).listen(80);



//http.createServer(function (req, resp) {
//    //console.log(url.parse(req.url));
//    var u = url.parse(req.url);
//
//
//    if(req.method === 'GET'){
//
//    }else{
//
//    }
//    var pathname = url.pathname;
//    var query = url.query;
//
//
//
//
//
//
//
//}).listen(80);

//
//Request.post({
//    url : 'http://icefox-cool.xicp.net/zayi/app/user/smscode',
//    form : {
//        callPhone : '18510249866',
//        codeType : 1
//    },
//    headers:{
//        Host : "icefox-cool.xicp.net",
//        Origin : "http://icefox-cool.xicp.net"
//    }
//
//},function(e,h,b){
//    console.log(b);
//})

Request.get({
    url: "http://icefox-cool.xicp.net/zayi/app/resources/tags",
    headers: {
        Host: "icefox-cool.xicp.net",
        //Origin: "http://icefox-cool.xicp.net"
    }
}, function (e, h, r) {
    console.log(r)
})