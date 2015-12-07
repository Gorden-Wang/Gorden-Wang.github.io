/**
 * Created by gorden on 15/7/31.
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
            that.getData();
        },
        cacheData: function () {
            var that = this;

            that.data = {

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

        },
        bindEvent: function () {
            var that = this;

            var swiper = new Swiper('#pics', {
                pagination: '.swiper-pagination'
            });

            Wlib._bindLazyLoad();

        },
        getData: function () {
            var that = this;

            Wlib.SendRequest("default/api/square",{},"GET",function(data){
                that.data.data = data;
                that.renderUI();
                that.recacheDom();
                that.bindEvent();
            })

        }
    }

    var index = new Index();


})(window, $);