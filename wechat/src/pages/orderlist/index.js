/**
 * Created by gorden on 15/7/31.
 */
(function (win, $) {
    var DocList = function () {
        this.init();
    }
    var URL = location.href.split("#")[0];
    DocList.prototype = {
        init: function () {
            var that = this;
            Wlib.wx.getJS(URL,function(){
                that.cacheDom();
                that.cacheData();
                that.addJuicerHandler();
                that.fetchData();
            });

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
                userId: localStorage.getItem("userId"),
                orderStatus: Wlib.getRequestParam("orderStatus") || "-1",
                orderType: Wlib.getRequestParam("orderType") || "-1",
                firstResult: 0,
                maxResults: 10,
                token : localStorage.getItem("token"),
                openid : localStorage.getItem("openid")
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
                "userid": that.data.userId,
                "orderType": that.data.orderType,
                firstResult: that.data.firstResult || 0,
                maxResults: that.data.maxResults || 15
            }

            Wlib.SendRequestNew("treatOperate", "findOrders", param, function (res) {

                //@TODO 获取支付方式，去支付
                if (res.errorCode == 0) {
                    that.data.olist = res.value;
                    that.renderUI();
                    that.recacheDom();
                    that.bindEvent();
                    if (res.value && res.value.length == that.data.maxResults) {
                        that.bindNext(true);
                    }
                    if (!res.value || res.value.length == 0) {
                        Wlib.tips("没有查询到相关记录。", null, true)
                    }
                } else {
                    Wlib.tips(res.message);
                }


            });
        },
        bindNext: function (tag) {
            var that = this;

            Wlib._bindScrollTobottom(function () {
                that.data.firstResult = that.data.firstResult + that.data.maxResults;
                var param = {
                    "orderStatus": that.data.orderStatus,
                    "userid": that.data.userId,
                    "orderType": that.data.orderType,
                    firstResult: that.data.firstResult || 0,
                    maxResults: that.data.maxResults || 10
                }

                Wlib.SendRequestNew("treatOperate", "findOrders", param, function (res) {
                    //if (res.entity && res.entity.length > 0) {

                    var data = {};
                    data.olist = res.value || [];
                    var reshtml = juicer($("#itemtpl").html(), data);
                    $(".list-wrapper").append(reshtml);

                    $(".topayBtn").die("click"),on("click",function(){
                        var oid = $(this).attr("data-oid");
                        var price = $(this).attr("data-price");
                        that.payFor(oid,price);
                    });

                    if (res.value.length == that.data.maxResults) {
                        that.bindNext(true);
                    }
                    if (!res.value || res.value.length == 0) {
                        Wlib.tips("没有查询到相关记录。")
                    }

                });
            }, tag)


        },
        addJuicerHandler: function () {
            var that = this;

            juicer.register("makeStatus", function (v) {
                var res = '未付款';
                switch (v) {
                    case 1 :
                        res = '未付款';
                        break;
                    case 2 :
                        res = '待完成';
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

                switch (v) {
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

                var res = "", title = "";
                for (var i = 0; i < that.data.depList.length; i++) {
                    if (id == that.data.depList[i].data.id) {
                        title = that.data.depList[i].data.name;
                    }
                }
                return res;

            });

            juicer.register("makeFuckTimeFuck", function (time) {

                var time = new Date(parseInt(time)), w;
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
                    d: time.getDate() < 10 ? ("0" + time.getDate()) : time.getDate(),
                    w: w,
                    h: time.getHours() < 10 ? ("0" + time.getHours()) : time.getHours(),
                    mm: (time.getMinutes() + 1) < 10 ? "0" + (time.getMinutes() + 1) : (time.getMinutes() + 1),
                }
                var resTime = obj.y + "年" + obj.m + '月' + obj.d + "日" + " " + obj.h + ":" + obj.mm;


                return resTime

            });

            juicer.register("makeStatusDisplay", function (v) {
                if (v == that.data.orderStatus) {
                    return "selected";
                }
                return "";
            });
            juicer.register("makeFilterDisplay", function () {
                var res;
                var v = that.data.orderType;
                switch (v) {
                    case "-1" :
                        res = "筛选";
                        break;
                    case "1" :
                        res = "线下门诊";
                        break;
                    case "2" :
                        res = "线上问诊";
                        break;
                    case "3" :
                        res = "预约体验";
                        break;
                }

                return res;
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
            });


            $(".banner li").on("click", function () {
                var orderStatus = $(this).attr("data-id");
                win.location.replace('../../pages/orderlist/index.html?orderStatus=' + orderStatus + '&orderType=' + that.data.orderType);
            });

            $(".filterbox li").on("click", function () {
                var orderType = $(this).attr("data-id");
                win.location.replace('../../pages/orderlist/index.html?orderStatus=' + that.data.orderStatus + '&orderType=' + orderType);
            })


            //that.dom.person.on("click",function(){
            //    window.location = "../../pages/person/index.html"
            //});

            $(".topayBtn").on("click",function(){
                var oid = $(this).attr("data-oid");
                var price = $(this).attr("data-price");
                that.payFor(oid,price);
            });
        },
        payFor : function(oid,price){
            var that = this;
            var p = {
                "userid": localStorage.getItem("userId"),
                "orderid" : oid,
                "amount" : price,
                "channel" : "weixin",
                "clientIp" : "127.0.0.1",
                "openid" : localStorage.getItem("openid")
            }
            Wlib.SendRequestNew("pay","payOrder",p,function(res){
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.value.result.appId, // 必填，公众号的唯一标识
                    timestamp:res.value.result.timeStamp , // 必填，生成签名的时间戳
                    nonceStr: res.value.result.nonceStr, // 必填，生成签名的随机串
                    signature: res.value.paySign,// 必填，签名，见附录1
                    jsApiList: ["chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });

                wx.ready(function(){
                    wx.chooseWXPay({
                        timestamp: res.value.result.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: res.value.result.nonceStr, // 支付签名随机串，不长于 32 位
                        package: res.value.result.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                        signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: res.value.result.paySign, // 支付签名
                        success: function (v) {
                            // 支付成功后的回调函数
                            alert(JSON.stringify(v));
                            if(v.errMsg == "chooseWXPay:ok" ) {
                                //支付成功
                                location.reload();
                            }else{
                                alert("支付失败");
                                location.reload();
                            }

                        },
                        cancel : function(res){
                            location.reload();
                            //errMsg : cooseWXPay:ok
                            //location.href = '../../pages/paysucc/index.html?orderId='+res.value.orderid+"&userId="+Wlib.getRequestParam("userId");
                        }
                    });
                })
            })
        }
    }

    var docs = new DocList();


})(window, $);