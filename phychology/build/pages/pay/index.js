/*! Generated by Clam: finace 2015-11-22 15:46:26 */
!function(a,b){var c=function(){this.init()};c.prototype={init:function(){var a=this;a.cacheData(),a.cacheDom(),a.addJuicerHandler(),a.renderUI(),a.recacheDom(),a.bindEvent()},cacheData:function(){var a=this;a.data={},a.data.param={id:Wlib.getRequestParam("productId"),img_w:b("body").width(),img_h:Math.floor(.609375*b("body").width()),user_headimg_w:100,user_headimg_h:100}},cacheDom:function(){var a=this;a.dom={wrapper:b("#page"),loading:b("#loading"),tpl:b("#tpl")}},renderUI:function(){var a=this;a.dom.wrapper.html(juicer(a.dom.tpl.html(),a.data)),a.dom.loading.hide()},recacheDom:function(){var a=this;a.dom.tabs=b(".tab-wrapper li"),a.dom.back=b(".m-icon0"),a.dom.nextBtn=b(".fixedbtn")},bindEvent:function(){var b=this;FastClick.attach(document.body),b.dom.back.on("click",function(){a.history.back()}),b.dom.nextBtn.on("click",function(){var b="<p class='title'>\u60a8\u7684\u8ba2\u5355\u5df2\u751f\u6210</p><p class='content'>\u8bf7\u7ee7\u7eed\u5b8c\u6210\u4f60\u7684\u54a8\u8be2\u9700\u6c42</p>",c="<div class='btn'>\u5b8c\u5584\u54a8\u8be2\u9700\u6c42</div>";Wlib.alert(b,c,function(){a.location="../../pages/addRequest/index.html"})})},addJuicerHandler:function(){juicer.register("makeRateImg",function(a){var b=(a+"").split("."),c=b[0],d=b[1]>0?".5":"";return c+d})},getItems:function(){function a(a){"1"==a.resultCode?(b.data.data=a.resultData,b.renderUI(),b.recacheDom(),b.bindEvent(),console.log(b.data.data)):Wlib.tips(a.message)}var b=this,c=function(a){var b="";for(var c in a)b+=c+"="+a[c]+"&";return b.slice(0,-1)}(b.data.param);Wlib.GetJsonData("app/product/detail/jsonp?"+c,a,a)}};new c}(window,$);