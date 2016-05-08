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
            that.getMoney();
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
            that.dom.submit = $(".fixedbtn");

        },
        bindEvent: function () {
            var that = this;

            FastClick.attach(document.body);

            that.dom.back.on("click",function(){
                win.history.back();
            });

            that.dom.submit.on("click",function(){


                that.withDraw();






            })


        },
        withDraw : function(){
          var that = this;
            var req = {
                userId: localStorage.getItem("userId"),
                apptoken: localStorage.getItem("apptoken"),
                alipay : $("#alipay").val(),
                mondy : $("#money").val()
            }

            Wlib.SendRequest("/zayi/app/user/apply_withdraw", req, "POST", function (data) {
                if (data.resultCode == 1) {
                    var top = "<p class='title'>您的提现申请已提交</p><p class='content'>一般3-7个工作日可到账,请耐心等待</p>";
                    var btn = "<div class='btn'>确定</div>";
                    Wlib.alert(top,btn,function(){
                        win.history.back();
                    });
                } else {
                    Wlib.tips(data.resultMsg)
                }
            });
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
        getMoney: function () {
            var that = this;
            var req = {
                userId: localStorage.getItem("userId"),
                apptoken: localStorage.getItem("apptoken")
            }

            Wlib.SendRequest("/zayi/app/user/account_balance", req, "POST", function (data) {
                if (data.resultCode == 1) {
                    that.data.info = data.resultData;
                    that.renderUI();
                    that.recacheDom();
                    that.bindEvent();
                } else {
                    //Wlib.tips("")
                }
            });
        },
    }

    var search = new Search();


})(window, $);