/*! Generated by Clam: wechat 2015-11-23 17:30:59 */
!function(a,b){var c=function(){this.init()};c.prototype={init:function(){var a=this;a.cacheData(),a.cacheDom(),a.getContactList()},cacheData:function(){var a=this;a.data={treatmentPlanId:Wlib.getRequestParam("treatmentPlanId"),userId:Wlib.getRequestParam("userId"),treatmentPlanDetailId:Wlib.getRequestParam("treatmentPlanDetailId"),doc:Wlib.getRequestParam("doc"),dep:Wlib.getRequestParam("dep"),add:Wlib.getRequestParam("add"),time:Wlib.getRequestParam("time"),price:Wlib.getRequestParam("price")},a.data.CONID=""},cacheDom:function(){var a=this;a.dom={wrapper:b("#page"),loading:b("#loading"),tpl:b("#tpl")}},renderUI:function(){var a=this;a.dom.wrapper.html(juicer(a.dom.tpl.html(),a.data)),a.dom.loading.hide()},recacheDom:function(){var a=this;a.dom.con=b(".history-wrapper li"),a.dom.name=b("#name"),a.dom.idcode=b("#idcode"),a.dom.tel=b("#tel"),a.dom.btn=b(".btn")},getContactList:function(){var a=this;Wlib.SendRequestNew("treatOperate","findReserveProfiles",{userid:a.data.userId,firstResult:0,maxResults:3},function(b){0==b.errorCode&&(a.data.conList=b.value,a.renderUI(),a.recacheDom(),a.bindEvent())})},bindEvent:function(){var a=this;a.dom.con.on("click",function(){var c=b(this).find("div"),d=b(c).hasClass("radio_se");d?(b(c).removeClass("radio_se"),a.renderInput(this,!1),a.data.CONID="",a.dom.btn.addClass("dis")):(b(c).addClass("radio_se"),b(this).siblings().find("div").removeClass("radio_se"),a.renderInput(this,!0),a.data.CONID=b(this).attr("data-id"),a.dom.btn.removeClass("dis"))}),b("input").on("input",function(){var c=a.compare();a.dom.con.find("div").removeClass("radio_se"),c.res?(b("li[data-id='"+c.id+"'").find("div").addClass("radio_se"),a.data.CONID=c.id):a.data.CONID=""}),a.dom.btn.on("click",function(){({treatmentPlanId:Wlib.getRequestParam("treatmentPlanId"),userId:Wlib.getRequestParam("userId"),treatmentPlanDetailId:Wlib.getRequestParam("treatmentPlanDetailId"),reserveId:a.data.CONID});if(!b(this).hasClass("dis"))return a.data.CONID?void a.addOrder():void a.addContact(function(){a.addOrder()})})},addOrder:function(){var a=this,b={userid:Wlib.getRequestParam("userId"),treatmentPlanDetailId:Wlib.getRequestParam("treatmentPlanDetailId"),profileId:a.data.CONID};Wlib.SendRequestNew("treatOperate","orderTreatmentPlan",b,function(a){0==a.errorCode?(alert("\u4e0b\u5355\u6210\u529f\uff0c\u53bb\u652f\u4ed8\u53bb\u3002\u3002\u9700\u8981\u63d0\u4f9b\u652f\u4ed8\u63a5\u53e3\u3002"),location.href="../../pages/paysucc/index.html?orderId="+a.entity+"&userId="+Wlib.getRequestParam("userId")):Wlib.tips(a.message)})},addContact:function(a){var b=this,c={name:encodeURIComponent(b.dom.name.val()),phone:b.dom.tel.val(),idNumber:b.dom.idcode.val(),userid:b.data.userId,remark:""};Wlib.SendRequestNew("treatOperate","addReserveProfile",c,function(c){0==c.errorCode?(b.data.CONID=c.value.id,a&&a()):Wlib.tips(c.message)})},renderInput:function(a,c){var d=this,e=b(a).find(".l-name").text(),f=b(a).find(".l-code").text(),g=b(a).find(".l-tel").text();c?(d.dom.name.val(e),d.dom.idcode.val(f),d.dom.tel.val(g)):(d.dom.name.val(""),d.dom.idcode.val(""),d.dom.tel.val(""))},compare:function(){for(var a=this,c={userName:a.dom.name.val(),phone:a.dom.tel.val(),idNumber:a.dom.idcode.val()},d=a.data.conList,e=!1,f="",g=0;g<d.length;g++)if(b.trim(c.userName)==d[g].userName&&b.trim(c.idNumber)==d[g].idNumber&&b.trim(c.phone)==d[g].phone){e=!0,f=d[g].id;break}return c.userName&&c.phone&&c.idNumber&&a.dom.btn.hasClass("dis")&&a.dom.btn.removeClass("dis"),{res:e,id:f}}};new c}(window,$);