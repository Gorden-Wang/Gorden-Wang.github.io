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
                id: Wlib.getRequestParam("productId"),
                img_w: 100,
                img_h: 100,
                user_headimg_w: 100,
                user_headimg_h: 100

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

            juicer.register("makeSexDis", function (type) {
                if(type == 1){
                    return "男"
                }
                return "女";
            });


        },
        recacheDom: function () {
            var that = this;
            that.dom.full = $(".full-img");
        },
        bindEvent: function () {
            var that = this;
            var btnText = "收起";
            $(".swiper-slide").on("click",function(){
                var src = $(this).find("img").attr("src");
                that.dom.full.show().append("<a class><img src='"+src +"'></a>");
            })
            that.dom.full.on("click",function(){
                $(this).html("");
                $(this).hide();
            });

            $(".btn-wrapper").on("click",function(){
               var target = $(this).attr("data-target");
                var text = $(this).attr("data-text");
                $(target).toggle();
                if($(this).find("span").text() == "收起"){
                    $(this).find("span").text(text);
                }else{
                    $(this).find("span").text("收起");
                }


            });

            //add download

            $(".down-header,footer").on("click",function(){
                location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.zy.part_timejob"
            })
        },
        getItems: function () {

            var that = this;


            function callback(data) {

                if (data.resultCode == "1") {
                    //成功

                    that.data.data = data.resultData;

                    that.renderUI();
                    that.recacheDom();
                    that.bindEvent();


                    console.log(that.data.data)


                } else {
                    Wlib.tips(data.message);
                }

            }

            var param = (function (data) {

                var res = "";

                for (var i in data) {
                    res += (i + "=" + data[i]) + "&";
                }

                return res.slice(0, -1);

            })(that.data.param);


            Wlib.GetJsonData("app/product/detail/jsonp?" + param, callback, callback);

        }
    }

    var index = new Index();


})(window, $);