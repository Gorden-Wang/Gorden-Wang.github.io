/**
 * Created by gorden on 15/7/31.
 */
(function (win, $) {
    var DocList = function () {
        this.init();
    }

    DocList.prototype = {
        init: function () {
            var that = this;
            that.cacheDom();
            that.cacheData();
            that.addJuicerHandler();
            //that.renderUI();
            //that.recacheDom();
            //that.bindEvent();
            that.fetchData();
        },
        cacheDom: function () {
            var that = this;
            that.dom = {
                wrapper: $("#page"),
                loading: $("#loading"),
                tpl: $("#tpl")
            }

        },
        cacheData: function () {
            var that = this;
            that.data = {
                userId: Wlib.getRequestParam("userId") || "00000301",
                orderStatus : Wlib.getRequestParam("orderStatus") || "-1",
                orderType : Wlib.getRequestParam("orderType") || "-1"
            }
        },
        renderUI: function () {
            var that = this;
            that.dom.wrapper.html(juicer(that.dom.tpl.html(), that.data));
            that.dom.loading.hide();
        },
        recacheDom: function () {
            var that = this;
            that.dom.filter = $('#filter');
            that.dom.overlay = $('#overlay');
            that.dom.filterbox = $(".filterbox");
            that.dom.bannerItems = $(".item");
        },
        fetchData: function () {
            var that = this;
            var param = {
                "orderStatus": that.data.orderStatus,
                "userId" : that.data.userId,
                "orderType" : that.data.orderType
            }

            Wlib.SendRequest("287", param, function (res) {

                //@TODO 获取支付方式，去支付
                if (res.errorcode == 0) {
                    that.data.olist = res.entity;
                    that.renderUI();
                    that.recacheDom();
                    that.bindEvent();
                }


            });
        },
        addJuicerHandler: function () {
            var that = this;

            juicer.register("makeStatus", function (v) {
                var res = '未付款';
                switch (v){
                    case 1 :
                        res = '未付款';
                        break;
                    case 2 :
                        res = '已付款';
                        break;
                    case 3 :
                        res = '已完成';
                        break;
                    case 4 :
                        res = '已退款';
                        break;
                }
                return res;
            });

            juicer.register("makeType", function (v) {
                var res = '线下门诊';

                switch (v){
                    case 1 :
                        res = '线下门诊';
                        break;
                    case 2 :
                        res = '线上问诊';
                        break;
                    case 3 :
                        res = '预约体检';
                        break;
                }
                return res;
            });

            juicer.register("makeTitle", function (str) {
                var res = "";
                switch (str) {
                    case 1 :
                        res = '主任医师';
                        break;
                    case 2 :
                        res = '副主任医师';
                        break;
                    case 3:
                        res = '主治医师';
                        break;
                    case 4 :
                        res = '住院医师';
                        break;
                }
                return res;
            });

            juicer.register("makeFuckTime", function (time) {

                var time = new Date(time), w;
                switch (time.getDay()) {
                    case 0 :
                        w = "周日";
                        break;
                    case 1 :
                        w = "周一";
                        break;
                    case 2 :
                        w = "周二";
                        break;
                    case 3 :
                        w = "周三";
                        break;
                    case 4 :
                        w = "周四";
                        break;
                    case 5 :
                        w = "周五";
                        break;
                    case 6 :
                        w = "周六";
                        break;
                }
                var obj = {
                    y: time.getFullYear(),
                    m: (time.getMonth() + 1) < 10 ? "0" + (time.getMonth() + 1) : (time.getMonth() + 1),
                    d: time.getDate(),
                    w: w
                }
                var resTime = obj.y + "/" + obj.m + '/' + obj.d;


                return resTime

            });

            juicer.register("makeDep", function (id) {

                var res = "",title="";
                for (var i = 0; i < that.data.depList.length; i++) {
                    if(id == that.data.depList[i].data.id){
                        title = that.data.depList[i].data.name;
                    }
                }
                return res;

            });

            juicer.register("makeFuckTimeFuck", function (time) {

                var time = new Date(time), w;
                switch (time.getDay()) {
                    case 0 :
                        w = "周日";
                        break;
                    case 1 :
                        w = "周一";
                        break;
                    case 2 :
                        w = "周二";
                        break;
                    case 3 :
                        w = "周三";
                        break;
                    case 4 :
                        w = "周四";
                        break;
                    case 5 :
                        w = "周五";
                        break;
                    case 6 :
                        w = "周六";
                        break;
                }
                var obj = {
                    y: time.getFullYear(),
                    m: (time.getMonth() + 1) < 10 ? "0" + (time.getMonth() + 1) : (time.getMonth() + 1),
                    d: time.getDate() < 10 ? ("0"+time.getDate()): time.getDate(),
                    w: w,
                    h : time.getHours() < 10 ? ("0"+time.getHours()) : time.getHours(),
                    mm:(time.getMinutes() + 1) < 10 ? "0" + (time.getMinutes() + 1) : (time.getMinutes() + 1),
                }
                var resTime = obj.y + "年" + obj.m + '月' + obj.d+"日" + " " + obj.h + ":" + obj.mm;


                return resTime

            });




        },
        bindEvent: function () {
            var that = this;
            that.dom.filter.on("click", function () {
                that.dom.filterbox.toggle();
                that.dom.overlay.toggleClass("fadeIn");
            });

            that.dom.overlay.on("click", function () {
                that.dom.overlay.toggleClass("fadeIn");
                that.dom.filterbox.toggle();
            });

            that.dom.bannerItems.on("click", function () {
                var hasClass = $(this).hasClass(".selected");
                if (!hasClass) {
                    $(this).addClass("selected").siblings(".item").removeClass("selected");
                }
            })


            //that.dom.person.on("click",function(){
            //    window.location = "../../pages/person/index.html"
            //});
        }
    }

    var docs = new DocList();


})(window, $);