/**
 * Created by Gorden on 16/4/23.
 */


(function ($, win) {

    function ComDetial() {
        this.init();
    }

    ComDetial.prototype = {
        init: function () {
            this.cacheData();
            this.cacheDom();
            this.makeJuicerHelper();
            this.fetchData();
        },
        cacheData: function () {
            var that = this;

            that.data = {};
            that.data.index= Wlib.getRequestParam("index");
            that.data.req = {
                room_id: Wlib.getRequestParam("id")
            }

        },
        cacheDom: function () {
            var that = this;
            that.dom = {
                wrapper: $("#page"),
                loading: $("#loading"),
                tpl: $("#tpl"),
                mainTpl: $("#mainTpl")
            }
        },
        renderUI: function () {
            var that = this;
            that.dom.wrapper.html(juicer(that.dom.tpl.html(), that.data));
            that.recacheDom();
            that.dom.loading.hide();
        },
        recacheDom: function () {
            var that = this;
            that.dom.swiperDom = $("#cuIndex");
        },
        makeJuicerHelper: function () {
            var that = this;
            juicer.register("makeTags", function (str) {
                var arr = str.split(" ");
                var res = '';
                for (var i = 0; i < arr.length; i++) {
                    if(arr[i]){
                        res += '<span class="c'+(i+1)+'">' + arr[i] + '</span>';
                    }

                }
                return res;
            });
        },
        bindEvent: function () {
            var that = this;
            FastClick.attach(document.body);
            var swiper = new Swiper('#pics', {
                preloadImages: false,
                lazyLoading: true,
                onSlideChangeEnd: function (swiper) {
                    that.dom.swiperDom.html(swiper.activeIndex + 1);
                    mainSwiper.slideTo(swiper.activeIndex);
                }
            });


            var mainSwiper = new Swiper('#main', {
                preloadImages: false,
                lazyLoading: true,
                noSwiping: true,
                //onSlideChangeEnd: function (swiper) {
                //    that.dom.swiperDom.html(swiper.activeIndex+1);
                //}
            });


            swiper.slideTo( that.data.index,1);
            mainSwiper.slideTo( that.data.index,1)

            Wlib._bindLazyLoad();
        },

        fetchData: function () {
            var that = this;

            that.SendRequest("default/expo/regional", that.data.req, "GET", function (data) {
                if (data.state == 1) {
                    that.data.data = data;
                    //that.data.data = obj;
                    that.renderUI();
                    that.bindEvent();

                } else {
                    Wlib.tips("系统繁忙,请稍后再试~")
                }
            });
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

            var url = 'http://wx.talkart.cc/index.php?r=';

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
                //上传图片处理
                console.log(data)
                if (data.toString().indexOf("FormData") > 0) {
                    obj.enctype = 'multipart/form-data';
                    obj.cache = false;
                    obj.contentType = false;
                    obj.processData = false;
                }

            } else {
                obj.url = url + path + "&" + data + "callback=?";
            }

            $.ajax(obj);

        },

    }

    var page = new ComDetial();
})($, window);