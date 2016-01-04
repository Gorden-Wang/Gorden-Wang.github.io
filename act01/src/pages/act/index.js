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

            that.getItems();
        },
        cacheData: function () {
            var that = this;
            that.data = {};
            that.data.param = {
                member_id : Wlib.getRequestParam("member_id") || 1,
                activity_id : Wlib.getRequestParam("activity_id") || 2
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
            that.dom.full = $(".full-img");
        },
        bindEvent: function () {
            var that = this;
            $(".button,.t-w.flex").on("click",function(){
                var url = that.data.data.enableDownload;
                Wlib.downLite(url);
            })

        },
        addJuicerHandler: function () {
            var that = this;
            juicer.register("makeTime", function (time) {

                var v = new Date(parseInt(time)*1000);
                var obj = {
                    y : v.getFullYear(),
                    m : v.getMonth()+1,
                    d : v.getDate(),
                    h : v.getHours(),
                    mm : v.getMinutes()+1
                }

                return obj.y+"/"+obj.m+"/"+obj.d+" "+obj.h+":"+obj.mm;
            });



        },
        getItems: function () {

            var that = this;


            function callback(data) {

                if (data.code === 0) {
                    //成功

                    that.data.data = data.datas;

                    that.renderUI();
                    that.recacheDom();
                    that.bindEvent();


                    console.log(that.data.data)


                } else {
                    Wlib.tips("获取活动详情失败");
                }

            }

            var param = (function (data) {

                var res = "";

                for (var i in data) {
                    res += (i + "=" + data[i]) + "&";
                }

                return res.slice(0, -1);

            })(that.data.param);


            Wlib.GetJsonData("Activity/activity_info?" + param, callback, callback);

        }
    }

    var index = new Index();


})(window, $);