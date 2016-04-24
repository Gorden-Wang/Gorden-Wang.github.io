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
            this.renderUI();
            this.bindEvent();
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

    }

    var page = new ComDetial();
})($, window);