/*! Generated by Clam: wechat 2016-05-09 16:25:30 */
!function(a,b){var c=function(){this.init()};c.prototype={init:function(){var a=this;a.addJuicerHandler(),a.cacheData(),a.cacheDom(),a.getData(function(){a.renderUI(),a.recacheDom(),a.bindEvent()})},cacheData:function(){var a=this;a.data={}},cacheDom:function(){var a=this;a.dom={wrapper:b("#page"),loading:b("#loading"),tpl:b("#tpl")}},renderUI:function(){var a=this;a.dom.wrapper.html(juicer(a.dom.tpl.html(),a.data)),a._makeFooter(),a.dom.loading.hide()},recacheDom:function(){var a=this;a.dom.newLi=b(".itemli li"),a.dom.wallet=b(".wallet-wrap")},_makeFooter:function(){{var a={classname:"f-5",selected:!0,url:"",id:""};new Wlib.Footer(b("#footer"),a,4)}},addJuicerHandler:function(){juicer.register("getMyLogo",function(){return localStorage.getItem("avatar")}),juicer.register("makeSex",function(a){return 1==a?"\u7537":"\u5973"}),juicer.register("getQCode",function(){return location.protocol+"//"+document.domain+"/index.php?r=default/set/getQrcode&uid="+localStorage.getItem("uid")})},bindEvent:function(){FastClick.attach(document.body),b("#help").on("click",function(){window.location.href="http://www.talkart.cc/index.php?r=default/news/help"}),b("#agree").on("click",function(){window.location.href="http://www.talkart.cc/index.php?r=default/news/agreement"}),b("#feedback").on("click",function(){location.href="../../pages/feedback/index.html"})},getData:function(a){var b=this;Wlib.SendRequest("default/person/myInfo",{uid:localStorage.getItem("uid"),token:localStorage.getItem("token")},"GET",function(c){b.data.data=c,a&&a()})}};new c}(window,$);