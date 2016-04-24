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
            this.fetchData();
        },
        cacheData: function () {
            var that = this;

            that.data = {};
            that.data.req = {
                id : Wlib.getRequestParam("id")
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
            that.recacheDom();
            that.dom.loading.hide();
        },
        recacheDom : function(){
            var that = this;
            that.dom.swiperDom = $("#cuIndex");
        },
        bindEvent: function () {
            var that = this;
            FastClick.attach(document.body);
            var swiper = new Swiper('#pics', {
                preloadImages: false,
                lazyLoading: true,
                onSlideChangeEnd: function (swiper) {
                    that.dom.swiperDom.html(swiper.activeIndex+1);
                }
            });
            Wlib._bindLazyLoad();
        },

        fetchData : function(){
            var that = this;
            Wlib.SendRequest("default/expo/collectibles", that.data.req, "GET", function (data) {
                if (data.state == 1) {
                    that.data.data = data;
                    that.renderUI();
                    that.bindEvent();

                } else {
                    Wlib.tips("系统繁忙,请稍后再试~")
                }
            });
        }

    }

    var page = new ComDetial();
})($, window);