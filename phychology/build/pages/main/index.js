/*! Generated by Clam: finace 2015-11-19 22:20:19 */
!function(a,b){var c=function(){this.init()};c.prototype={init:function(){var a=this;a.cacheData(),a.addJuicerHandler(),a.cacheDom(),a.getPosition()},cacheData:function(){var a=this;a.data={},a.data.param={cityCode:0,img_w:100,img_h:100,product_img_w:b("body").width(),product_img_h:Math.floor(.609375*b("body").width()),queryTime:0,findStart:0,employStart:0,limit:10}},cacheDom:function(){var a=this;a.dom={wrapper:b("#page"),loading:b("#loading"),tpl:b("#tpl")}},renderUI:function(){var a=this;a.dom.wrapper.html(juicer(a.dom.tpl.html(),a.data)),Wlib._bindLazyLoad(),a.dom.loading.hide()},recacheDom:function(){var a=this;a.dom.full=b(".full-img")},addJuicerHandler:function(){juicer.register("checkIsImg",function(a){return a?"":"no-img"}),juicer.register("makeBuyOrSell",function(a){return 2==a?"zhao-icon":"mai-icon"})},bindEvent:function(){var a=this;b(".swiper-slide").on("click",function(){var c=b(this).find("img").attr("src");a.dom.full.show().append("<a class><img src='"+c+"'></a>")}),a.dom.full.on("click",function(){b(this).html(""),b(this).hide()}),b(".btn-wrapper").on("click",function(){var a=b(this).attr("data-target"),c=b(this).attr("data-text");b(a).toggle(),b(this).find("span").text("\u6536\u8d77"==b(this).find("span").text()?c:"\u6536\u8d77");new Swiper(".reply-img",{slidesPerView:5,paginationClickable:!0,spaceBetween:10})}),b(".li-items").off("click").on("click",function(){var a=b(this).attr("data-productId"),c=b(this).attr("data-type");location.href="1"==c?"../../pages/sell/index.html?productId="+a:"../../pages/buy/index.html?productId="+a}),b(".down-header,footer").on("click",function(){location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.zy.part_timejob"})},getPosition:function(){function a(){if(navigator.geolocation){var a={timeout:3e3,enableHighAccuracy:!0,maximumAge:5e3};navigator.geolocation.getCurrentPosition(b,b,a)}else c.getItems()}function b(a){c.data.param.lat=a.coords?a.coords.latitude:"39.90960456049752",c.data.param.lng=a.coords?a.coords.longitude:"116.3972282409668",c.getItems()}var c=this;a()},getItems:function(){function a(a){"1"==a.resultCode?(b.data.data=a.resultData,b.data.param.employStart=b.data.data.employStart,0==b.data.param.findStart?b.renderUI():b.renderItem(),b.recacheDom(),b.bindEvent(),b.data.data.list.length==b.data.param.limit&&b.bindNext(!0),console.log(b.data.data)):Wlib.tips(a.message)}var b=this,c=function(a){var b="";for(var c in a)b+=c+"="+a[c]+"&";return b.slice(0,-1)}(b.data.param);console.log(c),Wlib.GetJsonData("app/product/recommend/list/home/jsonp?"+c,a,a)},bindNext:function(a){var b=this;Wlib._bindScrollTobottom(function(){b.data.param.findStart=b.data.param.findStart+b.data.param.limit,b.getItems()},a)},renderItem:function(){var a=this;b(".li-wrapper").append(juicer(b("#tpl-item").html(),a.data)),Wlib._bindLazyLoad()}};new c}(window,$);