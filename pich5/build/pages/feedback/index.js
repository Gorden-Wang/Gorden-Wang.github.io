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

            that.data = {}

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


        },
        bindEvent: function () {
            var that = this;

            FastClick.attach(document.body);

            $(".big-btn").on("click", function () {
                var req = {
                    uid: localStorage.getItem("uid"),
                    token: localStorage.getItem("token"),
                    content: $("textarea").val(),
                    phone: $("input").val()
                }

                if(req.content == ""){
                    Wlib.tips("请写下宝贵意见~");
                    return;
                }

                that.dom.loading.show();
                Wlib.SendRequest("default/person/advise",req,"POST",function(data){
                    that.dom.loading.hide();
                    if(data.state == 1){
                        Wlib.tips("意见反馈成功");
                        history.back();
                    }
                });
            });
        }


    }

    var index = new Index();


})(window, $);