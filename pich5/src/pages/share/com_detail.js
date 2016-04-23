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
        bindEvent: function () {
            var that = this;
            FastClick.attach(document.body);
            Wlib._bindLazyLoad();
        },

    }

    var page = new ComDetial();
})($, window);