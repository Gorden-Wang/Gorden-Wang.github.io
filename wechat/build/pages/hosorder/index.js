/*! Generated by Clam: wechat 2015-11-21 11:59:38 */
!function(a,b,c){var d=function(){this.init()};d.prototype={init:function(){var a=this;a.addJuicerHandler(),a.cacheDom(),a.cacheData(),a.makeTimeList(),a.fetchData()},cacheDom:function(){var a=this;a.dom={wrapper:b("#page"),loading:b("#loading"),tpl:b("#tpl")}},cacheData:function(){var a=this;a.data={},a.data.clinicId=Wlib.getRequestParam("clinicId"),a.data.departmentId=Wlib.getRequestParam("departmentId"),a.data.titleId=Wlib.getRequestParam("titleId"),a.data.locationId=Wlib.getRequestParam("locationId"),a.data.depList=[],a.data.firstResult=0,a.data.maxResults=5},renderUI:function(){var a=this;a.dom.wrapper.html(juicer(a.dom.tpl.html(),a.data));var b=new c(".swiper-container",{nextButton:".pre",prevButton:".next",slidesPerView:4,centeredSlides:!1,paginationClickable:!0,spaceBetween:0});b.slideTo(a.data.fuckJ,0,!1),a.dom.loading.hide()},recacheDom:function(){var a=this;a.dom.address=b(".address"),a.dom.city=b(".citybox"),a.dom.overlay=b("#overlay"),a.dom.seldep=b("#seldep"),a.dom.selpro=b("#selpro"),a.dom.desdep=b("#desdep"),a.dom.despro=b("#despro"),a.dom.dataitems=b(".swiper-slide"),a.dom.taocan=b(".taochan-wrapper"),a.dom.times=b(".time-item"),a.dom.tab1=b("#tab1"),a.dom.tab2=b("#tab2"),a.dom.wrap1=b(".js"),a.dom.wrap2=b(".xz"),a.dom.times=b(".time-item")},addJuicerHandler:function(){var a=this;juicer.register("makeRate",function(a){var b=new Rate({rate:parseFloat(a),activeImg:"../../images/redstar.png",defaultImg:"../../images/graystar.png",halfImg:"../../images/halfstar.png"});return b.init()}),juicer.register("makeTitle",function(a){var b="";switch(a){case"1":b="\u4e3b\u4efb\u533b\u5e08";break;case"2":b="\u526f\u4e3b\u4efb\u533b\u5e08";break;case"3":b="\u4e3b\u6cbb\u533b\u5e08";break;case"4":b="\u4f4f\u9662\u533b\u5e08";break;case"-1":b="\u533b\u751f\u7ea7\u522b"}return b}),juicer.register("makeTimeListCheck",function(b,c,d){a.data.originTimeList;return c.indexOf(b)>-1?(a.data.fuckJ=d,"selected"):"dis"}),juicer.register("makeFuckTime",function(a){var b,a=new Date(a);switch(a.getDay()){case 0:b="\u5468\u65e5";break;case 1:b="\u5468\u4e00";break;case 2:b="\u5468\u4e8c";break;case 3:b="\u5468\u4e09";break;case 4:b="\u5468\u56db";break;case 5:b="\u5468\u4e94";break;case 6:b="\u5468\u516d"}var c={y:a.getFullYear(),m:a.getMonth()+1<10?"0"+(a.getMonth()+1):a.getMonth()+1,d:a.getDate(),w:b},d=c.y+"\u5e74"+c.m+"\u6708"+c.d+"\u65e5";return d})},fetchData:function(){var a=this,b={clinicId:a.data.clinicId};Wlib.SendRequestNew("treatQuery","clinicInfo",b,function(b){a.data.hos=b.value,a.fetchTime(),console.log(b)})},fetchTime:function(){var a=this,b={clinicId:a.data.clinicId,departmentId:a.data.departmentId,titleId:a.data.titleId};Wlib.SendRequestNew("treatQuery","findClinicTreatmentTime",b,function(b){return b.value?(a.data.timeEnable=b.value,void a.fetchDataByTime(b.value[0],function(){a.renderUI(),a.recacheDom(),a.fetchDepartments(),a.bindEvent(),console.log(a.data)})):(a.data.timeEnable=[],a.renderUI(),a.recacheDom(),a.fetchDepartments(),a.bindEvent(),void Wlib.tips("\u6ca1\u6709\u67e5\u8be2\u8bb0\u5f55"))})},makeTimeList:function(){var a=this,b=function(a){for(var b,c,d,e=[],f=1;7>=f;f++){switch(b=new Date(a.getTime()+24*f*3600*1e3),b.getDay()){case 0:d="\u661f\u671f\u65e5";break;case 1:d="\u661f\u671f\u4e00";break;case 2:d="\u661f\u671f\u4e8c";break;case 3:d="\u661f\u671f\u4e09";break;case 4:d="\u661f\u671f\u56db";break;case 5:d="\u661f\u671f\u4e94";break;case 6:d="\u661f\u671f\u516d"}c={y:b.getFullYear(),m:b.getMonth()+1<10?"0"+(b.getMonth()+1):b.getMonth()+1,d:b.getDate()<10?"0"+b.getDate():b.getDate(),w:d},c.des=c.y+"-"+c.m+"-"+c.d,e.push(c)}return e}(new Date);a.data.originTimeList=b},fetchDataByTime:function(a,b){var c=this,d={clinicId:c.data.clinicId,departmentId:c.data.departmentId,titleId:c.data.titleId,date:a,firstResult:c.data.firstResult,maxResults:c.data.maxResults};Wlib.SendRequestNew("treatQuery","findClinicTreatmentPlans",d,function(a){c.data.itemList=a.value,b&&b()})},bindNext:function(){var a=this,b={clinicId:a.data.clinicId,departmentId:a.data.departmentId,titleId:a.data.titleId,date:str,firstResult:a.data.firstResult,maxResults:a.data.maxResults};Wlib.SendRequestNew("treatQuery","findClinicTreatmentPlans",b,function(b){a.data.itemList=b.value})},renderDepart:function(){for(var a=this,c="",d="",e=0;e<a.data.depList.length;e++)a.data.departmentId==a.data.depList[e].data.id&&(d=a.data.depList[e].data.name,-1==a.data.departmentId&&(d="\u79d1\u5ba4")),c+='<div data-id="'+a.data.depList[e].data.id+'" class="condit"><span class="ks_'+a.data.depList[e].data.id+'"></span>'+a.data.depList[e].data.name+"</div>";b("#desdep").html(c),b("#seldep").text(d?d:"\u79d1\u5ba4"),a.dom.desdep.find("div").on("click",function(){var c=b(this).attr("data-id");a.data.departmentId=c,window.location.replace("../../pages/hosorder/index.html?"+a.makeURL())})},fetchDepartments:function(){var a=this;0==a.data.depList.length&&Wlib.SendRequestNew("commonQuery","findClinicDepts",{},function(b){0==b.errorCode&&b.value&&(a.data.depList=b.value,a.renderDepart())})},makeURL:function(){var a=this;return"clinicId="+a.data.clinicId+"&departmentId="+a.data.departmentId+"&titleId="+a.data.titleId},bindEvent:function(){function a(){c.dom.city.hide(),c.dom.overlay.removeClass("fadeIn"),c.dom.desdep.hide(),c.dom.despro.hide()}var c=this;c.dom.overlay.on("click",function(){c.dom.overlay.toggleClass("fadeIn"),a()}),c.dom.seldep.on("click",function(){a(),c.dom.desdep.show(),c.dom.overlay.toggleClass("fadeIn")}),c.dom.selpro.on("click",function(){a(),c.dom.despro.show(),c.dom.overlay.toggleClass("fadeIn")}),c.dom.dataitems.on("click",function(){b(this).hasClass("selected")||b(this).hasClass("dis")||b(this).addClass("selected").siblings().removeClass("selected")}),c.dom.taocan.on("click",function(){b(this).find("p").toggleClass("taocanToggle"),b(this).find(".t-r").toggleClass("rightToogle")}),c.dom.times.on("click",function(){b(this).hasClass("selected")||b(this).hasClass("dis")}),c.dom.tab1.on("click",function(){b(this).hasClass("select")||(b(this).addClass("select").siblings().removeClass("select"),c.dom.wrap1.show(),c.dom.wrap2.hide())}),c.dom.tab2.on("click",function(){b(this).hasClass("select")||(b(this).addClass("select").siblings().removeClass("select"),c.dom.wrap2.show(),c.dom.wrap1.hide())}),c.dom.despro.find("div").on("click",function(){var a=b(this).attr("data-id");c.data.titleId=a,window.location.replace("../../pages/hosorder/index.html?"+c.makeURL())}),c.dom.times.on("click",function(){if(!b(this).hasClass("selected")&&!b(this).hasClass("dis")){!!localStorage.getItem("userId")&&localStorage.setItem("userId","00000301");var a=["userId="+localStorage.getItem("userId"),"treatmentPlanDetailId="+b(this).attr("data-id"),"doc="+b(this).attr("data-name"),"dep="+b(this).attr("data-dep"),"add="+b(this).attr("data-add"),"time="+b(this).attr("data-time")+" "+b(this).text(),"price="+b(this).attr("data-price")],c=[].join.call(a,"&");console.log(c),window.location.href="../../pages/preorder/index.html?"+c}})}};new d}(window,$,Swiper);