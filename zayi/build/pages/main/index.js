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
            that.addJuicerHandler();
            that.cacheDom();
            that.getPosition();


        },
        cacheData: function () {
            var that = this;
            that.data = {};

            that.data.param = {
                //cityCode=110100&lng=102&lat=54&img_w=100&img_h=100&product_img_w=100&product_img_h=100&queryTime=0&findStart=0&employStart=0&limit=10
                cityCode:0,
                img_w : 100,
                img_h : 100,
                product_img_w : $("body").width(),
                product_img_h : Math.floor(0.609375 * $("body").width()),
                queryTime : 0,
                findStart : 0,
                employStart : 0,
                limit : 10
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
        addJuicerHandler : function(){
          var that = this;
            juicer.register("checkIsImg", function (url) {
                return url ? "" : "no-img"
            });
            juicer.register("makeBuyOrSell", function (type) {
                return type==2 ? "zhao-icon" : "mai-icon";
            });

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

            $(".li-items").off("click").on("click",function(){
                var productId = $(this).attr("data-productId");
                var type = $(this).attr("data-type");

                if(type == "1"){
                    //卖
                    location.href = '../../pages/sell/index.html?productId='+productId;
                }else{
                    location.href = '../../pages/buy/index.html?productId='+productId;
                }
            })

            //add download

            $(".down-header,footer").on("click",function(){
                location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.zy.part_timejob"
            })
        },
        getPosition: function () {
            var that = this;

            function getLocation() {
                if (navigator.geolocation) {
                    var i=0;

                    var geolocationOptions={timeout:3000,enableHighAccuracy:true,maximumAge:5000};

                    navigator.geolocation.getCurrentPosition(showPosition,showPosition,geolocationOptions);
                }
                else {
                    that.getItems();
                }
            }

            function showPosition(position) {

                that.data.param.lat = position.coords ? position.coords.latitude : '39.90960456049752';
                that.data.param.lng =  position.coords ? position.coords.longitude : '116.3972282409668';



                that.getItems();
            }

            getLocation();


        },
        getItems: function () {

            var that = this;


            function callback(data){

                if(data.resultCode  == "1"){
                    //成功

                    that.data.data = data.resultData;

                    that.data.param.employStart = that.data.data.employStart;
                    if(that.data.param.findStart == 0){
                        that.renderUI();
                    }else{
                        that.renderItem();
                    }

                    that.recacheDom();
                    that.bindEvent();

                    if(that.data.data.list.length == that.data.param.limit){
                        that.bindNext(true);
                    }


                    console.log(that.data.data)


                }else{
                    Wlib.tips(data.message);
                }





            }

            var param = (function(data){

                var res = "";

                for(var i in data){
                    res += (i + "="+data[i])+"&";
                }

                return res.slice(0,-1);

            })(that.data.param);

            console.log(param)


            Wlib.GetJsonData("app/product/recommend/list/home/jsonp?"+param,callback,callback);

        },
        bindNext: function (tag) {
            var that = this;

            Wlib._bindScrollTobottom(function () {
                that.data.param.findStart = that.data.param.findStart + that.data.param.limit;

                that.getItems();
            },tag)


        },
        renderItem : function(){
            var that = this;
            $(".li-wrapper").append(juicer($("#tpl-item").html(),that.data));
        }
    }

    var index = new Index();


})(window, $);