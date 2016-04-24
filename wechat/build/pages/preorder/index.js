/**
 * Created by gorden on 15/7/31.
 */
(function (win, $) {
    var DocList = function () {
        this.init();
    }
    var URL = location.href.split("?")[0];
    DocList.prototype = {
        init: function () {
            var that = this;
            Wlib.wx.getJS(URL,function(){
                that.cacheData();
                that.cacheDom();
                that.getContactList();
            });


        },
        cacheData: function () {
            var that = this;

            that.data = {
                "treatmentPlanId": Wlib.getRequestParam("treatmentPlanId"),
                "userId": localStorage.getItem("userId"),
                "treatmentPlanDetailId": Wlib.getRequestParam("treatmentPlanDetailId"),
                "doc": Wlib.getRequestParam("doc"),
                "dep": Wlib.getRequestParam("dep"),
                "add": Wlib.getRequestParam("add"),
                "time": Wlib.getRequestParam("time"),
                "price": Wlib.getRequestParam("price")
            };

            that.data.CONID = "";
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
            that.dom.con = $(".history-wrapper li");
            that.dom.name = $("#name");
            that.dom.idcode = $("#idcode");
            that.dom.tel = $("#tel");
            that.dom.btn = $(".btn");
        },
        getContactList: function () {
            var that = this;
            Wlib.SendRequestNew("treatOperate","findReserveProfiles", {userid: that.data.userId, firstResult: 0, maxResults: 3}, function (res) {
                if (res.errorCode == 0) {
                    that.data.conList = res.value || [];
                    that.renderUI();
                    that.recacheDom();
                    that.bindEvent();
                } else {
                    //@TODO 用户不存在 去登录
                }

            });
        },
        bindEvent: function () {
            var that = this;
            that.dom.con.on("click", function () {
                var radio = $(this).find("div");
                var isSe = $(radio).hasClass("radio_se");

                if (isSe) {
                    $(radio).removeClass("radio_se");
                    that.renderInput(this, false);
                    that.data.CONID = "";
                    that.dom.btn.addClass("dis");

                } else {
                    $(radio).addClass("radio_se");
                    $(this).siblings().find("div").removeClass("radio_se");
                    that.renderInput(this, true);
                    that.data.CONID = $(this).attr("data-id");
                    that.dom.btn.removeClass("dis");
                }
            });

            $("input").on("input", function () {
                var res = that.compare();
                that.dom.con.find("div").removeClass("radio_se");
                if (res.res) {
                    $("li[data-id='" + res.id + "'").find("div").addClass("radio_se");
                    that.data.CONID = res.id;
                } else {
                    that.data.CONID = "";
                }
            });

            that.dom.btn.on("click", function () {
                var param = {
                    "treatmentPlanId": Wlib.getRequestParam("treatmentPlanId"),
                    "userId": localStorage.getItem("userId"),
                    "treatmentPlanDetailId": Wlib.getRequestParam("treatmentPlanDetailId"),
                    "reserveId": that.data.CONID
                }

                if ($(this).hasClass("dis")) {
                    return;
                }

                //if (that.data.CONID) {
                //    //去下单就ok了
                //
                //    that.addOrder();
                //
                //    return;
                //}


                //添加联系人再下单
                that.addContact(function () {

                    that.addOrder();

                })

            });

        },
        addOrder: function () {
            var that = this;
            var param = {
                //"treatmentPlanId": Wlib.getRequestParam("treatmentPlanId"),
                "userid": that.data.userId,
                "treatmentPlanDetailId": Wlib.getRequestParam("treatmentPlanDetailId"),
                "profileId": that.data.CONID
            }

            Wlib.SendRequestNew("treatOperate","orderTreatmentPlan", param, function (res) {

               //@TODO 获取支付方式，去支付
                if(res.errorCode == 0){
                    //下单成功

                    //alert("下单成功，去支付去。。需要提供支付接口。");


                    //location.href = '../../pages/orderdetail/index.html?orderId='+res.entity;

                    var oid = res.value.id;
                    var p = {
                        "userid": localStorage.getItem("userId"),
                        "orderid" : oid,
                        "amount" : parseFloat(that.data.price)*100,
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
                                    if(v.errMsg == "chooseWXPay:ok" ) {
                                        //支付成功
                                        location.href = '../../pages/paysucc/index.html?orderId='+res.value.orderid+"&userId="+res.value.userid;
                                    }else{
                                        alert("支付失败");
                                        location.href = "../../pages/orderdetail/index.html?orderId="+res.value.orderid
                                    }

                                },
                                cancel : function(v){
                                    location.href = "../../pages/orderdetail/index.html?orderId="+res.value.orderid
                                    //errMsg : cooseWXPay:ok
                                    //location.href = '../../pages/paysucc/index.html?orderId='+res.value.orderid+"&userId="+Wlib.getRequestParam("userId");
                                }
                            });
                        })
                    })

                }else{
                    Wlib.tips(res.message);
                }



            });
        },
        addContact: function (callback) {
            var that = this;
            //@TODO : rermark 患者备注
            var param = {
                name: encodeURIComponent(that.dom.name.val()),
                phone: that.dom.tel.val(),
                idNumber: that.dom.idcode.val(),
                userid: that.data.userId,
                remark : ""
            };

            var reg=/^[\u2E80-\u9FFF]+$/;
            if(!reg.test(that.dom.name.val()) || that.dom.name.val().length < 2 || that.dom.name.val().length > 4){
                Wlib.tips("姓名请输入2-4位汉字");
                return;
            }
            var telreg = /^1\d{10}$/;
            if(!telreg.test(that.dom.tel.val())){
                Wlib.tips("请输入正确的手机号码");
                return
            }

            if(that.data.CONID){
                callback && callback();
                return;
            }


            Wlib.SendRequestNew("treatOperate","addReserveProfileIfExist", param, function (res) {

                if (res.errorCode == 0) {
                    that.data.CONID = res.value.id;
                    callback && callback();
                } else {
                    //@TODO
                    Wlib.tips(res.message)
                }

            });
        },
        renderInput: function (obj, tag) {
            var that = this;
            var name = $(obj).find(".l-name").text(), idcode = $(obj).find(".l-code").text(), tel = $(obj).find(".l-tel").text();
            if (tag) {
                that.dom.name.val(name);
                that.dom.idcode.val(idcode);
                that.dom.tel.val(tel);
            } else {
                that.dom.name.val("");
                that.dom.idcode.val("");
                that.dom.tel.val("");
            }
        },
        compare: function () {
            var that = this;
            var obj = {
                userName: that.dom.name.val(),
                phone: that.dom.tel.val(),
                idNumber: that.dom.idcode.val()
            }
            var arr = that.data.conList;

            var res = false;
            var id = "";
            for (var i = 0; i < arr.length; i++) {
                if ($.trim(obj.userName) == arr[i].userName && $.trim(obj.idNumber) == arr[i].idNumber && $.trim(obj.phone) == arr[i].phone) {
                    res = true;
                    id = arr[i].id;
                    break;
                }
            }
            if (obj.userName && obj.phone && obj.idNumber && that.dom.btn.hasClass("dis")) {
                that.dom.btn.removeClass("dis");
            }


            return {res: res, id: id};

        }


    }

    var docs = new DocList();


})(window, $);