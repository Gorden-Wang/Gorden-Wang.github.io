/*! Generated by Clam: wechat 2015-11-09 16:08:17 */
!function(a,b,c){var d=function(){this.init()};d.prototype={init:function(){var a=this;a.addJuicerHandler(),a.cacheData(),a.cacheDom(),a.fetchData()},cacheDom:function(){var a=this;a.dom={wrapper:b("#page"),loading:b("#loading"),tpl:b("#tpl")}},cacheData:function(){var b=this;b.data={},b.data.cityList=a.CITYLIST,b.data.doctorId=Wlib.getRequestParam("doctorId")},renderUI:function(){var a=this;a.dom.wrapper.html(juicer(a.dom.tpl.html(),a.data));new c(".swiper-container",{nextButton:".pre",prevButton:".next",slidesPerView:4,centeredSlides:!1,paginationClickable:!0,spaceBetween:0});a.dom.loading.hide()},makeTimeList:function(){var a=this,b=function(a){for(var b,c,d,e=[],f=1;7>=f;f++){switch(b=new Date(a.getTime()+24*f*3600*1e3),b.getDay()){case 0:d="\u661f\u671f\u65e5";break;case 1:d="\u661f\u671f\u4e00";break;case 2:d="\u661f\u671f\u4e8c";break;case 3:d="\u661f\u671f\u4e09";break;case 4:d="\u661f\u671f\u56db";break;case 5:d="\u661f\u671f\u4e94";break;case 6:d="\u661f\u671f\u516d"}c={y:b.getFullYear(),m:b.getMonth()+1<10?"0"+(b.getMonth()+1):b.getMonth()+1,d:b.getDate(),w:d},e.push(c)}return e}(new Date);a.data.timeList=b},recacheDom:function(){var a=this;a.dom.left=b("#leftbtn"),a.dom.dataitems=b(".swiper-slide"),a.dom.taocan=b(".taochan-wrapper"),a.dom.times=b(".time-item")},fetchData:function(){var a=this,b={doctorId:a.data.doctorId,userid:Wlib.getUserId()};Wlib.SendRequestNew("treatQuery","findDoctorTreatmentPlans",b,function(b){a.data.docList=b.value,b.value?(a.makeTimeList(),console.log(a.data),a.fetchDocDetail(function(){a.renderUI(),a.recacheDom(),a.bindEvent(),a.dom.loading.hide()})):(a.dom.loading.hide(),Wlib.tips("\u6ca1\u6709\u8be5\u533b\u751f\u7684\u7ea6\u8bca\u4fe1\u606f\u3002",null,!0))})},fetchDocDetail:function(a){var b=this,c={doctorId:b.data.doctorId,userid:Wlib.getUserId()};Wlib.SendRequestNew("treatQuery","doctorInfo",c,function(c){b.data.doc=c.value,a&&a()})},addJuicerHandler:function(){var a=this;juicer.register("makeTitle",function(a){var b="";switch(a){case 1:b="\u4e3b\u4efb\u533b\u5e08";break;case 2:b="\u526f\u4e3b\u4efb\u533b\u5e08";break;case 3:b="\u4e3b\u6cbb\u533b\u5e08";break;case 4:b="\u4f4f\u9662\u533b\u5e08"}return b}),juicer.register("makeDes",function(a){for(var b="",c=0;c<a.length;c++)b+=a[c].name,c<a.lenght&&(b+=",");return b}),juicer.register("getPrice",function(){return a.data.docList[0].plan.price}),juicer.register("makeTime",function(a){var b,a=new Date(a);switch(a.getDay()){case 0:b="\u5468\u65e5";break;case 1:b="\u5468\u4e00";break;case 2:b="\u5468\u4e8c";break;case 3:b="\u5468\u4e09";break;case 4:b="\u5468\u56db";break;case 5:b="\u5468\u4e94";break;case 6:b="\u5468\u516d"}var c={y:a.getFullYear(),m:a.getMonth()+1<10?"0"+(a.getMonth()+1):a.getMonth()+1,d:a.getDate(),w:b},d=c.y+"\u5e74"+c.m+"\u6708"+c.d+"\u65e5";return"<div>"+d+"</div><span>"+b+"</span>"}),juicer.register("makeFuckTime",function(a){var b,a=new Date(a);switch(a.getDay()){case 0:b="\u5468\u65e5";break;case 1:b="\u5468\u4e00";break;case 2:b="\u5468\u4e8c";break;case 3:b="\u5468\u4e09";break;case 4:b="\u5468\u56db";break;case 5:b="\u5468\u4e94";break;case 6:b="\u5468\u516d"}var c={y:a.getFullYear(),m:a.getMonth()+1<10?"0"+(a.getMonth()+1):a.getMonth()+1,d:a.getDate(),w:b},d=c.y+"\u5e74"+c.m+"\u6708"+c.d+"\u65e5";return d})},bindEvent:function(){var a=this;a.dom.dataitems.on("click",function(){b(this).hasClass("selected")||b(this).addClass("selected").siblings().removeClass("selected")}),a.dom.taocan.on("click",function(){b(this).find("p").toggleClass("taocanToggle"),b(this).find(".t-r").toggleClass("rightToogle")}),a.dom.times.on("click",function(){if(!b(this).hasClass("selected")&&!b(this).hasClass("dis")){!!localStorage.getItem("userId")&&localStorage.setItem("userId","00000301");var c=["treatmentPlanId="+b(this).attr("data-plan"),"userId="+localStorage.getItem("userId"),"treatmentPlanDetailId="+b(this).attr("data-id"),"doc="+a.data.doc.name,"dep="+b("#res-dep").text(),"add="+b("#res-add").text(),"time="+b(this).attr("data-time")+" "+b(this).text(),"price="+a.data.docList[0].plan.price],d=[].join.call(c,"&");console.log(d),window.location.href="../../pages/preorder/index.html?"+d}})}};new d}(window,$,Swiper);