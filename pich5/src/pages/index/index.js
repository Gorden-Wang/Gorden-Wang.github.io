/**
 * Created by gorden on 15/7/31.
 */
(function (win, $) {
    var Index = function () {


        var that = this;
        //Wlib.Weixin.goAuth();
        //Wlib.wx.pay();
        //Wlib.wx.auth(function(){
            Wlib.wx.getJSSign('',function(data){
                Wlib.wx.jsConfig(data,function(){
                    Wlib.wx.hideMenu();
                    that.init();
                });
            });

        //});
    }

    Index.prototype = {
        init: function () {
            var that = this;
            that.addJuicerHandler();
            that.cacheData();
            that.cacheDom();
            that.getData();
        },
        cacheData: function () {
            var that = this;

            that.data = {

            }

        },
        cacheDom: function () {
            var that = this;
            that.dom = {
                wrapper: $("#page"),
                loading: $("#loading"),
                tpl: $("#tpl"),
                tab1 : $("#tab1"),
                tab2 : $("#tab2"),
                tab3 : $("#tab3")
            }
        },
        renderUI: function () {
            var that = this;
            that.dom.wrapper.html(juicer(that.dom.tpl.html(), that.data));
            that.dom.loading.hide();
        },
        recacheDom: function () {
            var that = this;

            that.dom.newLi = $(".itemli li");
            that.dom.goApp = $(".icon2");
            that.dom.mainwrap = $("#wrap");

        },
        addJuicerHandler: function () {
            var that = this;
            juicer.register("getId", function (url) {
                  return  Wlib.getRequestParam("id",url);
            });
            juicer.register("getType", function (type) {
                var res = "";
                switch (type){
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

        },
        bindEvent: function () {
            var that = this;

            FastClick.attach(document.body);
            var swiper = new Swiper('#pics', {
                pagination: '.swiper-pagination'
            });

            Wlib._bindLazyLoad();

            that.dom.newLi.on("click",function(){
                var id = $(this).attr("data-id");
                var des = $(this).attr("data-url");

                if(!id){
                    Wlib.tips("已经下架");
                    return;
                }

                win.location = des + "?id="+id;
            });

            that.dom.goApp.on("click",function(){
                Wlib.tips("请下载APP体验更多功能");
                location.href = "http://www.talkart.cc/index.php?r=default/index/download";
            });

        },
        getData: function () {
            var that = this;


            Wlib.SendRequest("default/api/square",{},"GET",function(data){
                that.data.data = data;
                that.renderUI();
                that.recacheDom();
                that.rTab(that.data);

                that.bindEvent();
            })

        },
        rTab : function(data){
            var that = this;
            that.dom.mainwrap.html(juicer(that.dom.tab1.html(), data));
        }
    }

    var index = new Index();


})(window, $);