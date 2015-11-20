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
            that.renderUI();
            that.recacheDom();
            that.bindEvent();

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
            that.dom.search = $(".hs-icon");

        },
        bindEvent: function () {
            var that = this;

            that.dom.back.on("click",function(){
                win.history.back();
            });
            that.dom.search.on("click",function(){
                that.dom.loading.show();
                setTimeout(function(){
                    $("section").show();
                    that.dom.loading.hide();
                },1000)

            });

            $("body").on("keydown",function(event){
                if (event.keyCode == "13") {
                    that.dom.search.trigger("click");
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
        getItems: function () {

            var that = this;


            function callback(data) {

                if (data.resultCode == "1") {
                    //成功

                    that.data.data = data.resultData;

                    that.renderUI();
                    that.recacheDom();
                    that.bindEvent();


                    console.log(that.data.data)


                } else {
                    Wlib.tips(data.message);
                }

            }

            var param = (function (data) {

                var res = "";

                for (var i in data) {
                    res += (i + "=" + data[i]) + "&";
                }

                return res.slice(0, -1);

            })(that.data.param);


            Wlib.GetJsonData("app/product/detail/jsonp?" + param, callback, callback);

        }
    }

    var search = new Search();


})(window, $);