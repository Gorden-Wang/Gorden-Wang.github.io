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
            //that.renderUI();


            that.getItems();
        },
        cacheData: function () {
            var that = this;

            that.data = {
                productId: Wlib.getRequestParam("productId")

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
        },
        bindEvent: function () {
            var that = this;
            var numwrapper = $(".dest-num");
            var num = parseInt(numwrapper.text());
            $(".sku-items .sku-item").on("click",function(){

                var isSel = $(this).hasClass("selected");

                if(!isSel){
                    $(this).addClass("selected").siblings().removeClass("selected");

                    that.data.stocks = $(this).attr("data-stocks");
                }

            });

            $("#l-btn").on("click",function(){
                if(num != 1){
                    num--;
                    numwrapper.text(num);
                }
            });

            $("#r-btn").on("click",function(){
                if(num != that.data.stocks){
                    num++;
                    numwrapper.text(num);
                }
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