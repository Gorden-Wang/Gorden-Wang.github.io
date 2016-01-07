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
                var u = that.evn == "daily" ? "http://115.159.100.197/index.php?r=" : "www.talkart.cc/index.php?r=";


                return u;
            })();

            var obj = {
                //url: url + "&callback=?",
                dataType: "JSONP",
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
        wx : {
            isWeixin: function () {
                return !!(navigator.userAgent.toLowerCase().indexOf("micromessenger") > -1);
            },
            auth : function(callback){
                $.ajax({
                    url : "http://www.talkart.cc/index.php?r=wechat/wechat/register",
                    dataType : "JSONP",
                    success : function(res){
                        //@TODO : 存储uid token
                        localStorage.setItem("uid",res.uid);
                        localStorage.setItem("token",res.token);
                        localStorage.setItem("avatar",res.avatar);
                        callback && callback();
                    },
                    error : function(){
                        alert("服务器错误，请稍后重试。");
                    }
                })
            },
            getJSSign : function(url,callback){
                var u = url || location.href.split("#")[0];
                $.ajax({
                    url : "http://www.talkart.cc/index.php?r=wechat/wechat/jsapiSign&url="+u+"&callback=?",
                    dataType : "JSONP",
                    success : function(res){
                        //@TODO :
                        callback && callback(res);
                    },
                    error : function(){
                        alert("服务器错误，请稍后重试。");
                    }
                })
            },
            //@TODO : 入参：data
            jsConfig : function(data,callback){
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
            hideMenu : function(){
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
            },
            //TODO : 难道需要一个Oid或者金额什么的吗？
            pay : function(url){
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
            previewImgs : function(current,urls){

                wx.previewImage({
                    current: current,
                    urls: urls || [current]
                });
            },
            chooseImgs : function(callback){
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
            upLoadImgs : function(id,callback){
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
            }


        }

    };
    return new lib("local", "");
})($);

