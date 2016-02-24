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

            that.getData(function(){
                that.renderUI();
                that.recacheDom();
                that.bindEvent();
            });

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
            var data ={
                classname: "f-5",
                selected: true,
                url: '',
                id: ''
            };

            var footer = new Wlib.Footer($("#footer"), data,4);
        },
        addJuicerHandler: function () {
            var that = this;

            juicer.register("getMyLogo",function(){
                return localStorage.getItem("avatar")
            });
            juicer.register("makeSex",function(d){
                return d == 1 ? "男" : "女";
            });

            juicer.register("getQCode", function () {
                return location.protocol + "//"+document.domain+"/index.php?r="+"default/set/getQrcode&uid="+localStorage.getItem("uid");
            });

        },
        bindEvent: function () {
            var that = this;

            FastClick.attach(document.body);

            $("#help").on("click",function(){
                window.location.href = "http://www.talkart.cc/index.php?r=default/news/help";
            });

            $("#agree").on("click",function(){
                window.location.href = "http://www.talkart.cc/index.php?r=default/news/agreement";
            });
            $("#feedback").on("click",function(){
                location.href = "../../pages/feedback/index.html";
            });
        },
        getData :function(callback){
            var that = this;

            //default/person/personInfo

            Wlib.SendRequest("default/person/myInfo", {uid:localStorage.getItem("uid"),token:localStorage.getItem("token")}, "GET", function (data) {
                that.data.data = data;
                callback && callback();
            })
        }


    }

    var index = new Index();


})(window, $);