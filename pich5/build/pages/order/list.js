/*! Generated by Clam: wechat 2016-05-09 16:25:30 */
!function(a,b){var c=function(){this.init()};c.prototype={init:function(){var a=this;a.addJuicerHandler(),a.cacheData(),a.cacheDom(),a.renderUI(),a.recacheDom(),a.bindEvent()},cacheData:function(){var a=this;a.data={}},cacheDom:function(){var a=this;a.dom={wrapper:b("#page"),loading:b("#loading"),tpl:b("#tpl")}},renderUI:function(){var a=this;a.dom.wrapper.html(juicer(a.dom.tpl.html(),a.data)),a._makeFooter(),a.dom.loading.hide()},recacheDom:function(){var a=this;a.dom.topLi=b(".top-tab li"),a.dom.staLi=b(".sta-tab li"),a.dom.itemLi=b(".list-wrapper li")},_makeFooter:function(){{var a={classname:"f-5",selected:!0,url:"",id:""};new Wlib.Footer(b("#footer"),a,4)}},addJuicerHandler:function(){juicer.register("getId",function(a){return Wlib.getRequestParam("id",a)}),juicer.register("getType",function(a){var b="";switch(a){case"\u51fa\u552e":b="../../pages/sale/index.html";break;case"\u62cd\u5356":b="../../pages/auction/index.html"}return b})},bindEvent:function(){var c=this;FastClick.attach(document.body),Wlib._bindLazyLoad(),c.dom.topLi.on("click",function(){var a=b(this).hasClass("selected");a||b(this).addClass("selected").siblings().removeClass("selected")}),c.dom.staLi.on("click",function(){var a=b(this).hasClass("selected");a||b(this).addClass("selected").siblings().removeClass("selected")}),c.dom.itemLi.on("click",function(){a.location="detail.html"})},getData:function(){var a=this;Wlib.SendRequest("default/api/square",{},"GET",function(b){a.data.data=b,a.renderUI(),a.recacheDom(),a.bindEvent()})}};new c}(window,$);