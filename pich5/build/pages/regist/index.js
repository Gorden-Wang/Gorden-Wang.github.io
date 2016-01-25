/**
 * Created by gorden on 15/7/31.
 */
(function (win, $) {
    var Index = function () {
        var that = this;
        Wlib.wx.getJSSign('', function (data) {
            Wlib.wx.jsConfig(data, function () {
                Wlib.wx.hideMenu();
                that.init();

            });
        });
    }

    Index.prototype = {
        init: function () {
            var that = this;
            that.cacheData();
            that.cacheDom();
            that.renderUI();
            that.recacheDom();
            that.bindEvent();
        },
        cacheData: function () {
            var that = this;

            that.data = {};


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
            that.dom.input = $("input");
            that.dom.next = $("#next");
            that.dom.overlay = $(".loverlay");
            that.dom.confim = $(".confirm");
            that.dom.canl = $(".canl");
            that.dom.confirmtel = $("#confirmtel");
        },

        bindEvent: function () {
            var that = this;

            FastClick.attach(document.body);

            that.dom.next.on("click",function(){
                var val = that.dom.input.val();
                if(/^1\d{10}$/.test(val)){
                    that.dom.confirmtel.text(that.dom.input.val());
                    that.dom.overlay.show();

                }else{
                    Wlib.tips("请输入正确的手机号");
                }
            });

            that.dom.confim.on("click",function(){
                //@TODO send Request
                win.location = "./verify.html?tel="+that.dom.input.val();
            });

            that.dom.canl.on("click",function(){
                that.dom.overlay.hide();
            })



        }

    }

    var index = new Index();


})(window, $);