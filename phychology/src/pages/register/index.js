/**
 * Created by gorden on 15/10/10.
 */
(function (win, $) {
    var Register = function () {
        this.init();
    }

    Register.prototype = {
        init: function () {
            var that = this;
            that.cacheData();
            that.cacheDom();
            that.addJuicerHandler();
            that.renderUI();
            that.recacheDom();
            that.bindEvent();

            //that.getItems();
        },
        cacheData: function () {
            var that = this;
            that.data = {};
            that.data.param = {
                id: Wlib.getRequestParam("productId"),
                img_w: $("body").width(),
                img_h: Math.floor(0.609375 * $("body").width()),
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
        recacheDom: function () {
            var that = this;
            that.dom.back = $(".m-icon0");
            that.dom.tel = $("#tel");
            that.dom.num = $("#num");
            that.dom.pass = $("#pass");
            that.dom.pass1 = $("#pass1");
            that.dom.sendNum = $($(".input-button")[0]);
            that.dom.regist = $(".btn");
            that.dom.swich = $(".pswview");


        },
        bindEvent: function () {
            var that = this;

            FastClick.attach(document.body);

            that.dom.back.on("click",function(){
                win.history.back();
            });

            that.dom.tel.on("input", function () {
                var val = $(this).val();
                if (/1\d{10}/.test(val)) {
                    that.dom.sendNum.addClass("enable");
                }
            });


            that.dom.sendNum.on("click", function () {

                if ($(this).hasClass("enable")) {
                    that.sendNum();
                }
            })

            that.dom.regist.on("click", function () {
                var req = {
                    callPhone: that.dom.tel.val(),
                    password: that.dom.pass.val(),
                    code: that.dom.num.val()
                }

                that.goRegist(req);


            });

            that.dom.pass.on("input", function () {
                that.dom.pass1.val($(this).val());
            })

            that.dom.pass1.on("input", function () {
                that.dom.pass.val($(this).val());
            })

            that.dom.swich.on("click", function () {
                var passDis = that.dom.pass.hasClass("hide");
                var pass1Dis = that.dom.pass1.hasClass("hide");


                if (passDis) {
                    that.dom.pass.removeClass("hide")
                    that.dom.pass1.addClass("hide");
                } else {
                    that.dom.pass1.removeClass("hide")
                    that.dom.pass.addClass("hide");
                }

            })

        },
        addJuicerHandler: function () {
            var that = this;
            juicer.register("makeRateImg", function (rate) {

                var arr = (rate + "").split(".");
                var big = arr[0];
                var lit = arr[1] > 0 ? '.5' : '';
                return big + lit;
            });

        },
        sendNum: function () {
            var that = this;
            var req = {
                callPhone: that.dom.tel.val(),
                codeType: 1
            }
            that.dom.loading.show();
            Wlib.SendRequest('/zayi/app/user/smscode', req, "POST", function (data) {
                if (data.resultCode == 1) {
                    that.dom.loading.hide();
                    Wlib.tips(data.resultMsg);
                }
            });
        },
        goRegist: function (obj) {
            var that = this;

            that.dom.loading.show();
            Wlib.SendRequest('/zayi/app/user/reg', obj, "POST", function (data) {

                if (data.resultCode == 1) {
                    Wlib.tips("注册成功")
                    that.dom.loading.hide();
                } else {
                    that.dom.loading.hide();
                    Wlib.tips(data.resultMsg);
                }

            })
        },

        getItems: function () {

            var that = this;


        }
    }

    var register = new Register();


})(window, $);