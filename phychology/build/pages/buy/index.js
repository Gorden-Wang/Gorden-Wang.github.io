/*! Generated by Clam: finace 2015-11-19 22:37:46 */
!function(a,b){var c=function(){this.init()};c.prototype={init:function(){var a=this;a.cacheData(),a.cacheDom(),a.addJuicerHandler(),a.getItems()},cacheData:function(){var a=this;a.data={},a.data.param={id:Wlib.getRequestParam("productId"),img_w:b("body").width(),img_h:Math.floor(.609375*b("body").width()),user_headimg_w:100,user_headimg_h:100}},cacheDom:function(){var a=this;a.dom={wrapper:b("#page"),loading:b("#loading"),tpl:b("#tpl")}},renderUI:function(){var a=this;a.dom.wrapper.html(juicer(a.dom.tpl.html(),a.data)),a.dom.loading.hide()},recacheDom:function(){var a=this;a.dom.full=b(".full-img")},bindEvent:function(){var a=this;b(".swiper-slide").on("click",function(){var c=b(this).find("img").attr("src");a.dom.full.show().append("<a class><img src='"+c+"'></a>")}),a.dom.full.on("click",function(){b(this).html(""),b(this).hide()}),b(".btn-wrapper").on("click",function(){var a=b(this).attr("data-target"),c=b(this).attr("data-text");b(a).toggle(),b(this).find("span").text("\u6536\u8d77"==b(this).find("span").text()?c:"\u6536\u8d77")}),b(".down-header,footer,.btn-down").on("click",function(){location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.zy.part_timejob"}),b(".des-wrapper").on("click",function(){location.href="../../pages/home/index.html?user_id="+a.data.data.product.userId})},addJuicerHandler:function(){juicer.register("makeRateImg",function(a){var b=(a+"").split("."),c=b[0],d=b[1]>0?".5":"";return c+d}),juicer.register("makeTimeTitle",function(a){return 2==a?"\u4ee5\u4e0b\u5de5\u4f5c\u65f6\u95f4\u7075\u6d3b\u53ef\u9009":3==a?"\u5fc5\u987b\u5728\u4ee5\u4e0b\u65f6\u95f4\u5b8c\u6210\u5de5\u4f5c":void 0}),juicer.register("makeAgeDis",function(a,b){return-1!=a&&-1!=b?a+"\u5c81-"+b+"\u5c81":-1!=a&&-1==b?"\u5927\u4e8e"+a+"\u5c81":-1==a&&-1!=b?"\u5c0f\u4e8e"+b+"\u5c81":-1==a&&-1==b?"\u4e0d\u8981\u6c42":void 0}),juicer.register("makeAudiDis",function(a){return 0==a?"\u4e0d\u9650":1==a?"\u9700\u9762\u8bd5":2==a?"\u4e0d\u9700\u9762\u8bd5":void 0}),juicer.register("checkDisplayMore",function(a,b){var b=b||3;return a.length>b?!0:!1})},getItems:function(){function a(a){"1"==a.resultCode?(b.data.data=a.resultData,b.renderUI(),b.recacheDom(),b.bindEvent(),console.log(b.data.data)):Wlib.tips(a.message)}var b=this,c=function(a){var b="";for(var c in a)b+=c+"="+a[c]+"&";return b.slice(0,-1)}(b.data.param);Wlib.GetJsonData("app/product/detail/jsonp?"+c,a,a)}};new c}(window,$);