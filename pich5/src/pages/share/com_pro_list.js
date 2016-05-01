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
                room_id : Wlib.getRequestParam("id")
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
            that.SendRequest("default/expo/regional", that.data.req, "GET", function (data) {
                if (data.state == 1) {
                    that.data.data = data;
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