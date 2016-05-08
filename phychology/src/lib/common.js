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

                case 'daily' :

                case 'local' :
                    
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
            var bgwrapper = $("<div class = 'fixed tipsfadeIn tipsanimated'>" + txt + "</div>");
            $("body").append(bgwrapper);
            setTimeout(function () {
                $(bgwrapper).remove();
                callback && callback();
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
            var bgwrapper = $("<div class = 'fixed fadeIn animated'>" + content + "</div>");
            bgwrapper.append(btn);
            $("body").append(
                bgwrapper);
            $("body").find(".btn").on("click", function () {
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

        GetJsonData: function (url, success, error) {
            $.ajax({
                url: "http://icefox-cool.xicp.net/master/" + url,
                dataType: "jsonp",
                method: "GET",
                success: function (res) {
                    success(res);
                },
                error: function (err) {
                    error && error(DATA);
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
        SendRequest: function (path, data, method, success, error) {
            var that = this;

            //http://icefox-cool.xicp.net:80/zayi/app/user/reg

            data = (function (d, m) {
                var res = "";
                if (m == "POST") {
                    res = d;
                } else {
                    if(d){
                        for (var i in d) {
                            res += i + "=" + d[i] + "&";
                        }
                    }else{
                        res = "";
                    }

                }

                return res;
            })(data, method);

            var url = (function () {
                if (document.domain == 'localhost') {
                    return "http://127.0.0.1";
                }
                return location.protocol + "//" + document.domain;
            })();


            var obj = {
                dataType: "JSON",
                success: function (res) {
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
            } else {
                if(data){
                    obj.url = url + path + "&" + data;
                }else{
                    obj.url = url + path
                }

            }

            $.ajax(obj);
        }

    };


    return new lib("local", "");
})($);

