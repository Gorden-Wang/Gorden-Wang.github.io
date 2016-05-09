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
        alert: function (content, btn, callback) {
            var sty = "color: white;text-align: center;font-size: 15px;margin-top: 20px; width: 5em;height: 3em;"
            var bgwrapper = $("<div class = 'fixed fadeIn animated' style='z-index: 502'>" + content + "</div>");
            if(btn){
                bgwrapper.append("<button style='" + sty + "'>" + btn + "</button>");
            }

            $("body").append("<div class='alert-bg'></div>");
            $("body").append(bgwrapper);
            $(bgwrapper).find("button").on("click", function () {
                callback ? callback() : $(bgwrapper).remove(), $(".alert-bg").remove();
            })


        },
        remove_alert: function (callback) {
            $("#_alert_bg").fadeOut(function () {
                $(this).remove();
                callback && callback();
            })
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
                if (scrollTop + winHeight + 100 >= offset) {
                    detach();
                    callback && tag && callback();
                }
            }


            window.addEventListener('scroll', interval, false);
            window.addEventListener('resize', interval, false);

            check();
        },
        _scrollHide: function (offset, dom) {

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
                var scrollTop = window.pageYOffset;
                if (scrollTop >= offset) {
                    dom.show();
                } else {
                    dom.hide();
                }
            }


            window.addEventListener('scroll', interval, false);
            window.addEventListener('resize', interval, false);

            check();


        },
        getUserId: function () {
            return Wlib.getRequestParam("userId") || localStorage.getItem("userId") || "";
        },
        SendRequest: function (path, data, method, success, error) {
            var that = this;

            data = (function (d, m) {
                var res = "";
                if (m == "POST") {
                    res = d;
                } else {
                    for (var i in d) {
                        res += i + "=" + d[i] + "&";
                    }
                }

                return res;
            })(data, method);

            var url = (function () {
                if (document.domain == 'localhost') {
                    return "http://115.159.100.197/index.php?r=";
                }
                return location.protocol + "//" + document.domain + "/index.php?r=";
            })();

            var obj = {
                //url: url + "&callback=?",
                dataType: "JSONP",
                success: function (res) {
                    if(res.nodata == 1){
                        $("body").html("");
                        Wlib.alert("商品已下架,请浏览其他商品");
                        return;
                    }
                    success && success(res);
                },
                error: function (err) {
                    error && error(err);
                }
            }

            if (method == "POST") {
                obj.url = url + path;
                obj.data = data;
                obj.dataType = "JSON";
                obj.type = "POST";
                //上传图片处理
                console.log(data)
                if (data.toString().indexOf("FormData") > 0) {
                    obj.enctype = 'multipart/form-data';
                    obj.cache = false;
                    obj.contentType = false;
                    obj.processData = false;
                }

            } else {
                obj.url = url + path + "&" + data + "callback=?";
            }

            $.ajax(obj);

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
        },
        forceLogin: function (url, callback) {
            var that = this;

            //var desurl = document.domain != "www.hmsgtech.com" ? "http://test.hmsgtech.com/wechatserver/wechatLoginUrl" : "http://www.hmsgtech.com/wechatserver/wechatLoginUrl";
            var desurl = 'http://www.talkart.cc/index.php?r=wechat/wechat/pay';
            $.ajax({
                url: desurl + "?callback=?&re_url=" + encodeURIComponent(url || location.href),
                dataType: "JSONP",
                success: function (res) {
                    alert(JSON.stringify(res))
                    //location.replace(res.value);
                },
                error: function (err) {
                    alert("获取授权数据失败，请重试");
                }
            })
        },
        getTimeZone: function (re) {
            if (!re) {
                return "";
            }
            //var date = new Date(new Date(re).getTime()-8*3600*1000);
            // var y = date.getFullYear(),
            //     m = (date.getMonth()+ 1)<10 ? "0"+(date.getMonth()+ 1) : (date.getMonth()+ 1),
            //     d = date.getDate()<10 ? "0"+date.getDate() : date.getDate(),
            //     h = date.getHours()<10 ? "0"+date.getHours() : date.getHours(),
            //     mm = (date.getMinutes())<10? "0"+date.getMinutes() : date.getMinutes();
            // return y+"-"+m+"-"+d+" "+h+":"+mm;
            return re.replace("T", " ");


        },
        wx: {
            isWeixin: function () {
                return !!(navigator.userAgent.toLowerCase().indexOf("micromessenger") > -1);
            },
            auth: function (callback, url) {
                ////http://www.talkart.cc/index.php?r=wechat%2Fwechat%2Fauthoriztion&url=http://www.talkart.cc/wechat/pages/index/index.html
                var url = encodeURIComponent(url || location.href.split("#")[0]);
                if (Wlib.getRequestParam("uid") && Wlib.getRequestParam("token")) {
                    localStorage.setItem("uid", Wlib.getRequestParam("uid"));
                    localStorage.setItem("token", Wlib.getRequestParam("token"));
                    Wlib.getRequestParam("avatar") && localStorage.setItem("avatar", Wlib.getRequestParam("avatar"));
                    localStorage.setItem("isbind", Wlib.getRequestParam("isbind"));
                    localStorage.setItem("openid", Wlib.getRequestParam("open_id"));
                    localStorage.setItem("imtoken", Wlib.getRequestParam("password"));
                }

                if (localStorage.getItem("uid") && localStorage.getItem("token")) {
                    callback && callback();
                } else {
                    $.ajax({
                        url: "http://www.talkart.cc/index.php?r=wechat/wechat/authoriztion&url=" + url,
                        dataType: "JSONP",
                        success: function (res) {
                            //@TODO : 存储uid token
                            //localStorage.setItem("uid",res.uid);
                            //localStorage.setItem("token",res.token);
                            //localStorage.setItem("avatar",res.avatar);
                            //callback && callback();
                            location.href = res.url;
                        },
                        error: function () {
                            alert("服务器错误，请稍后重试。");
                        }
                    })
                }

            },
            forceLogin: function (callback, url) {
                ////http://www.talkart.cc/index.php?r=wechat%2Fwechat%2Fauthoriztion&url=http://www.talkart.cc/wechat/pages/index/index.html
                var url = encodeURIComponent(url || location.href.split("#")[0]);
                if (Wlib.getRequestParam("uid") && Wlib.getRequestParam("token")) {
                    localStorage.setItem("uid", Wlib.getRequestParam("uid"));
                    localStorage.setItem("token", Wlib.getRequestParam("token"));
                    Wlib.getRequestParam("avatar") && localStorage.setItem("avatar", Wlib.getRequestParam("avatar"));
                    localStorage.setItem("isbind", Wlib.getRequestParam("isbind"));
                    localStorage.setItem("openid", Wlib.getRequestParam("open_id"));
                    localStorage.setItem("imtoken", Wlib.getRequestParam("password"));

                    callback && callback();
                } else {
                    $.ajax({
                        url: "http://www.talkart.cc/index.php?r=wechat/wechat/authoriztion&url=" + url,
                        dataType: "JSONP",
                        success: function (res) {
                            //@TODO : 存储uid token
                            //localStorage.setItem("uid",res.uid);
                            //localStorage.setItem("token",res.token);
                            //localStorage.setItem("avatar",res.avatar);
                            //callback && callback();
                            location.href = res.url;
                        },
                        error: function () {
                            alert("服务器错误，请稍后重试。");
                        }
                    })
                }
            },
            checkLogin: function (callback, url) {
                var that = this;
                if (localStorage.getItem("uid") && localStorage.getItem("token")) {
                    //认为已经登录过了.不需要授权.

                    Wlib.SendRequest("wechat/wechat/myinfo", {openid : localStorage.getItem("openid")}, "GET",function(data){
                        if(data.state == 1){
                            localStorage.setItem("uid", data.uid);
                            localStorage.setItem("token", data.token);
                            data.avatar && localStorage.setItem("avatar",data.avatar);
                            localStorage.setItem("isbind", data.isbind);
                            localStorage.setItem("openid", data.openid);
                            localStorage.setItem("imtoken", data.imtoken);

                            callback && callback();
                        }

                    });


                    return;
                } else {
                    Wlib.wx.forceLogin(callback, url);
                }
            },
            getJSSign: function (url, callback) {
                var u = url || location.href.split("#")[0];
                $.ajax({
                    url: "http://www.talkart.cc/index.php?r=wechat/wechat/jsapiSign&url=" + u + "&callback=?",
                    dataType: "JSONP",
                    success: function (res) {
                        //@TODO :
                        callback && callback(res);
                    },
                    error: function () {
                        alert("服务器错误，请稍后重试。");
                    }
                })
            },
            //@TODO : 入参：data
            jsConfig: function (data, callback) {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.appId, // 必填，公众号的唯一标识
                    timestamp: data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.nonceStr, // 必填，生成签名的随机串
                    signature: data.signature,// 必填，签名，见附录1
                    jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'onMenuShareQZone',
                        'hideMenuItems',
                        'showMenuItems',
                        'chooseImage',
                        'uploadImage',
                        'previewImage'
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                callback && callback();
            },
            hideMenu: function () {
                wx.ready(function () {
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
                });

            },
            shareTo: function (title, desc, link, img, success, cancel) {
                wx.ready(function () {
                    wx.showMenuItems({
                        menuList: [
                            "menuItem:share:appMessage",
                            "menuItem:share:timeline"
                        ],
                        success: function () {

                        }

                    });


                    var urlPre = document.domain != "www.hmsgtech.com" ? "http://test.hmsgtech.com/wechat" : "http://www.hmsgtech.com/wechat";
                    var t = title || "说画";
                    var d = desc || "";
                    //var l = addShareParam(link || location.href.split("#")[0]);
                    var i = img || "/images/about/logo.png";
                    wx.onMenuShareTimeline({
                        title: t, // 分享标题
                        desc : desc,
                        link: link, // 分享链接
                        imgUrl: img, //'../../images/about/logo.png', // 分享图标
                        success: function () {
                            success && success()
                        },
                        cancel: function () {
                            cancel && cancel()
                        }
                    });
                    wx.onMenuShareAppMessage({
                        title: t, // 分享标题
                        link: link, // 分享链接,
                        desc: desc,
                        imgUrl: img, //'../../images/about/logo.png', // 分享图标
                        success: function () {
                            success && success()
                        },
                        cancel: function () {
                            cancel && cancel()
                        }
                    });
                });


            },
            //TODO : 难道需要一个Oid或者金额什么的吗？
            pay: function (url) {
                var that = this;
                //var desurl = document.domain != "www.hmsgtech.com" ? "http://test.hmsgtech.com/wechatserver/wechatLoginUrl" : "http://www.hmsgtech.com/wechatserver/wechatLoginUrl";
                var desurl = 'http://www.talkart.cc/index.php?r=wechat/wechat/pay';
                $.ajax({
                    url: desurl + "&callback=?",
                    dataType: "JSONP",
                    success: function (res) {
                        alert(JSON.stringify(res))
                        //location.replace(res.value);
                    },
                    error: function (err) {
                        alert("获取授权数据失败，请重试");
                    }
                })
            },
            previewImgs: function (current, urls) {

                wx.previewImage({
                    current: current,
                    urls: urls || [current]
                });
            },
            chooseImgs: function (callback) {
                wx.chooseImage({
                    count: 9, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        callback && callback(res.localIds);
                        //var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    }
                });
            },
            upLoadImgs: function (id, callback) {
                alert(id);
                wx.uploadImage({
                    localId: id, // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res) {
                        alert(res);
                        callback && callback(res.serverId);
                        //var serverId = res.serverId; // 返回图片的服务器端ID
                    }
                });
            },
            getLocation: function () {
                wx.getLocation({
                    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function (res) {
                        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                        var speed = res.speed; // 速度，以米/每秒计
                        var accuracy = res.accuracy; // 位置精度
                        alert(JSON.stringify(res));
                    }
                });
            }


        }

    };
    return new lib("publish", "");
})($);

