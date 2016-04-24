/**
 * Created by gorden on 15/7/31.
 */
(function (win, $) {
    var Person = function () {
        this.init();
    }

    var URL = location.href.split("#")[0];
    Person.prototype = {
        init: function () {
            var that = this;
            Wlib.wx.getJS(URL,function(){
                that.cacheData();
                that.cacheDom();
                that.fetchData();
                Wlib.wx.shareTo();
            })


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
            that.data = {};
            that.data.userId = localStorage.getItem("userId");
            that.data.location = Wlib.getRequestParam("locationId");
            that.data.cityList = win.CITYLIST;
        },
        renderUI: function () {
            var that = this;
            that.dom.wrapper.html(juicer(that.dom.tpl.html(), that.data));

            $("select").val(that._makeCityName(that.data.location));

            that.dom.loading.hide();
        },
        fetchData : function(){
          var that = this;
            var param = {
                "userid": that.data.userId
            }

            Wlib.SendRequestNew("treatOperate", "userOrderIndex", param, function (res) {
                that.data.info = res.value;
                that.renderUI();
                that.recacheDom();
                that.bindEvent();
            });
        },
        recacheDom: function () {
            var that = this;
            that.dom.banner = $(".banner");
        },
        _makeCityName: function (str) {
            var that = this;
            for (var i = 0; i < CITYLIST.length; i++) {
                if (str == CITYLIST[i].id) {
                    return CITYLIST[i].name;
                }
            }
        },
        addJuicerHandler: function () {
            var that = this;
            juicer.register("makeCityName", function (str) {
                for (var i = 0; i < CITYLIST.length; i++) {
                    if (str == CITYLIST[i].id) {
                        return CITYLIST[i].name;
                    }
                }
            });
        },
        bindEvent: function () {
            var that = this;
            that.dom.banner.on("click", function () {
                var url = $(this).attr("data-href");
                url && (window.location = url);
            });
            $("#myOrder").on("click", function () {
                location.href = "../../pages/orderlist/index.html";
            });
            $("#orderPay").on("click",function(){
                location.href = "../../pages/orderlist/index.html?orderStatus=1&orderType=-1";
            })
            $("#about").on("click",function(){
                location.href = "../../pages/about/index.html";
            });
            $("#feedback").on("click",function(){
                location.href = "../../pages/tips/feedback.html";
            })
        }
    }

    var person = new Person();


})(window, $);