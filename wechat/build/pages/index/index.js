/*! Generated by Clam: wechat 2015-11-23 17:30:59 */
!function(a,b){var c=function(){this.init()};c.prototype={init:function(){var a=this;a.cacheData(),a.cacheDom(),a.renderUI(),a.recacheDom(),a.bindEvent(),a.getPosition()},cacheData:function(){var b=this;b.data={locationId:"1"},b.data.cityList=a.CITYLIST,localStorage.setItem("userId",Wlib.getRequestParam("userId")||"")},cacheDom:function(){var a=this;a.dom={wrapper:b("#page"),loading:b("#loading"),tpl:b("#tpl")}},renderUI:function(){var a=this;a.dom.wrapper.html(juicer(a.dom.tpl.html(),a.data)),a.dom.loading.hide()},recacheDom:function(){var a=this;a.dom.banner=b(".banner"),a.dom.doc=b("#docItme"),a.dom.hos=b("#hosItme"),a.dom.person=b(".personal"),a.dom.citySelect=b("select")},bindEvent:function(){var a=this;a.dom.banner.on("click",function(){var a=b(this).attr("data-href");a&&(window.location=a)}),a.dom.doc.on("click",function(){window.location="../../pages/doclist/index.html?locationId="+a.data.locationId}),a.dom.hos.on("click",function(){window.location="../../pages/hoslist/index.html?locationId="+a.data.locationId+"&latitude="+a.data.latitude+"&longitude="+a.data.longitude}),a.dom.person.on("click",function(){window.location="../../pages/person/index.html?locationId="+a.data.locationId+"&userId="+Wlib.getUserId()}),a.dom.citySelect.on("change",function(){a.data.locationId=b(this).val()})},getPosition:function(){function a(){navigator.geolocation?navigator.geolocation.getCurrentPosition(b):Wlib.tips("\u6ca1\u6709\u5b9a\u4f4d\u5230\u60a8\u7684\u57ce\u5e02\uff0c\u8bf7\u7a0d\u5019\u518d\u8bd5")}function b(a){c.data.latitude=a.coords.latitude,c.data.longitude=a.coords.longitude,Wlib.SendRequestNew("commonQuery","locate",{latitude:a.coords.latitude,longitude:a.coords.longitude},function(a){if(a.value){var b={1:"",2:"",3:"",187:""};a.value.id in b&&c.dom.citySelect.val(a.value.id)}})}var c=this;a()}};new c}(window,$);