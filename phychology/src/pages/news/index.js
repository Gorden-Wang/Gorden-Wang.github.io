/**
 * Created by gorden on 15/10/10.
 */
(function (win, $) {
    var Search = function () {
        this.init();
    }

    Search.prototype = {
        init: function () {
            var that = this;
            that.cacheData();
            that.cacheDom();
            that.addJuicerHandler();
            //that.renderUI();
            //that.recacheDom();
            //that.bindEvent();
            that.getRequireInfo();
            //that.getItems();
        },
        cacheData: function () {
            var that = this;
            that.data = {};
            that.data.param = {
                id: Wlib.getRequestParam("productId"),
                img_w: $("body").width(),
                img_h: Math.floor(0.609375 * $("body").width()),
                user_headimg_w: 100,
                user_headimg_h: 100

            }
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
            that.dom.tabs = $(".tab-wrapper li");
            that.dom.back = $(".m-icon0");
            that.dom.lis = $(".ul02-widget li");

        },
        bindEvent: function () {
            var that = this;

            FastClick.attach(document.body);

            that.dom.back.on("click", function () {
                win.history.back();
            });

            that.dom.lis.on("click", function () {
                win.location = "../../pages/detail/index.html"
            })


        },
        addJuicerHandler: function () {
            var that = this;
            juicer.register("makeStatus", function (sta) {
                var res = "";
                /*
                 DRAFT (1, "草稿", "生成订单为发送给用户"),
                 READY_PAY (2, "待付款", "刚发出去，B还没付款"),
                 PAID (3, "已付款,待开工", "B已经付款，还没法订单给C"),
                 NORMAL (4, "正常", "至少一个C订单发出去了.所有C都正常或者提前"),
                 DELAY (5, "滞后", "存在1个或以上滞后C"),
                 COMPLETED (6, "结束", "旗下所有C都结束");
                 */
                //需求方
                switch (sta) {
                    case 1 :
                        res = "草稿";
                        break;
                    case 2 :
                        res = "待付款";
                        break;

                    case 3 :
                        res = "已付款,待开工";
                        break;

                    case 4 :
                        res = "正常";
                        break;

                    case 5 :
                        res = "滞后";
                        break;

                    case 6 :
                        res = "结束";
                        break;

                }

                return res;
            });

        },
        getRequireInfo: function () {
            var that = this;
            var req = {
                userId: localStorage.getItem("userId"),
                apptoken: localStorage.getItem("apptoken")
            }

            Wlib.SendRequest("/zayi/app/user/myrequirements", req, "POST", function (data) {
                if (data.resultCode == 1) {
                    if (data.resultData.length == 0) {
                        Wlib.tips("还没有提交过需求~");
                        return;
                    }
                    that.data.info = data.resultData;
                    that.renderUI();
                    that.recacheDom();
                    that.bindEvent();
                } else {
                    Wlib.tips(data.resultMsg)
                }
            });
        },
    }

    var search = new Search();


})(window, $);