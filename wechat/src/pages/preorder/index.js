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
            that.cacheData();
            that.cacheDom();
            that.getContactList();

        },
        cacheData: function () {
            var that = this;

            that.data = {
                "treatmentPlanId": Wlib.getRequestParam("treatmentPlanId"),
                "userId": Wlib.getRequestParam("userId"),
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
            Wlib.SendRequest("248", {userId: that.data.userId, firstResult: 0, maxResults: 3}, function (res) {
                if (res.errorcode == 0) {
                    that.data.conList = res.entity;
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
                    "userId": Wlib.getRequestParam("userId"),
                    "treatmentPlanDetailId": Wlib.getRequestParam("treatmentPlanDetailId"),
                    "reserveId": that.data.CONID
                }

                if ($(this).hasClass("dis")) {
                    return;
                }

                if (that.data.CONID) {
                    //去下单就ok了

                    that.addOrder();

                    return;
                }


                //添加联系人再下单
                that.addContact(function () {

                    that.addOrder();

                })

            });

        },
        addOrder: function () {
            var that = this;
            var param = {
                "treatmentPlanId": Wlib.getRequestParam("treatmentPlanId"),
                "userId": Wlib.getRequestParam("userId"),
                "treatmentPlanDetailId": Wlib.getRequestParam("treatmentPlanDetailId"),
                "reserveId": that.data.CONID
            }

            Wlib.SendRequest("2033", param, function (res) {

               //@TODO 获取支付方式，去支付
                if(res.errorcode == 0){
                    //下单成功

                    alert("下单成功，去支付去。。需要提供支付接口。");
                    //location.href = '../../pages/orderdetail/index.html?orderId='+res.entity;
                    location.href = '../../pages/paysucc/index.html?orderId='+res.entity;
                }



            });
        },
        addContact: function (callback) {
            var that = this;
            var param = {
                userName: that.dom.name.val(),
                phone: that.dom.tel.val(),
                idNumber: that.dom.idcode.val(),
                userId: that.data.userId
            }

            Wlib.SendRequest("249", param, function (res) {

                if (res.errorcode == 0) {
                    that.data.CONID = res.entity;
                    callback && callback();
                } else {
                    //@TODO
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