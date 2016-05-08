/**
 * Created by gorden on 15/7/31.
 */

(function (win, $) {
    var Index = function () {
        this.init();
    }

    Index.prototype = {
        init: function () {
            var that = this;
            that.addJuicerHandler();
            that.cacheData();
            that.cacheDom();
            //that.getData();

            //that.getData(function(){
            that.renderUI();
            that.recacheDom();
            that.bindEvent();
            //});

        },
        cacheData: function () {
            var that = this;

            that.data = {};
            that.data.key = (function () {
                var s = location.search;
                return s && s.replace("?", "").split("=")[0]
            })();
            that.data.val = Wlib.getRequestParam(that.data.key) || "";

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
            that._makeFooter();
            that.dom.loading.hide();
        },
        recacheDom: function () {
            var that = this;

            that.dom.newLi = $(".itemli li");
            that.dom.wallet = $(".wallet-wrap");

        },
        _makeFooter: function () {
            var that = this;
            var data = {
                classname: "f-5",
                selected: true,
                url: '',
                id: ''
            };

            var footer = new Wlib.Footer($("#footer"), data, 4);
        },
        addJuicerHandler: function () {
            var that = this;

            juicer.register("makePlaceHolder", function () {
                var res = "";
                switch (that.data.key) {
                    case "name" :
                        res = "请输入说画号"
                        break;
                    case "nickname" :
                        res = "请输入昵称";
                        break;
                    case "QQ" :
                        res = "请输入微信号";
                        break;
                    case "email" :
                        res = "请输入签名";
                        break;
                    //TODO
                    case "sex" :
                        res = "请输入昵称";
                        break;
                }

                return res;
            });


        },
        bindEvent: function () {
            var that = this;

            FastClick.attach(document.body);

            $(".big-btn").on("click", function () {
                var req = {
                    uid: localStorage.getItem("uid"),
                    token: localStorage.getItem("token")
                };
                req[that.data.key] = $("input").val() || $("textarea").val();

                Wlib.SendRequest("default/person/infoEdit", req, "POST", function (data) {
                   if(data.state == 1){
                       Wlib.tips("操作成功");
                       setTimeout(function(){
                           history.back();
                       },2000);
                   }else{
                       Wlib.tips(data.message);
                   }
                });
            });

            $(".sex-wrap li").on("click",function(){
               var sel = $(this).find(".right").length == 0 ? false : true;

                if(sel){
                    return;
                }

                $(this).append("<span class='right'></span>");
                $(this).siblings().find(".right").remove();


                that.dom.loading.show();

                var req = {
                    uid: localStorage.getItem("uid"),
                    token: localStorage.getItem("token"),
                    sex : $(this).attr("data-tag")
                };

                Wlib.SendRequest("default/person/infoEdit", req, "POST", function (data) {
                    if(data.state == 1){
                        that.dom.loading.hide();
                        Wlib.tips("操作成功");
                        setTimeout(function(){
                            history.back();
                        },2000);
                    }
                });

            });


        }


    }

    var index = new Index();


})(window, $);