/*! Generated by Clam: wechat 2016-05-09 16:25:30 */
!function(a,b){var c=function(){var a=this;Wlib.wx.checkLogin(function(){Wlib.wx.getJSSign("",function(b){Wlib.wx.jsConfig(b,function(){Wlib.wx.hideMenu(),a.init()})})})};c.prototype={init:function(){var a=this;a.addJuicerHandler(),a.cacheData(),a.cacheDom(),a.getData("#tab1",function(c,d){a.dom.mainwrap.html(juicer(b(c).html(),d)),a._makeFooter()})},cacheData:function(){var a=this;a.data={}},cacheDom:function(){var a=this;a.dom={wrapper:b("#page"),loading:b("#loading"),tpl:b("#tpl"),tab1:b("#tab1"),tab2:b("#tab2"),tab3:b("#tab3"),picli:b("#picli")}},renderUI:function(){var a=this;a.dom.wrapper.html(juicer(a.dom.tpl.html(),a.data)),a.dom.loading.hide()},recacheDom:function(){var a=this;a.dom.newLi=b(".itemli li"),a.dom.mainwrap=b("#wrap"),a.dom.tab=b("header li"),a.dom.goApp=b(".icon2")},recacheDom2:function(){var a=this;a.dom.tabul=b(".ul-wrap ul")},_makeFooter:function(){var a=this,c={classname:"f-4",selected:!0,url:"",id:""};a.FOOTER=new Wlib.Footer(b("#footer"),c,3)},addJuicerHandler:function(){juicer.register("getId",function(a){return Wlib.getRequestParam("id",a)}),juicer.register("getType",function(a){var b="";switch(a){case"\u51fa\u552e":b="../../pages/sale/index.html";break;case"\u62cd\u5356":b="../../pages/auction/index.html";break;case"\u9274\u5b9a":b="../../pages/identify/index.html";break;case"\u6b23\u8d4f":b="../../pages/appreciate/index.html"}return b}),juicer.register("makeLoveDis",function(a){var b=a.map(function(a){return a.name});return b.join(",")}),juicer.register("getFuckType",function(a){var b="",a=parseInt(a);switch(a){case 2:b="../../pages/sale/index.html";break;case 1:b="../../pages/auction/index.html";break;case 7:b="../../pages/appreciate/index.html";break;case 6:b="../../pages/identify/index.html";break;case 3:b="../../pages/text/index.html"}return b})},bindEvent:function(){var c=this;FastClick.attach(document.body);new Swiper("#pics",{pagination:".swiper-pagination"});Wlib._bindLazyLoad(),c.dom.newLi.on("click",function(){var c=b(this).attr("data-id"),d=b(this).attr("data-url");return c?void(a.location=d+"?id="+c):void Wlib.tips("\u5df2\u7ecf\u4e0b\u67b6")}),c.dom.goApp.on("click",function(){Wlib.tips("\u8bf7\u4e0b\u8f7dAPP\u4f53\u9a8c\u66f4\u591a\u529f\u80fd"),location.href="http://www.talkart.cc/index.php?r=default/index/download"}),c.dom.tab.on("click",function(){var a=b(this).hasClass("selected"),d=b(this).attr("tpl-id");a||(c.dom.loading.show(),b(this).addClass("selected").siblings().removeClass("selected"),c.rTab("#"+d,c.data[d]))})},bindEvent2:function(){Wlib._bindLazyLoad(),b(".ul-wrap li").on("click",function(){var c=b(this).attr("data-id"),d=b(this).attr("data-url");return c?void(a.location=d+"?id="+c):void Wlib.tips("\u5df2\u7ecf\u4e0b\u67b6")})},getData:function(a,b){var c=this;Wlib.SendRequest("default/api/square",{},"GET",function(d){c.data.data=d,c.renderUI(),c.recacheDom(),b&&b(a,c.data),c.recacheDom(),c.bindEvent()})},rTab:function(a){function c(a,c){d.dom.mainwrap.html(juicer(b(a).html(),c)),0==b("#footer ul").length&&d._makeFooter(),d.dom.loading.hide()}var d=this;switch(d.data={},a){case"#tab1":d.getData(a,c);break;case"#tab2":d.getInterestData(a,c);break;case"#tab3":d.getFriendData(a,c)}},getFriendData:function(a,b){var c=this,d={token:localStorage.getItem("token"),uid:localStorage.getItem("uid")};Wlib.SendRequest("default/api/friends",d,"GET",function(d){c.data.data=d,b&&b(a,c.data),c.recacheDom2(),d.list.length>0&&c.dom.tabul.append(juicer(c.dom.picli.html(),c.data)),10==d.list.length&&c.bindNext(!0,"",!0),0==d.list.length&&(Wlib.tips("\u60a8\u7684\u753b\u53cb\u6ca1\u6709\u53d1\u5e03\u4efb\u4f55\u4f5c\u54c1\uff5e"),c.dom.loading.hide()),c.bindEvent2()})},getInterestData:function(a,b){var c=this,d={token:localStorage.getItem("token"),uid:localStorage.getItem("uid")};Wlib.SendRequest("default/api/interest",d,"GET",function(d){c.data.data=d,b&&b(a,c.data),c.recacheDom2(),d.list.length>0&&c.dom.tabul.append(juicer(c.dom.picli.html(),c.data)),10==d.list.length&&c.bindNext(!0),0==d.list.length&&(Wlib.tips("\u5174\u8da3\u5708\u6ca1\u6709\u6570\u636e"),c.dom.loading.hide()),c.bindEvent2()})},bindNext:function(a,b,c){var d=this;Wlib._bindScrollTobottom(function(){var a={token:localStorage.getItem("token"),uid:localStorage.getItem("uid"),infoid:b||d.data.data.list[9].id},e=c?"default/api/friends":"default/api/interest";Wlib.SendRequest(e,a,"GET",function(a){var b={};b.data=a,0!=a.list.length&&(d.dom.tabul.append(juicer(d.dom.picli.html(),b)),10==a.list.length&&d.bindNext(!0,a.list[9].id),d.bindEvent2())})},a)}};new c}(window,$);