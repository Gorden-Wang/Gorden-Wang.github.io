/**
 * Created by gorden on 15/10/10.
 */
(function (win, $) {
    var Search = function () {
        this.init();
    }

    Search.prototype = {
        init: function () {
            var that = this;
            that.cacheData();
            that.cacheDom();
            that.addJuicerHandler();
            //that.renderUI();
            //that.recacheDom();
            //that.bindEvent();

            that.getTags();

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
            that.dom.tabs = $(".tab-wrapper li");
            that.dom.back = $(".m-icon0");
            that.dom.commitBtn = $(".fixedbtn");
            that.dom.tags = $(".tag-item");
            that.dom.tagInput = $(".tag-input");

        },
        bindEvent: function () {
            var that = this;

            FastClick.attach(document.body);

            that.dom.back.on("click", function () {
                win.history.back();
            });


            that.dom.commitBtn.on("click", function () {

                that.addTask();

            });


            that.dom.tags.on("click", function () {
                var isAdd = $(this).hasClass("add-btn"),
                    isSel = $(this).hasClass("select");

                if (!isSel) {
                    $(this).addClass("select").siblings().removeClass("select");

                    if (isAdd) {
                        that.dom.tagInput.show();
                        return;
                    }
                    that.dom.tagInput.find("input").val("");
                    that.dom.tagInput.hide();
                    var top = "<p class='title'>tag解释.</p><p class='content' style='text-align: left'>假字假字假字假字假字假字假字</p>";
                    var btn = "<div class='btn'>确定</div>";
                    Wlib.alert(top, btn, function () {
                        $(".fadeIn").remove();
                    });
                }
            });


        },
        addTask: function () {
            var that = this;
            var req = {
                userId : localStorage.getItem("userId"),
                apptoken : localStorage.getItem("apptoken"),
                title : $(".tag-input input").val() || $(".tags-wrap").find(".select").html(),
                money : $("#money").val(),
                content : makeContent()
            }


            function makeContent(){
                var res = "",
                    c = $("textarea").val(),
                    tel = $("#tel").val() && "手机号:"+$("#tel").val(),
                    name = $("#name").val() && " 姓名:"+$("#name").val(),
                    wechat = $("#wechat").val() && " 微信:"+$("#wechat").val(),
                    qq = $("#qq").val() && " QQ:"+$("#qq").val(),
                    email = $("#email").val() && " 邮箱:"+ $("#email").val()

                return c+tel+name+wechat+qq+email;

            }

            Wlib.SendRequest("/zayi/app/requirement/submit",req,"POST",function(data){
                if(data.resultCode == 1){
                    var top = "<p class='title'>您的需求已经提交.</p><p class='content'>接下来我们的项目经理会与您联系,并确认需求细节.您也可以加客服微信‘zayiapp’进行咨询</p>";
                    var btn = "<div class='btn'>朕知道了</div>";
                    Wlib.alert(top, btn, function () {
                        $(".fadeIn").remove();
                    });
                }
            });
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
        getTags: function () {
            var that = this;

            Wlib.SendRequest("/zayi/app/resources/tags", null, "GET", function (data) {
                if (data.resultCode == 1) {
                    that.data.info = data.resultData;
                    that.renderUI();
                    that.recacheDom();
                    that.bindEvent();
                } else {
                    //Wlib.tips("")
                }
            });
        },
    }

    var search = new Search();


})(window, $);