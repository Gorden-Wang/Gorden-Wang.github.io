/**
 * Created by gorden on 15/7/31.
 */
(function (win, $) {
    var Index = function () {


        var that = this;
        //Wlib.Weixin.goAuth();
        //Wlib.wx.pay();
        Wlib.wx.auth(function () {
            Wlib.wx.getJSSign('', function (data) {
                Wlib.wx.jsConfig(data, function () {
                    Wlib.wx.hideMenu();
                    that.init();
                    //localStorage.clear();
                    //alert(localStorage.getItem("isbind"))
                });
            });

        });
    }

    Index.prototype = {
        init: function () {
            var that = this;
            that.addJuicerHandler();
            that.cacheData();
            that.cacheDom();
            that.getData("#tab1", function (id, data) {
                that.dom.mainwrap.html(juicer($(id).html(), data));
            });
        },
        cacheData: function () {
            var that = this;

            that.data = {}

        },
        cacheDom: function () {
            var that = this;
            that.dom = {
                wrapper: $("#page"),
                loading: $("#loading"),
                tpl: $("#tpl"),
                tab1: $("#tab1"),
                tab2: $("#tab2"),
                tab3: $("#tab3"),
                picli: $("#picli")
            }
        },
        renderUI: function () {
            var that = this;
            that.dom.wrapper.html(juicer(that.dom.tpl.html(), that.data));
            that.dom.loading.hide();
        },
        recacheDom: function () {
            var that = this;

            that.dom.newLi = $(".itemli li");
            that.dom.mainwrap = $("#wrap");
            that.dom.tab = $("header li");
            that.dom.goApp = $(".icon2");

        },
        recacheDom2: function () {
            var that = this;
            that.dom.tabul = $(".ul-wrap ul");


        },
        addJuicerHandler: function () {
            var that = this;
            juicer.register("getId", function (url) {
                return Wlib.getRequestParam("id", url);
            });
            juicer.register("getType", function (type) {
                var res = "";
                switch (type) {
                    case "出售":
                        res = "../../pages/sale/index.html";
                        break;
                    case "拍卖":
                        res = "../../pages/auction/index.html";
                        break;
                    //  @TODO : 鉴定，欣赏

                }
                return res;
            });
            juicer.register("makeLoveDis", function (data) {
                var a = data.map(function (v) {
                    return v.name;
                })
                return a.join(",");
            });
            juicer.register("getFuckType", function (type) {
                var res = "";
                switch (type) {
                    case "2":
                        //出售
                        res = "../../pages/sale/index.html";
                        break;
                    case "1":
                        //拍卖
                        res = "../../pages/auction/index.html";
                        break;
                    //  @TODO : 鉴定，欣赏

                }
                return res;
            });
        },
        bindEvent: function () {
            var that = this;

            FastClick.attach(document.body);
            var swiper = new Swiper('#pics', {
                pagination: '.swiper-pagination'
            });

            Wlib._bindLazyLoad();

            that.dom.newLi.on("click", function () {
                var id = $(this).attr("data-id");
                var des = $(this).attr("data-url");

                if (!id) {
                    Wlib.tips("已经下架");
                    return;
                }

                win.location = des + "?id=" + id;
            });

            that.dom.goApp.on("click", function () {
                Wlib.tips("请下载APP体验更多功能");
                location.href = "http://www.talkart.cc/index.php?r=default/index/download";
            });

            that.dom.tab.on("click", function () {
                var is = $(this).hasClass("selected");
                var tag = $(this).attr("tpl-id");

                if (!is) {
                    that.dom.loading.show();
                    $(this).addClass("selected").siblings().removeClass("selected");
                    that.rTab("#" + tag, that.data[tag]);
                }

            });

        },
        bindEvent2: function () {
            Wlib._bindLazyLoad();
            $(".ul-wrap li").on("click", function () {
                var id = $(this).attr("data-id");
                var des = $(this).attr("data-url");

                if (!id) {
                    Wlib.tips("已经下架");
                    return;
                }

                win.location = des + "?id=" + id;
            });

        },
        getData: function (id, callback) {
            var that = this;


            Wlib.SendRequest("default/api/square", {}, "GET", function (data) {
                that.data.data = data;
                that.renderUI();

                that.recacheDom();

                callback && callback(id, that.data);

                that.recacheDom();

                that.bindEvent();

            })

        },
        rTab: function (id) {
            var that = this;
            that.data = {};
            switch (id) {
                case "#tab1" :
                    that.getData(id, handler);
                    break;
                case "#tab2":
                    that.getInterestData(id, handler);
                    break;
                case "#tab3":
                    that.getFriendData(id, handler);
                    break;
            }

            function handler(id, data) {
                that.dom.mainwrap.html(juicer($(id).html(), data));
                that.dom.loading.hide();
            }

        },
        getFriendData: function (id, callback) {
            var that = this;

            var req = {
                token: localStorage.getItem("token"),
                uid: localStorage.getItem("uid")
            };
            Wlib.SendRequest("default/api/friends", req, "GET", function (data) {
                that.data.data = data;
                callback && callback(id, that.data);
                that.recacheDom2();
                if (data.list.length > 0) {
                    //next
                    that.dom.tabul.append(juicer(that.dom.picli.html(), that.data));
                }
                if (data.list.length == 10) {
                    //next
                    that.bindNext(true, '', true);
                }
                if(data.list.length == 0){
                    Wlib.tips("您的画友没有发布任何作品～");
                    that.dom.loading.hide();
                }

                that.bindEvent2();
            })
        },
        getInterestData: function (id, callback) {
            var that = this;

            var req = {
                token: localStorage.getItem("token"),
                uid: localStorage.getItem("uid")
            };
            Wlib.SendRequest("default/api/interest", req, "GET", function (data) {
                that.data.data = data;
                callback && callback(id, that.data);
                that.recacheDom2();
                if (data.list.length > 0) {
                    //next
                    that.dom.tabul.append(juicer(that.dom.picli.html(), that.data));
                }
                if (data.list.length == 10) {
                    //next
                    that.bindNext(true);
                }

                alert(data.list)
                if(data.list.length == 0){
                    Wlib.tips("兴趣圈没有数据");
                    that.dom.loading.hide();
                }

                that.bindEvent2();
            })
        },
        bindNext: function (tag, id, des) {
            var that = this;

            Wlib._bindScrollTobottom(function () {
                var req = {
                    token: localStorage.getItem("token"),
                    uid: localStorage.getItem("uid"),
                    infoid: id || that.data.data.list[9].id
                };
                var re = des ? "default/api/friends" : "default/api/interest";
                Wlib.SendRequest(re, req, "GET", function (data) {
                    var d = {};
                    d.data = data;
                    if (data.list.length == 0) {
                        return;
                    }
                    that.dom.tabul.append(juicer(that.dom.picli.html(), d));
                    if (data.list.length == 10) {
                        that.bindNext(true, data.list[9].id);
                    }
                    //Wlib._bindLazyLoad();
                    that.bindEvent2();
                })
            }, tag)


        }
    }

    var index = new Index();


})(window, $);