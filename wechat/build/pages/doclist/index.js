/*! Generated by Clam: wechat 2015-11-09 16:08:17 */
!function(a,b){var c=function(){this.init()};c.prototype={init:function(){var a=this;a.cacheData(),a.cacheDom(),a.addJuicerHandler(),a.fetchDocList()},cacheData:function(){var b=this;b.data={},b.data.locationId=Wlib.getRequestParam("locationId"),b.data.cityList=a.CITYLIST,b.data.depList=[],b.data.departmentId=Wlib.getRequestParam("departmentId")||-1,b.data.titleId=Wlib.getRequestParam("titleId")||-1,b.data.maxResults=10,b.data.firstResult=0},cacheDom:function(){var a=this;a.dom={wrapper:b("#page"),loading:b("#loading"),tpl:b("#tpl"),itemtpl:b("#itemtpl")}},renderUI:function(){var a=this;a.dom.wrapper.html(juicer(a.dom.tpl.html(),a.data)),Wlib._bindLazyLoad(),a.dom.loading.hide()},recacheDom:function(){var a=this;a.dom.address=b(".address"),a.dom.city=b(".citybox"),a.dom.overlay=b("#overlay"),a.dom.seldep=b("#seldep"),a.dom.selpro=b("#selpro"),a.dom.desdep=b("#desdep"),a.dom.despro=b("#despro"),a.dom.person=b(".personal")},makeURL:function(){var a=this;return"locationId="+a.data.locationId+"&departmentId="+a.data.departmentId+"&titleId="+a.data.titleId},bindEvent:function(){function a(){c.dom.city.hide(),c.dom.overlay.removeClass("fadeIn"),c.dom.desdep.hide(),c.dom.despro.hide()}var c=this;c.dom.address.on("click",function(){a(),c.dom.city.show(),c.dom.overlay.toggleClass("fadeIn")}),c.dom.overlay.on("click",function(){c.dom.overlay.toggleClass("fadeIn"),a()}),c.dom.seldep.on("click",function(){a(),c.dom.desdep.show(),c.dom.overlay.toggleClass("fadeIn")}),c.dom.selpro.on("click",function(){a(),c.dom.despro.show(),c.dom.overlay.toggleClass("fadeIn")}),c.dom.city.find("li").on("click",function(){var a=b(this).attr("data-id");c.data.locationId=a,window.location.replace("../../pages/doclist/index.html?"+c.makeURL())}),c.dom.despro.find("div").on("click",function(){var a=b(this).attr("data-id");c.data.titleId=a,window.location.replace("../../pages/doclist/index.html?"+c.makeURL())}),c.dom.person.on("click",function(){window.location="../../pages/person/index.html"})},addJuicerHandler:function(){juicer.register("makeTitle",function(a){var b="";switch(a){case 1:b="\u4e3b\u4efb\u533b\u5e08";break;case 2:b="\u526f\u4e3b\u4efb\u533b\u5e08";break;case 3:b="\u4e3b\u6cbb\u533b\u5e08";break;case 4:b="\u4f4f\u9662\u533b\u5e08";break;case-1:b="\u533b\u751f\u7ea7\u522b"}return b}),juicer.register("makeCityName",function(a){for(var b=0;b<CITYLIST.length;b++)if(a==CITYLIST[b].id)return CITYLIST[b].name})},bindNext:function(a){var c=this;Wlib._bindScrollTobottom(function(){c.data.firstResult=c.data.firstResult+c.data.maxResults;var a={departmentId:c.data.departmentId||-1,locationId:c.data.locationId||-1,titleId:c.data.titleId||-1,firstResult:c.data.firstResult||0,maxResults:c.data.maxResults||5};Wlib.SendRequestNew("treatQuery","findDoctorAndClinics",a,function(a){var d={};d.docList=a.value||[];var e=juicer(b("#itemtpl").html(),d);b(".list-wrapper").append(e),Wlib._bindLazyLoad(),a.value.length==c.data.maxResults&&c.bindNext(!0),a.value&&0!=a.value.length||Wlib.tips("\u6ca1\u6709\u67e5\u8be2\u5230\u76f8\u5173\u8bb0\u5f55\u3002")})},a)},renderDepart:function(){for(var a=this,c="",d="",e=0;e<a.data.depList.length;e++)a.data.departmentId==a.data.depList[e].data.id&&(d=a.data.depList[e].data.name,-1==a.data.departmentId&&(d="\u79d1\u5ba4")),c+='<div data-id="'+a.data.depList[e].data.id+'" class="condit"><span class="ks_'+a.data.depList[e].data.id+'"></span>'+a.data.depList[e].data.name+"</div>";b("#desdep").html(c),b("#seldep").text(d?d:"\u79d1\u5ba4"),a.dom.desdep.find("div").on("click",function(){var c=b(this).attr("data-id");a.data.departmentId=c,window.location.replace("../../pages/doclist/index.html?"+a.makeURL())})},fetchDepartments:function(){var a=this;0==a.data.depList.length&&Wlib.SendRequestNew("commonQuery","findClinicDepts",{},function(b){0==b.errorcode&&b.value&&(a.data.depList=b.value,a.renderDepart())})},fetchDocList:function(){var a=this,b={departmentId:a.data.departmentId||-1,locationId:a.data.locationId||-1,titleId:a.data.titleId||-1,firstResult:a.data.firstResult||0,maxResults:a.data.maxResults||5};Wlib.SendRequestNew("treatQuery","findDoctorAndClinics",b,function(b){a.data.docList=b.value||[],a.renderUI(),b.value&&b.value.length==a.data.maxResults&&a.bindNext(!0),a.recacheDom(),a.bindEvent(),a.fetchDepartments(),a.dom.loading.hide(),b.value&&0!=b.value.length||Wlib.tips("\u6ca1\u6709\u67e5\u8be2\u5230\u76f8\u5173\u8bb0\u5f55\u3002")})}};new c}(window,$);