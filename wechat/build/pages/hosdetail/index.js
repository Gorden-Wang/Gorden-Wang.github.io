/*! Generated by Clam: wechat 2015-11-06 17:24:05 */
!function(a,b){var c=function(){this.init()};c.prototype={init:function(){var a=this;a.addJuicerHandler(),a.cacheDom(),a.cacheData(),a.fetchData()},cacheDom:function(){var a=this;a.dom={wrapper:b("#page"),loading:b("#loading"),tpl:b("#tpl")}},cacheData:function(){var a=this;a.data={},a.data.clinicId=Wlib.getRequestParam("clinicId")},renderUI:function(){var a=this;a.dom.wrapper.html(juicer(a.dom.tpl.html(),a.data)),a.dom.loading.hide()},recacheDom:function(){var a=this;a.dom.hosdes=b("#hosdes"),a.dom.hostip=b("#hostip"),a.dom.deswrapper=b("#deswrapper"),a.dom.tipwrapper=b("#tipwrapper")},fetchData:function(){var a=this,b={clinicId:a.data.clinicId};Wlib.SendRequestNew("treatQuery","clinicInfo",b,function(b){a.data.hos=b.value,a.renderUI(),a.recacheDom(),a.bindEvent(),console.log(b)})},addJuicerHandler:function(){juicer.register("makeRate",function(a){var b=new Rate({rate:parseFloat(a),activeImg:"../../images/redstar.png",defaultImg:"../../images/graystar.png",halfImg:"../../images/halfstar.png"});return b.init()})},bindEvent:function(){var a=this;a.dom.hosdes.on("click",function(){b(this).hasClass("tab_selected")||(b(this).addClass("tab_selected").siblings().removeClass("tab_selected"),a.dom.deswrapper.show(),a.dom.tipwrapper.hide())}),a.dom.hostip.on("click",function(){b(this).hasClass("tab_selected")||(b(this).addClass("tab_selected").siblings().removeClass("tab_selected"),a.dom.tipwrapper.show(),a.dom.deswrapper.hide())}),b(".list_mz").on("click",function(a){if(b(a.target).hasClass("tel")){var c=b(a.target).text();b("body").append("<iframe src='tel:"+c+"'></iframe>")}else window.location=b(this).attr("data-href")})}};new c}(window,$);