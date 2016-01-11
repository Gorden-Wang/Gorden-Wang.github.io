/**
 * Created by gorden on 15/10/10.
 */
(function (win, $) {
    var Index = function () {
        this.init();
    }

    Index.prototype = {
        init: function () {
            var that = this;
            that.cacheData();
            that.cacheDom();
            that.addJuicerHandler();
            //that.renderUI();
            //that.recacheDom();
            //that.bindEvent();

            //that.getItems();
            that.getPosition();
        },
        cacheData: function () {
            var that = this;
            that.data = {};
            that.data.param = {
                goods_id: Wlib.getRequestParam("goods_id") || 2,
                type: 1
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
            that.dom.wrapper.prepend(juicer(that.dom.tpl.html(), that.data));
            that.dom.loading.hide();

            $("#or").text("￥" + that.data.data.goods_price);
            $("#de").text("￥" + that.data.data.goods_dingjin);
            that.counter(that.data.data.begin_time*1000, that.data.data.end_time*1000);
        },
        getPosition: function () {
            var that = this;
            var geolocationOptions = {timeout: 3000, enableHighAccuracy: true, maximumAge: 5000};

            function getLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition, showError, geolocationOptions);
                }
                else {
                    Wlib.tips("没有定位到您的城市，请稍候再试")
                }
            }

            function showPosition(position) {
                that.data.param.latitude = position.coords.latitude;
                that.data.param.longitude = position.coords.longitude;

                that.getItems();
            }

            function showError() {
                that.getItems();
                that.data.param.latitude = 0;
                that.data.param.longitude = 0;
            }

            getLocation();


        },
        recacheDom: function () {
            var that = this;
            that.dom.full = $(".full-img");
        },
        bindEvent: function () {
            var that = this;
            $(".btn-wrap").on("click", function () {
                var url = that.data.data.enableDownload;
                Wlib.downLite(url);
            })

        },
        addJuicerHandler: function () {
            var that = this;
            juicer.register("makeDis", function (str) {

                var arr = str.split(/\s{2}/), i = 0, res = "", len = arr.length;
                for (i = 0; i < len; i++) {
                    if (arr[i]) {
                        res = res + "<p>" + arr[i] + "</p>";
                    }
                }
                return res;
            });
            juicer.register("makeTime", function (str) {
                var t = new Date(parseInt(str)*1000);
                var obj = {
                    y: t.getFullYear(),
                    m: t.getMonth() + 1,
                    d: t.getDay(),
                    h: t.getHours(),
                    mm: t.getMinutes() + 1,
                    s: t.getSeconds()
                }

                return obj.y + "/" + obj.m + "/" + obj.d + " " + obj.h + ":" + obj.mm;

            });


        },
        counter: function (beg, end) {
            var that = this,
                day = $("#day"),
                hour = $("hour"),
                min = $("#min"),
                sec = $("#sec")
            time = end - beg;


            function counter(t) {
                //一天 ：24H * 3600
                var dd = parseInt(t / 1000 / 60 / 60 / 24, 10);//计算剩余的天数
                var hh = parseInt(t / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数
                var mm = parseInt(t / 1000 / 60 % 60, 10);//计算剩余的分钟数
                var ss = parseInt(t / 1000 % 60, 10);//计算剩余的秒数
                day.html(dd);
                hour.html(hh);
                min.html(mm);
                sec.html(ss);
            }

            setInterval(function () {
                time = time - 1000;
                counter(time);
            }, 1000)

        }

        ,
        getItems: function () {

            var that = this;


            function callback(data) {

                if (data.code === 0) {
                    //成功

                    that.data.data = data.datas;
                    that.data.data.mark.replace(/\S/g, '');
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


            Wlib.GetJsonData("goods/goods_info?" + param, callback, callback);

        }
    }

    var index = new Index();


})(window, $);