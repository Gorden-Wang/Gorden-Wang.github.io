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
            that.getData();
        },
        cacheData: function () {
            var that = this;

            that.data = {
                id: Wlib.getRequestParam("id")
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
            that.dom.moreLi = $("#more .swiper-slide");
            that.dom.scrollTo = $(".icon10");
            that.dom.myBtn = $("#mybtn");
            that.dom.buyBtn = $(".btn-w");
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
            var swiper = new Swiper('#pics', {
                pagination: '.swiper-pagination'
            });
            var swiper2 = new Swiper('#more', {
                slidesPerView: 3.5,
                paginationClickable: true,
                spaceBetween: 5
            });

            Wlib._scrollHide(100,that.dom.scrollTo);

            that.dom.moreLi.on("click",function(){
                var id = $(this).attr("data-id");
                var des = $(this).attr("data-url");

                if(!id){
                    Wlib.tips("已经下架");
                    return;
                }

                win.location = des + "?id="+id;
            });
            that.dom.scrollTo.on("click",function(){
                $.scrollTo(0,500);
            });

            that.dom.myBtn.on("click",function(){
                win.location = "../../pages/my/index.html";
            });
            Wlib._bindLazyLoad();
        },
        getData: function () {
            var that = this;

            //@TODO : uid 已经验证手机号
            var req = {
                id : that.data.id,
                uid : "",
                token : ""
            }
            Wlib.SendRequest("default/api/info",req,"GET",function(data){
                that.data.data = data;
                that.renderUI();
                that.recacheDom();
                that.bindEvent();
            })

        }
    }

    var index = new Index();


})(window, $);