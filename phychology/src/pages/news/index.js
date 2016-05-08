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

            that.dom.back.on("click",function(){
                win.history.back();
            });

            that.dom.lis.on("click",function(){
                win.location = "../../pages/detail/index.html"
            })


        },
        addJuicerHandler: function () {
            var that = this;
            juicer.register("makeRateImg", function (rate) {

                var arr = (rate + "").split(".");
                var big = arr[0];
                var lit = arr[1] > 0 ? '.5' : '';
                return big + lit;
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
                    if(data.resultData.length == 0){
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