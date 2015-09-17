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
                "price":Wlib.getRequestParam("price")
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
            that.dom.docdes = $("#docdes");
            that.dom.feedback = $("#feedback");
            that.dom.docwrapper = $("#deswrapper");
            that.dom.fbwrapper = $("#fbwrapper");
        },
        getContactList: function () {
            var that = this;
            Wlib.SendRequest("248", {userId: that.data.userId}, function (res) {
                if(res.errorcode == 0){
                    that.data.conList = res.entity;
                    that.renderUI();
                    that.recacheDom();
                    that.bindEvent();
                }else{
                    //@TODO 用户不存在 去登录
                }

            });
        },
        bindEvent: function () {
            var that = this;

            that.dom.docdes.on("click", function () {
                if ($(this).hasClass("tab_selected")) {
                    return
                }
                $(this).addClass("tab_selected").siblings().removeClass("tab_selected");
                that.dom.docwrapper.show();
                that.dom.fbwrapper.hide()
            });

            that.dom.feedback.on("click", function () {
                if ($(this).hasClass("tab_selected")) {
                    return
                }
                $(this).addClass("tab_selected").siblings().removeClass("tab_selected");
                that.dom.fbwrapper.show();
                that.dom.docwrapper.hide();
            });
        }
    }

    var docs = new DocList();


})(window, $);