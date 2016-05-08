/**
 * Created by gorden on 15/10/10.
 */
(function (win, $) {
    var Login = function () {
        this.init();
    }

    Login.prototype = {
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
            that.dom.forget = $(".forget");
            that.dom.registbtn = $(".btn");

            that.dom.tel = $("#tel");
            that.dom.pass = $("#pass");
            that.dom.loginBtn = $(".btn01");


        },
        bindEvent: function () {
            var that = this;

            FastClick.attach(document.body);

            that.dom.back.on("click", function () {
                win.history.back();
            });

            that.dom.forget.on("click", function () {
                win.location = "../../pages/foget/index.html";
            });

            that.dom.registbtn.on("click", function () {
                win.location = "../../pages/register/index.html";
            });


            that.dom.loginBtn.on("click", function () {
                var req = {
                    callPhone: that.dom.tel.val(),
                    password: that.dom.pass.val()
                }

                that.login(req);
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
        login: function (obj) {
            var that = this;
            that.dom.loading.show();
            Wlib.SendRequest("/zayi/app/user/login", obj, "POST", function (data) {
                if(data.resultCode == "1"){
                    localStorage.setItem("userId",data.resultData.userId);
                    localStorage.setItem("apptoken",data.resultData.apptoken);
                    that.dom.loading.hide();
                    win.history.back();
                }else{
                    Wlib.tips(data.resultMsg);
                    that.dom.loading.hide();
                }
            });
        }
    }

    var login = new Login();


})(window, $);