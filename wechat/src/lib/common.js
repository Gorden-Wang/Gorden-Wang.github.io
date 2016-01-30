/**
 * Created by gorden on 14-8-29.
 */
window.Wlib = (function () {
    function lib(evn, ver) {
        this.evn = evn;
        this.ver = ver || "2014.8.8"
    }

    lib.prototype = {
        config: function () {
            var urls = {};
            switch (this.evn) {
                case 'publish' :
                    urls.port = "https://ssl.instarekber.com/vshop/1/H5/";
                    urls.portNew = "https://ssl.instarekber.com/ushop/h5/";
                    urls.port2 = "https://ssl.instarekber.com/ushop";
                    urls.apiPort = "http://api.instarekber.com";
                    urls.loginPort = "https://login.instarekber.com/ushop";
                    urls.instaUrl = "http://www.instarekber.com/eula.html";
                    break;
                case 'daily' :
                    urls.port = "https://ssl-test.instarekber.com/vshop/1/H5/";
                    urls.portNew = "https://ssl-test.instarekber.com/ushop/h5/";
                    urls.port2 = "https://ssl-test.instarekber.com/ushop";
                    urls.apiPort = "http://api.test.instarekber.com";
                    urls.loginPort = "https://ssl-test.instarekber.com/ushop";
                    urls.imUrlPort = "./chat/";
                    urls.instaUrl = "http://www-test.instarekber.com/eula.html";
                    break;
                case 'local' :
                    urls.port = "https://ssl-test.instarekber.com/vshop/1/H5/";
                    urls.portNew = "https://ssl-test.instarekber.com/ushop/h5/";
                    urls.port2 = "https://ssl-test.instarekber.com/ushop";
                    urls.apiPort = "http://api.test.instarekber.com";
                    urls.loginPort = "https://ssl-test.instarekber.com/ushop";
                    urls.imUrlPort = "./chat/";
                    urls.instaUrl = "http://www-test.instarekber.com/eula.html";
                    break;
            }
            return urls;
        },
        getRequestParam: function (param, uri) {
            var value;
            uri = uri || window.location.href;
            value = uri.match(new RegExp('[\?\&]' + param + '=([^\&\#]*)([\&\#]?)', 'i'));
            return value ? decodeURIComponent(value[1]) : value;
        },
        tips: function (txt, callback, noClose) {
            if (!noClose) {
                var bgwrapper = $("<div class = 'fixed tipsfadeIn tipsanimated'>" + txt + "</div>");
            } else {
                var bgwrapper = $("<div class = 'fixed tipsfadeInNo tipsanimated'>" + txt + "</div>");
            }

            $("body").append(bgwrapper);
            setTimeout(function () {
                if (!noClose) {
                    $(bgwrapper).remove();
                    callback && callback();
                }
            }, 3000);
        },
        removeTips: function (callback) {
            var bg = $(".tipsfadeIn");
            if (bg.length > 0) {
                $(bg).remove();
                callback();
            } else {
                callback();
            }
        },
        checkLogin: function (url, callback) {
            var that = this;
            //localStorage.clear();
            that.checkExpire();
            var userid = that.getUserid();
            var token = that.getRequestParam("token") || localStorage.getItem("token");
            token && localStorage.setItem("token", token);
            var desurl = document.domain != "www.hmsgtech.com" ? "http://test.hmsgtech.com/wechatserver/wechatLoginUrl" : "http://www.hmsgtech.com/wechatserver/wechatLoginUrl";
            //if (!that.isWeixin()) {
            //    alert("请在微信中打开。");
            //    return;
            //}

            if (!userid && !token) {
                $.ajax({
                    url: desurl + "?callback=?&re_url=" + encodeURIComponent(url || location.href),
                    dataType: "JSONP",
                    success: function (res) {

                        location.replace(res.value);
                    },
                    error: function (err) {
                        alert("获取授权数据失败，请重试");
                    }
                })
            } else {
                callback && callback();
            }
        },
        forceLogin: function (url, callback) {
            var that = this;
            var desurl = document.domain != "www.hmsgtech.com" ? "http://test.hmsgtech.com/wechatserver/wechatLoginUrl" : "http://www.hmsgtech.com/wechatserver/wechatLoginUrl";
            var nexturl = url || location.href;

            if( location.pathname.indexOf("/share/") > -1){
                //如果是share出去的页面
                if( Wlib.getRequestParam("share")=="true" && !Wlib.getRequestParam("userid",nexturl)){
                    //如果没有进行授权
                    $.ajax({
                        url: desurl + "?callback=?&re_url=" + encodeURIComponent(nexturl),
                        dataType: "JSONP",
                        success: function (res) {

                            location.replace(res.value);
                        },
                        error: function (err) {
                            alert("获取授权数据失败，请重试");
                        }
                    })
                }else{
                    //已经进行授权

                    callback && callback();
                }

            }else{
                //不是share出去的页面
                if (!Wlib.getRequestParam("userid",nexturl)) {
                    $.ajax({
                        url: desurl + "?callback=?&re_url=" + encodeURIComponent(nexturl),
                        dataType: "JSONP",
                        success: function (res) {

                            location.replace(res.value);
                        },
                        error: function (err) {
                            alert("获取授权数据失败，请重试");
                        }
                    })
                }else{
                    callback && callback();
                }
            }



        },
        getToken : function(callback){
            //http://www.hmsgtech.com/wechatserver/login?callback=callback&userid=U000001304
            var desurl = document.domain != "www.hmsgtech.com" ? "http://test.hmsgtech.com/wechatserver/login" : "http://www.hmsgtech.com/wechatserver/login";

            $.ajax({
                url: desurl + "?callback=?&userid="+localStorage.getItem("userId"),
                dataType: "JSONP",
                success: function (res) {
                    if(res.errorCode == 0){
                        localStorage.setItem("token",res.value);
                        callback && callback();

                    }else{
                        alert("用户识别错误，请重新授权");
                        window.location.href = "../../pages/index/index.html";
                    }

                },
                error: function (err) {
                    alert("获取授权数据失败，请重试");
                }
            })
        },
        checkExpire: function () {
            var that = this;
            var ls_time = localStorage.getItem("time");
            var now_time = new Date().getTime();
            localStorage.setItem("token", '');
            if (ls_time) {
                //超时25分钟
                if (now_time - ls_time > 25 * 60 * 1000) {
                    localStorage.setItem("userId", '');
                    localStorage.setItem("token", '');
                    localStorage.setItem("time", now_time);
                }
            } else {
                localStorage.setItem("time", now_time);
            }
        },
        getUserid: function () {
            var that = this;
            //request userid 优先级最高。
            var id = that.getRequestParam("userid");
            id ? localStorage.setItem("userId", id) : localStorage.getItem("userId")
            return id;
        },
        isWeixin: function () {
            return !!(navigator.userAgent.toLowerCase().indexOf("micromessenger") > -1);
        },
        wx: {
            getJS: function (url, callback) {
                var desurl = document.domain != "www.hmsgtech.com" ? "http://test.hmsgtech.com/wechatserver/jsapiSign" : "http://www.hmsgtech.com/wechatserver/jsapiSign";
                $.ajax({
                    url: desurl + "?callback=?&url=" + encodeURIComponent(url || location.href),
                    dataType: "JSONP",
                    success: function (res) {

                        wx.config({
                            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: "wx9ade35641403eb00", // 必填，公众号的唯一标识
                            timestamp: res.value.timestamp, // 必填，生成签名的时间戳
                            nonceStr: res.value.noncestr, // 必填，生成签名的随机串
                            signature: res.value.sign,// 必填，签名，见附录1
                            jsApiList: [
                                'onMenuShareTimeline',
                                'onMenuShareAppMessage',
                                'onMenuShareQQ',
                                'onMenuShareWeibo',
                                'onMenuShareQZone',
                                'hideMenuItems',
                                'showMenuItems'
                            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        });

                        //默认关掉QQ相关，有下载着陆页面后再打开

                        wx.ready(function(){
                            wx.hideMenuItems({
                                menuList: [
                                    "menuItem:share:qq",
                                    "menuItem:share:weiboApp",
                                    "menuItem:share:QZone",
                                    "menuItem:share:appMessage",
                                    "menuItem:share:timeline",
                                    "menuItem:copyUrl",
                                    "menuItem:openWithQQBrowser",
                                    "menuItem:openWithSafari",
                                    "menuItem:share:email",
                                    "menuItem:favorite"
                                ], // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                                success: function () {

                                }
                            });
                        })

                        callback && callback();

                    },
                    error: function (err) {
                        alert("获取JSAPI失败");
                    }
                })
            },
            shareTo: function (title, desc, link, img, success, cancel) {
                wx.showMenuItems({
                    menuList : [
                        "menuItem:share:appMessage",
                        "menuItem:share:timeline"
                    ],
                    success : function(){

                    }

                });

                var urlPre = document.domain != "www.hmsgtech.com" ? "http://test.hmsgtech.com/wechat" : "http://www.hmsgtech.com/wechat";
                var t = title || "伊健康，您身边的健康专家";
                var d = desc || "";
                var l = addShareParam(link || location.href.split("#")[0]);
                var i = img || "/images/about/logo.png";
                wx.onMenuShareTimeline({
                    title: t, // 分享标题
                    link: l, // 分享链接
                    imgUrl: urlPre + i, //'../../images/about/logo.png', // 分享图标
                    success: function () {
                        success && success()
                    },
                    cancel: function () {
                        cancel && cancel()
                    }
                });
                wx.onMenuShareAppMessage({
                    title: t, // 分享标题
                    link: l, // 分享链接,
                    desc: d,
                    imgUrl: urlPre + i, //'../../images/about/logo.png', // 分享图标
                    success: function () {
                        success && success()
                    },
                    cancel: function () {
                        cancel && cancel()
                    }
                });

                function addShareParam(url){
                    var res = '',
                        doarr = url.split("?"),
                        first = doarr[0],
                        param = doarr.length > 0 ? doarr[1].split("&") : [],
                        resArr = [];

                    for(var i = 0 ;i <param.length;i++){
                        if(param[i].indexOf("userid=",0)==0 || param[i].indexOf("token=",0)==0 || param[i].indexOf("share=",0) == 0){

                        }else{
                            console.log(param[i]);
                            resArr.push(param[i]);
                        }
                    }
                    resArr.push("share=true");
                    return first+"?"+resArr.join("&");
                }
            },
            hideShare: function () {
                wx.hideMenuItems({
                    menuList: [
                        "menuItem:exposeArticle",
                        "menuItem:share:appMessage",
                        "menuItem:share:timeline"
                    ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                });
            }


        },
        alert: function (content, btn, callback) {
            var bgwrapper = $("<div class = 'fixed fadeIn animated'>" + content + "</div>");
            bgwrapper.append("<button>btn</button>");
            $("body").append(bgwrapper);
            $(bgwrapper).find("button").on("click", function () {
                callback ? callback() : $(bgwrapper).remove();
            })

        },
        remove_alert: function (callback) {
            $("#_alert_bg").fadeOut(function () {
                $(this).remove();
                callback && callback();
            })
        },
        addShareParam : function(url){
            var res = '',
                doarr = url.split("?"),
                first = doarr[0],
                param = doarr.length > 0 ? doarr[1].split("&") : [],
                resArr = [];

            for(var i = 0 ;i <param.length;i++){
                if(param[i].indexOf("userid=",0)==0 || param[i].indexOf("token=",0)==0 || param[i].indexOf("share=",0) == 0 || param[i].indexOf("openid=",0) == 0){

                }else{
                    console.log(param[i]);
                    resArr.push(param[i]);
                }
            }
            resArr.push("share=true");
            return first+"?"+resArr.join("&");
        },
        confirm: function (tle, btnA, btnB, submit_fun, cancel_fun) {
            var _d = document;
            var _confirm_bg = _d.createElement("div");
            _confirm_bg.setAttribute("id", "_confirm_bg");
            _d.body.appendChild(_confirm_bg);

            var _confirm_content = _d.createElement("div");
            _confirm_content.setAttribute("id", "_confirm_content");
            _confirm_bg.appendChild(_confirm_content);

            var _wrap = $("#_confirm_content");

            var _temp = "";
            _temp = _temp + "<p>" + tle + "</p>";
            _temp = _temp + "<em id='_confirm_shadowA'>&nbsp;</em>";
            _temp = _temp + "<em id='_confirm_shadowB'>&nbsp;</em>";
            _temp = _temp + "<div id='_confirm_btnW'>";
            if (btnB[0]) {//B按钮有
                _temp = _temp + "<div id='_confirm_btnA' class='" + btnA[1] + "'><span>" + btnA[0] + "</span></div>";
                _temp = _temp + "<em id='_confirm_shadowC'>&nbsp;</em>";
                _temp = _temp + "<em id='_confirm_shadowD'>&nbsp;</em>";
                _temp = _temp + "<div id='_confirm_btnB' class='" + btnB[1] + "'><span>" + btnB[0] + "</span></div>";
            }
            else {
                _temp = _temp + "<div id='_confirm_btnA' class='" + btnA[1] + "' style='width:100%'>" + btnA[0] + "</div>";
            }
            _temp = _temp + "</div>";

            _wrap.html(_temp).addClass("fixed fadeIn animated").show();

            $("#_confirm_btnA").bind("click", function () {/*cancel*/
                cancel_fun && cancel_fun();

                $("#_confirm_bg").remove();

            })
            if (btnB[0]) {//B按钮有
                $("#_confirm_btnB").bind("click", function () {/*submit*/
                    submit_fun();

                    $("#_confirm_bg").remove();

                })
            }
        },
        _bindLazyLoad: function () {
            var imgCons = $('.lazy-image');

            function interval() {
                setTimeout(function () {
                    check();
                }, 30);
            }

            function detach() {
                window.removeEventListener('scroll', interval, false);
                window.removeEventListener('resize', interval, false);
            }

            function check() {
                var winHeight = window.innerHeight, scrollTop = window.pageYOffset, i = 0, con, img, offset;

                while (i < imgCons.length) {
                    con = $(imgCons[i]);
                    offset = con.offset();
                    if (scrollTop + winHeight + 20 >= offset.top) {
                        img = $(con);
                        $(img[0]).attr("src", img.attr('lazy-image'));
                        $(img[0]).removeClass("lazy-image");
                        [].splice.call(imgCons, i, 1);
                        i--;
                        if (!imgCons.length) {
                            detach();
                        }
                    }
                    i++;
                }
            }


            window.addEventListener('scroll', interval, false);
            window.addEventListener('resize', interval, false);

            check();
        },
        _bindScrollTobottom: function (callback, tag) {

            function interval() {
                setTimeout(function () {
                    check();
                }, 1);
            }

            function detach() {
                window.removeEventListener('scroll', interval, false);
                window.removeEventListener('resize', interval, false);
            }

            function check() {
                var winHeight = window.innerHeight, scrollTop = window.pageYOffset, i = 0, con, img, offset;

                offset = $("body").height();
                if (scrollTop + winHeight + 50 >= offset) {
                    detach();
                    callback && tag && callback();
                }
            }


            window.addEventListener('scroll', interval, false);
            window.addEventListener('resize', interval, false);

            check();
        },
        getUserId: function () {
            return Wlib.getRequestParam("userId") || localStorage.getItem("userId") || "";
        },
        SendRequest: function (method, data, success, error) {
            var that = this;
            var body = {
                "channel": "102",
                "method": method,
                "token": localStorage.getItem("token") || "",
                "version": "1.0.2.0830",
                "params": data
            }

            var url = (function () {
                var u = that.evn == "daily" ? "http://182.92.216.40/xiaomianao/request?body=" : "http://182.92.118.70/xiaomianao/request?body=";


                return u + JSON.stringify(body);
            })();

            $.ajax({
                url: url + "&callback=?",
                dataType: "JSONP",
                success: function (res) {
                    success(res);
                },
                error: function (err) {
                    error && error(err);
                }
            })
        },
        SendRequestNew: function (method, next, data, success, error) {

            var that = this;
            var plateform = (function (str) {
                if (str.match(/iPhone|iPod|iPad/)) {
                    return 2
                } else {
                    return 1
                }
            })(navigator.userAgent);

            var body = {
                "deviceid": "",
                "channel": "102",
                "clientVersion": "H5",
                "method": method,
                "requestType": next,
                "token": that.getRequestParam("token") || localStorage.getItem("token") || "",
                "version": "1.0.2.0830",
                "platform": plateform,
                "params": data
            }

            var url = (function () {
                var u = document.domain != "www.hmsgtech.com" ? "http://182.92.216.40/adapter/api/requestH5?body=" : "http://www.hmsgtech.com/adapter/api/requestH5?body=";


                return u + JSON.stringify(body);
            })();

            $.ajax({
                url: url + "&callback=?",
                dataType: "JSONP",
                success: function (res) {
                    if (res.errorCode == "1008") {
                        //token 无效，重新登录，去除url上的token，openid,userid,然后forceLogin
                        //var url = location.href
                        //
                        //var domain = document.domain,
                        //    u = location.href,
                        //    p = location.protocol + "//",
                        //    s = u.split("?")[1] || "",
                        //    m = s.length > 0 ? s.split("&") : [],
                        //    i = 0,
                        //    len = m.length,
                        //    des = [],
                        //    url;
                        //
                        //for (i = 0; i < len; i++) {
                        //    if (m[i].indexOf("userid") !== 0 && m[i].indexOf("userId") !== 0 && m[i].indexOf("token") !== 0 && m[i].indexOf("openid") !== 0) {
                        //        des.push(m[i]);
                        //    }
                        //}
                        //url = u.split("?")[0] + (des.length > 0 ? "?" + des.join("&") : "");

                        //alert("登录失效，重新授权");
                        //
                        //Wlib.forceLogin(url, function () {
                        //});

                       that.getToken(function(){
                           that.SendRequestNew(method, next, data, success, error);
                       });



                    }

                    success(res);
                }
                ,
                error: function (err) {
                    error && error(err);
                }
            })
        },
        GetJsonData: function (url, success, error) {
            $.ajax({
                url: url,
                dataType: "JSON",
                success: function (res) {
                    success(res);
                },
                error: function (err) {
                    error && error(err);
                }
            })
        },
        GetScript: function (url, success, error) {
            $.ajax({
                url: url,
                dataType: "script",
                success: function (res) {
                    success(res);
                },
                error: function (err) {
                    error && error(err);
                }
            })
        }

    };
    return new lib("publish", "");
})($);

