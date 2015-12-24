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
        checkLogin: function () {
            var that = this;
            var userid = that.getUserid();
            alert(userid);
            var desurl = document.domain != "www.hmsgtech.com"  ? "http://test.hmsgtech.com/wechatserver/wechatLoginUrl" : "http://www.hmsgtech.com/wechatserver/wechatLoginUrl";
            alert(!that.isWeixin());
            if (!that.isWeixin()) {
                alert("请在微信中打开。");
                return;
            }

            if (!userid) {
                alert("aaa");
                $.ajax({
                    url: desurl + "?callback=?",
                    dataType: "JSONP",
                    success: function (res) {
                        alert(JSON.stringify(res));

                        location.href = res.value;
                    },
                    error: function (err) {
                        alert("获取授权数据失败，请重试");
                    }
                })
            }
        },
        getUserid: function () {
            var that = this;
            //request userid 优先级最高。
            var id = that.getRequestParam("userid");
            return id ? localStorage.setItem("userid",id) : localStorage.getItem("userid");
        },
        isWeixin: function () {
            return !!(navigator.userAgent.toLowerCase().indexOf("micromessenger") > -1);
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
                "token": localStorage.getItem("token") || "",
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
                    success(res);
                },
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
    return new lib("daily", "");
})($);

