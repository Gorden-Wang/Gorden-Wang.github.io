/*! Generated by Clam: wechat 2015-11-09 16:08:17 */
!function(a,b){var c=function(){this.init()};c.prototype={init:function(){var a=this;a.cacheDom(),a.renderUI(),a.recacheDom(),a.renderRate(),a.bindEvent()},cacheDom:function(){var a=this;a.dom={wrapper:b("#page"),loading:b("#loading"),tpl:b("#tpl")}},renderRate:function(){var a=this,b=a.RATE=new Rate({rate:5,wrapper:"#docrate",activeImg:"../../images/redstar.png",defaultImg:"../../images/graystar.png",halfImg:"../../images/halfstar.png"});b.init(),b.bindEvent("#docrate");var c=a.RATE1=new Rate({rate:5,wrapper:"#hosrate",activeImg:"../../images/redstar.png",defaultImg:"../../images/graystar.png"});c.init(),c.bindEvent("#hosrate")},renderUI:function(){var a=this;a.dom.wrapper.html(juicer(a.dom.tpl.html(),{})),a.dom.loading.hide()},recacheDom:function(){var a=this;a.dom.banner=b(".banner")},bindEvent:function(){var a=this;b("#addCom").on("click",function(){a.fetchData()})},fetchData:function(){var a=this,c={userid:Wlib.getRequestParam("userId"),doctorId:Wlib.getRequestParam("doctorId"),doctorContent:b("#doccontent").val(),doctorScore:a.RATE.rate||5,clinicId:Wlib.getRequestParam("clinicId"),clinicContent:b("#hoscontent").val(),clinicScore:a.RATE1.rate||5,treatmentPlanRecordId:Wlib.getRequestParam("id")};return""==b.trim(b("#doccontent").val())?void Wlib.tips("\u8bf7\u4e3a\u533b\u751f\u586b\u5199\u8bc4\u4ef7"):""==b.trim(b("#hoscontent").val())?void Wlib.tips("\u8bf7\u4e3a\u8bca\u6240\u586b\u5199\u8bc4\u4ef7"):void Wlib.SendRequestNew("treatOperate","addDoctorAndClinicComment",c,function(a){0==a.errorCode&&(Wlib.tips("\u611f\u8c22\u60a8\u7684\u53cd\u9988"),setTimeout(function(){window.history.back()},4e3))})}};new c}(window,$);