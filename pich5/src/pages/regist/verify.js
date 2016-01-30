/**
 * Created by gorden on 15/7/31.
 */
(function (win, $) {
    var Index = function () {
        var that = this;
        Wlib.wx.getJSSign('', function (data) {
            Wlib.wx.jsConfig(data, function () {
                Wlib.wx.hideMenu();
                that.init();

            });
        });
    }

    Index.prototype = {
        init: function () {
            var that = this;
            that.addJuicerHandler();
            that.cacheData();
            that.cacheDom();
            that.renderUI();
            that.recacheDom();
            that.bindEvent();
        },
        cacheData: function () {
            var that = this;

            that.data = {};
            that.data.desTel = Wlib.getRequestParam("tel");
            that.data.code = localStorage.getItem("code");


        },
        cacheDom: function () {
            var that = this;
            that.dom = {
                wrapper: $("#page"),
                loading: $("#loading"),
                tpl: $("#tpl")
            }
        },
        renderUI: function () {
            var that = this;
            that.dom.wrapper.html(juicer(that.dom.tpl.html(), that.data));
            that.dom.loading.hide();
        },
        recacheDom: function () {
            var that = this;

            that.dom.telLabel = $(".tel");
            that.dom.codeInput = $("input");
            that.dom.reSend = $(".input-wrap>.button");
            that.dom.secondLable = $(".input-wrap span");
            that.dom.confirm = $("#next");
            that.dom.noCode = $("p.no-code");
        },

        addJuicerHandler: function () {
            var that = this;
            juicer.register("makeTel", function () {
                var arr = that.data.desTel.split("");
                return arr.slice(0, 3).join("") + "-" + arr.slice(3, 7).join("") + "-" + arr.slice(7, 11).join("");
            });
        },
        bindEvent: function () {
            var that = this;

            FastClick.attach(document.body);

            that.makeCountDown(function () {
                that.dom.reSend.removeClass("disable");
                that.dom.reSend.html("重新获取");
            });

            that.dom.reSend.on("click", function () {
                var self = this;
                var dis = $(this).hasClass("disable");
                if (dis) {
                    return;
                }

                that.sendCode(function () {
                    $(self).addClass("disable").html("<span>60</span>秒后重新获取");
                    that.makeCountDown(function () {
                        that.dom.reSend.removeClass("disable");
                        that.dom.reSend.html("重新获取");
                    });
                });


            });
            that.dom.confirm.on("click", function () {
                that.bindTel(function () {
                    //@TODO 判断是出价，立即购买，还是去我。
                    localStorage.setItem("isbind","1");
                    var action = localStorage.getItem("bindNextAction"),
                        obj = localStorage.getItem("bindNextObj") && JSON.parse(localStorage.getItem("bindNextObj"));

                    if(action == "my"){
                        win.location.href = "../../pages/my/index.html";
                        return;
                    }
                    if(action == "auction"){
                        //去出价

                        Wlib.SendRequest("default/api/bid", obj, "POST", function (data) {
                            if (data.state == 1) {
                                //that.dom.loading.hide();
                                Wlib.tips("出价成功");
                                setTimeout(function () {
                                    win.location.href = "../../pages/auction/index.html?id="+obj.id;
                                }, 3000);

                            } else {
                                that.dom.loading.hide();
                                Wlib.tips(data.message);
                            }
                        });

                    }

                })
            });


        },
        sendCode: function (callback) {
            var that = this;
            var req = {
                phone: that.data.desTel,
                type: 5,
                open_id : localStorage.getItem("openid")
            };
            Wlib.SendRequest("default/index/getCode", req, "GET", function (data) {
                if (data.state == 0) {
                    Wlib.tips(data.message);
                } else {
                    localStorage.setItem("code", data.code);
                    callback && callback();
                }
            });
        },
        bindTel: function (callback) {
            var that = this;
            var req = {
                uid: localStorage.getItem("uid"),
                token: localStorage.getItem("token"),
                phone: that.data.desTel,
                open_id: localStorage.getItem("openid"),
                code: that.dom.codeInput.val()
            }

            Wlib.SendRequest("wechat/wechat/bindphone", req, "GET", function (data) {
                if (data.state == 0) {
                    Wlib.tips(data.message);
                } else {
                    localStorage.setItem("code", "");
                    callback && callback();
                }
            });
        },
        makeCountDown: function (callback) {
            var that = this;
            var i = 59;
            that.dom.secondLable = that.dom.secondLable ? that.dom.secondLable : $(".input-wrap span");
            var inter = setInterval(function () {
                if (i == 0) {
                    callback && callback();
                    clearInterval(inter);
                    inter = null;
                    that.dom.secondLable = null;
                } else {
                    that.dom.secondLable.text(i);
                }
                i--;
            }, 1000);

        }

    }

    var index = new Index();


})(window, $);