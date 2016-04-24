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

            that.getAllData(function(){
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
            juicer.register("getId", function (url) {
                return Wlib.getRequestParam("id", url);
            });
            juicer.register("getType", function (type) {
                var res = "";
                switch (type) {
                    case "出售":
                        res = "../../pages/sale/index.html";
                        break;
                    case "拍卖":
                        res = "../../pages/auction/index.html";
                        break;
                    //  @TODO : 鉴定，欣赏

                }
                return res;
            });
            juicer.register("makePercentage",function(s,n){
                s = parseInt(s),n=parseInt(n);
                return (s/(s+n))*100+"%";
            })

        },
        bindEvent: function () {
            var that = this;

            FastClick.attach(document.body);
            var swiper = new Swiper('#pics', {
                pagination: '.swiper-pagination'
            });

            Wlib._bindLazyLoad();

            that.dom.newLi.on("click", function () {
                var id = $(this).attr("data-id");
                var des = $(this).attr("data-url");

                if (!id) {
                    Wlib.tips("已经下架");
                    return;
                }

                win.location = des + "?id=" + id;
            });
            that.dom.wallet.on("click",function(){
                win.location = "../../pages/wallet/index.html";
            });
            $(".swiper-slide").on("click",function(){
                //data-id="${item.id}" data-type="${item.type}"
                var id = $(this).attr("data-id"),type=$(this).attr("data-type"),itype=$(this).attr("data-itype");
                win.location.href = window.location.protocol+"//"+document.domain+"/index.php?r=default/share/index&id="+id+"&itype="+itype;
            });

            $(".user-wrapper").on("click",function(){
                win.location.href = "../../pages/myInfo/index.html";
            })

        },
        getAllData : function(callback){
            var that = this;
            that.getBannerData(function(){
                that.getUserData(callback);
            });
        },
        getUserData : function(callback){
            var that = this;
            Wlib.SendRequest("default/person/myInfo", {uid:localStorage.getItem("uid"),token:localStorage.getItem("token")}, "GET", function (data) {
                that.data.user = data;
                !that.data.user.logo && (that.data.user.logo = localStorage.getItem("avatar"));
                callback && callback();
            });
        },
        getBannerData : function(callback){

            var that = this;
            Wlib.SendRequest("default/person/pushInfo", {}, "GET", function (data) {
                that.data.banner = data;
                callback && callback();
            })
        }
    }

    var index = new Index();


})(window, $);