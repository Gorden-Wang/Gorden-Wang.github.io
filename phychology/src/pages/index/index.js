/**
 * Created by gorden on 15/10/10.
 */
(function (win, $) {
    var Index = function () {
        this.init();
    }

    Index.prototype = {
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
                tpl: $("#tpl"),
                rWrapper : $("#right-wrapper"),
                rtpl : $("#r-tpl"),
                lWrapper : $("#left-wrapper"),
                ltpl : $("#l-tpl"),
            }
        },
        renderUI: function () {
            var that = this;
            that.RSLIDE = new Wlib.Slider({
                wrapper: "#right-wrapper",
                sibling : "#page",
                scroll : "#scrollwrapper",
                dir: "1",
            });
            that.LSLIDE = new Wlib.Slider({
                wrapper: "#left-wrapper",
                sibling : "#page",
                scroll : "",
                dir: "0"
            });
            that.dom.wrapper.html(juicer(that.dom.tpl.html(), that.data));
            that.dom.rWrapper.html(juicer(that.dom.rtpl.html(), {}));
            that.dom.lWrapper.html(juicer(that.dom.ltpl.html(), that.data));
            that.RSLIDE.bindScroll();
            that.LSLIDE.bindScroll();
            that.dom.loading.hide();
        },
        recacheDom: function () {
            var that = this;
            that.dom.tabs = $(".tab-wrapper li");
            that.dom.mybtn = $("#mybtn");
            that.dom.searchbtn = $("#searchbtn");
            that.dom.filterbtn = $("#filterbtn");
            that.dom.lbbtn = $(".m-icon0");
            that.dom.filterLis = $(".r-content li");
            that.dom.resetbtn = $("#resetbtn");
            that.dom.filterSearchbtn = $("#filterSearchbtn");
            that.dom.addNoteBtn = $(".fixedbtn");
            that.dom.inetestbtn = $("#inetestbtn");
            that.dom.newsbtn = $("#newsbtn");
            that.dom.setbtn = $("#setbtn");
            //@TODO : 以后是点击任意左侧跳转login
            that.dom.loginbtn = $(".top-wrapper");
            that.dom.items = $(".ul-wrapper li");

        },
        bindEvent: function () {
            var that = this;

            FastClick.attach(document.body);

            that.dom.tabs.on("click",function(){
                var target = $(this).attr("data-target");
                var nextTarget = $(this).siblings().attr("data-target");
                var isSelect = $(this).hasClass("selected");
                if(!isSelect){
                    $(nextTarget).hide();
                    $(target).show();
                    $(this).addClass("selected").siblings().removeClass("selected");
                }
            });

            that.dom.filterbtn.on("click",function(){
                that.RSLIDE.slideIn();
            });
            that.dom.mybtn.on("click",function(){
                that.LSLIDE.slideIn();
            });
            that.dom.lbbtn.on("click",function(){
                that.LSLIDE.slideOut();
            });
            that.dom.searchbtn.on("click",function(){
                win.location = "../../pages/index/search.html";
            });

            that.dom.filterLis.on("click",function(){
                if(!$(this).hasClass("selected")){
                    $(this).addClass("selected").siblings().removeClass("selected")
                }
            });
            that.dom.resetbtn.on("click",function(){
               that.dom.filterLis.not(".unreset").removeClass("selected");
            });
            that.dom.filterSearchbtn.on("click",function(){
                that.dom.loading.show();
                setTimeout(function(){
                    that.RSLIDE.slideOut();
                    that.dom.resetbtn.trigger("click");
                    that.dom.loading.hide();
                },2000)
            });
            that.dom.addNoteBtn.on("click",function(){
                win.location = "../../pages/addNote/index.html";
            });
            that.dom.inetestbtn.on("click",function(){
                win.location = "../../pages/interest/index.html"
            });
            that.dom.newsbtn.on("click",function(){
                win.location = "../../pages/news/index.html"
            });
            that.dom.setbtn.on("click",function(){
                win.location = "../../pages/setting/index.html"
            });
            that.dom.loginbtn.on("click",function(){
                win.location = "../../pages/login/index.html"
            });
            that.dom.items.on("click",function(){
                win.location = "../../pages/item/index.html"
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
        getItems: function () {

            var that = this;


            function callback(data) {

                if (data.resultCode == "1") {
                    //成功

                    that.data.data = data.resultData;

                    that.renderUI();
                    that.recacheDom();
                    that.bindEvent();


                    console.log(that.data.data)


                } else {
                    Wlib.tips(data.message);
                }

            }

            var param = (function (data) {

                var res = "";

                for (var i in data) {
                    res += (i + "=" + data[i]) + "&";
                }

                return res.slice(0, -1);

            })(that.data.param);


            Wlib.GetJsonData("app/product/detail/jsonp?" + param, callback, callback);

        }
    }

    var index = new Index();


})(window, $);