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
                expo_id : Wlib.getRequestParam("id"),
                uid : "",
                token : "",
                lastid : ""
            }

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
        fetchData : function(){
            var that = this;
            Wlib.SendRequest("default/expo/concert", that.data.req, "GET", function (data) {
                if (data.state == 1) {
                   that.data.data = data;
                    that.renderUI();
                    that.bindEvent();
                    Wlib._bindLazyLoad();

                } else {
                    Wlib.tips("系统繁忙,请稍后再试~")
                }
            });
        }

    }

    var page = new ComDetial();
})($, window);