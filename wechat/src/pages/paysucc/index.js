/**
 * Created by gorden on 15/7/31.
 */
(function (win, $) {
    var Person = function () {
        this.init();
    }

    Person.prototype = {
        init : function(){
            var that = this;
            that.cacheDom();
            that.cacheData();
            that.renderUI();
            that.recacheDom();
            that.bindEvent();
        },
        cacheDom : function(){
            var that = this;
            that.dom = {
                wrapper : $("#page"),
                loading : $("#loading"),
                tpl : $("#tpl")
            }
        },
        cacheData : function(){
          var that = this;
            that.data = {
                oid : Wlib.getRequestParam("orderId")
            }
        },
        renderUI : function(){
            var that = this;
            that.dom.wrapper.html(juicer(that.dom.tpl.html(),that.data));
            that.dom.loading.hide();
        },
        recacheDom : function(){
          var that = this;
            that.dom.banner = $(".banner");
        },
        bindEvent : function(){
            var that = this;
            $(".submit_btn").on("click",function(){
                win.location.href = "../../pages/orderdetail/index.html?orderId="+that.data.oid;
            });
        }
    }

    var person = new Person();


})(window, $);