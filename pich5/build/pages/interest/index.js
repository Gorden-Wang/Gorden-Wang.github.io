/*! Generated by Clam: wechat 2016-05-09 16:25:30 */
!function(a,b){var c=function(){this.init()};c.prototype={init:function(){var a=this;a.addJuicerHandler(),a.cacheData(),a.cacheDom(),a.getData()},cacheData:function(){var a=this;a.data={}},cacheDom:function(){var a=this;a.dom={wrapper:b("#page"),loading:b("#loading"),tpl:b("#tpl")}},renderUI:function(){var a=this;a.dom.wrapper.html(juicer(a.dom.tpl.html(),a.data)),a._makeFooter(),a.dom.loading.hide()},recacheDom:function(){var a=this;a.dom.topWrapper=b(".top-header"),a.dom.addBtn=b(".f-3"),a.dom.input=b("input"),a.dom.saveBtn=b(".right-w"),a.dom.inputWrap=b(".input-wrapper")},_makeFooter:function(){{var a={classname:"f-5",selected:!0,url:"",id:""};new Wlib.Footer(b("#footer"),a,4)}},addJuicerHandler:function(){juicer.register("getId",function(a){return Wlib.getRequestParam("id",a)})},bindEvent:function(){var a=this;FastClick.attach(document.body),a.dom.addBtn.on("click",function(){a.dom.topWrapper.hide(),a.dom.inputWrap.show()}),a.dom.saveBtn.on("click",function(){a.dom.loading.show(),a.optIntrest(1,a.dom.input.val())}),b(".del").on("click",function(){a.optIntrest(2,b(this).attr("data-name"),b(this).parent())})},optIntrest:function(a,c,d){var e=this,f={type:a,uid:localStorage.getItem("uid"),token:localStorage.getItem("token"),painter:c};Wlib.SendRequest("default/person/interest",f,"POST",function(f){if(1==f.state){if(Wlib.tips("\u64cd\u4f5c\u6210\u529f"),e.dom.loading.hide(),1==a){var g=b('<li><span class="dot"></span><p>'+c+'</p><span class="del" data-name="'+c+'">\u5220\u9664</span></li>');b(".list-wrapper ul").append(g),b(g).find(".del").on("click",function(){e.optIntrest(2,b(this).attr("data-name"),g)})}2==a&&b(d).remove()}})},getData:function(){var a=this,b={uid:localStorage.getItem("uid"),token:localStorage.getItem("token")};Wlib.SendRequest("default/person/myInterest",b,"GET",function(b){a.data.list=b,a.renderUI(),a.recacheDom(),a.bindEvent(),0==b.list.length&&Wlib.tips("\u8fd8\u6ca1\u6709\u611f\u5174\u8da3\u7684\u753b\u5bb6")})}};new c}(window,$);