/**
 * Created by Gorden on 16/4/23.
 */


(function ($, win) {

    function ComList() {
        this.init();
    }

    ComList.prototype = {
        init: function () {
            var that = this
            this.addHelper();
            this.cacheData();
            this.cacheDom();
            this.getBanner(function(){
                that.renderUI();
                that.bindEvent();
                that.fetchData();
            });


        },
        cacheData: function () {
            var that = this;

            that.data = {};
            that.data.req = {
                type: '',
                lastid: ''
            }

        },
        cacheDom: function () {
            var that = this;
            that.dom = {
                wrapper: $("#page"),
                loading: $("#loading"),
                tpl: $("#tpl"),
                tplItem: $("#tplItem"),
                picli: $("#picli")
            }
        },
        renderUI: function () {
            var that = this;
            that.dom.wrapper.html(juicer(that.dom.tpl.html(), that.data));
            that.renderItem();
            that.dom.loading.hide();
        },
        renderItem: function () {
            var that = this;
            $(".ul-wrap ul").append(juicer(that.dom.tplItem.html(), that.data))
        },
        bindEvent: function () {
            var that = this;
            FastClick.attach(document.body);
            var swiper = new Swiper('#pics', {
                pagination: '.swiper-pagination',
                preloadImages: false,
                lazyLoading: true
            });

            $(".tabs li").on("click", function () {
                if ($(this).hasClass("sel")) {
                    return;
                }
                that.data.req.type = $(this).attr("data-type");
                that.data.req.lastid = "";

                $(this).addClass("sel").siblings().removeClass("sel");
                $(".ul-wrap ul").html("");
                that.fetchData();
            });


            Wlib._bindLazyLoad();
        },
        addHelper: function () {
            var that = this;

            Date.prototype.Format = function (fmt) { //author: meizz
                var o = {
                    "M+": this.getMonth() + 1, //月份
                    "d+": this.getDate(), //日
                    "h+": this.getHours(), //小时
                    "m+": this.getMinutes(), //分
                    "s+": this.getSeconds(), //秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                    "S": this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }

            juicer.register("getTime", function (a, b) {
                var pre = new Date(a * 1000).Format("yyyy年MM月dd日");
                var last = new Date(b * 1000).Format("yyyy年MM月dd日");
                if (new Date(a * 1000).getFullYear() == new Date(b * 1000).getFullYear()) {
                    return new Date(a * 1000).Format("yyyy年MM月dd日") + "-" + new Date(b * 1000).Format("MM月dd日");
                } else {
                    return new Date(a * 1000).Format("yyyy年MM月dd日") + "-" + new Date(b * 1000).Format("yyyy年MM月dd日");
                }
            });
        },
        fetchData: function () {
            var that = this;
            Wlib.SendRequest("default/expo/auctionPrev", that.data.req, "GET", function (data) {
                if (data.state == 1) {
                    if(data.list.length == 0){
                        Wlib.tips("暂无数据")
                        return;
                    }
                    if(data.list.length == 15){
                        that.data.req.lastid = data.list[14].id;
                    //    bindNext
                    }


                    that.data.list = data.list;
                    //that.renderUI();
                    //that.bindEvent();
                    that.renderItem();
                    Wlib._bindLazyLoad();

                } else {
                   Wlib.tips("系统繁忙,请稍后再试~")
                }
            });
        },


        getBanner: function (callback) {
            var that = this;
            Wlib.SendRequest("default/expo/applaud", {}, "GET", function (data) {
                if (data.state == 1) {
                    if (data.list.length == 0) {
                        return;
                    }
                    that.data.banner = data.list;

                    callback && callback();

                } else {
                    Wlib.tips("系统繁忙,请稍后再试~")
                }
            });
        }

    }

    var page = new ComList();
})($, window);