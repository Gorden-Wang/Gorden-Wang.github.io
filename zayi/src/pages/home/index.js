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
            that.renderUI();
            that.recacheDom();
            that.bindEvent();

            //that.getItems();
        },
        cacheData: function () {
            var that = this;

            that.data = {
                //productId: Wlib.getRequestParam("productId")

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
            that.dom.full = $(".full-img");
        },
        bindEvent: function () {
            var that = this;
            var btnText = "收起";
            $(".swiper-slide").on("click",function(){
                var src = $(this).find("img").attr("src");
                that.dom.full.show().append("<a class><img src='"+src +"'></a>");
            })
            that.dom.full.on("click",function(){
                $(this).html("");
                $(this).hide();
            });

            $(".btn-wrapper").on("click",function(){
               var target = $(this).attr("data-target");
                var text = $(this).attr("data-text");
                $(target).toggle();
                if($(this).find("span").text() == "收起"){
                    $(this).find("span").text(text);
                }else{
                    $(this).find("span").text("收起");
                }

                var bswiper = new Swiper('.reply-img', {
                    slidesPerView: 5,
                    paginationClickable: true,
                    spaceBetween: 10
                });

            });
        },
        getItems: function () {

            var that = this;


            function callback(data){

                if(data.success && data.code == "1"){
                    //成功

                    that.data.data = data.data;

                    that.renderUI();
                    that.recacheDom();
                    that.bindEvent();

                    console.log(that.data.data)


                }else{
                    Wlib.tips(data.message);
                }





            }


            Wlib.GetJsonData("http://121.199.57.142:8081/lifefinancial/api/public/lfProductDetail.json?productId=" + that.data.productId,callback,callback);

        }
    }

    var index = new Index();


})(window, $);