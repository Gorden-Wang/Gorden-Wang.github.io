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

            that.getItems();
        },
        cacheData: function () {
            var that = this;
            that.data = {};
            that.data.param = {
                member_id : Wlib.getRequestParam("member_id") || 1,
                xiu_id : Wlib.getRequestParam("xiu_id") || 2
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
            that.resetTag();
        },
        recacheDom: function () {
            var that = this;
            that.dom.full = $(".full-img");
        },
        bindEvent: function () {
            var that = this;

            $(".button,.icon1").on("click",function(){
                var url = that.data.data.enableDownload;
                Wlib.downLite(url);
            })

        },
        resetTag : function(){
            var that = this;
            var tags = $(".tag");
            tags.each(function(i,v){
               console.log($(v).height());
                if($(v).height() > 28){
                    $(v).css({
                        right : "10px",
                        left : "auto"
                    })
                }
                $(v).css({
                    opacity : "1"
                })
            });
        },
        addJuicerHandler: function () {
            var that = this;
            juicer.register("makeRateImg", function (rate) {

                var arr = (rate + "").split(".");
                var big = arr[0];
                var lit = arr[1] > 0 ? '.5' : '';
                return big + lit;
            });

            juicer.register("makeTimeTitle", function (type) {

                if (type == 2) {
                    //    以下工作时间灵活可选或必须在以下时间完成工作
                    return "以下工作时间灵活可选";
                }
                if (type == 3) {
                    return "必须在以下时间完成工作"
                }

            });

            juicer.register("makeAgeDis", function (min, max) {
                    if (min != -1 && max != -1) {
                        return min + "岁-" + max + "岁";
                    }
                    if (min != -1 && max == -1) {
                        return "大于" + min + "岁"
                    }
                    if (min == -1 && max != -1) {
                        return "小于" + max + "岁"
                    }
                    if (min == -1 && max == -1) {
                        return "不要求"
                    }
                }
            );
            juicer.register("makeAudiDis", function (type) {
                    // 0-不限 1-面试 2-不面试
                    if (type == 0) {
                        return "不限"
                    }
                    if (type == 1) {
                        return "需面试"
                    }
                    if (type == 2) {
                        return "不需面试"
                    }
                }
            );

            juicer.register("checkDisplayMore", function (arr, length) {
                var length = length || 3;
                return arr.length > length ? true : false;
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
                    Wlib.tips("获取数据失败");
                }

            }

            var param = (function (data) {

                var res = "";

                for (var i in data) {
                    res += (i + "=" + data[i]) + "&";
                }

                return res.slice(0, -1);

            })(that.data.param);


            Wlib.GetJsonData("Xiu/xiu_info?" + param, callback, callback);

        }
    }

    var index = new Index();


})(window, $);