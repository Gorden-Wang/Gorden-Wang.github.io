/*! Generated by Clam: wechat 2016-05-09 16:25:30 */
!function(a,b){function c(){}c.prototype={init:function(){var a=this;a.addJuicerHandler(),a.cacheData(),a.cacheDom(),a.renderUI(),a.recacheDom(),a.bindEvent()},cacheData:function(){var a=this;a.data={},a.data.newArr=[],a.data.picData=[],a.data.type=Wlib.getRequestParam("tag"),a.data.picType=function(a){var b=5;switch(a){case 1:b=3;break;case 2:b=2}return b}(a.data.type)},cacheDom:function(){var a=this;a.dom={wrapper:b("#page"),loading:b("#loading"),tpl:b("#tpl"),tagtpl:b("#tagtpl")}},renderUI:function(){var a=this;a.dom.wrapper.html(juicer(a.dom.tpl.html(),a.data)),a._makeFooter(),a.dom.loading.hide()},recacheDom:function(){var a=this;a.dom.topLi=b(".lv1-wrapper li"),a.dom.staLi=b(".lv2-wrapper li"),a.dom.nextBtn=b(".tips-btn"),a.dom.imgs=b("#imgs")},_makeFooter:function(){{var a={classname:"f-3",selected:!0,url:"",id:""};new Wlib.Footer(b("#footer"),a,2)}},getTags:function(){var a=this,b={};Wlib.SendRequest("default/info/taglist",b,"GET",function(b){console.log(b),a.data.data=b,a.renderUI(),a.makeSubTag(a.data.newArr[0]),a.recacheDom(),a.bindEvent(),a.data.category=a.data.newArr[0].type,a.data.sort=a.data.newArr[0].next.sort[0],a.data.times=a.data.newArr[0].next.times[0]})},addJuicerHandler:function(){var a=this;juicer.register("getId",function(a){return Wlib.getRequestParam("id",a)}),juicer.register("getType",function(a){var b="";switch(a){case"\u51fa\u552e":b="../../pages/sale/index.html";break;case"\u62cd\u5356":b="../../pages/auction/index.html"}return b}),juicer.register("getArray",function(b){if(!b)return[];if(a.data.newArr.length>0)return a.data.newArr;var c=[];for(var d in b){var e={};e.type=d,e.next=b[d],c.push(e)}return console.log(c),a.data.newArr=c,a.data.newArr}),juicer.register("makeClass",function(a){return a.length>=4?"flex2":""}),juicer.register("makeCode",function(a){return location.protocol+"//"+document.domain+"/index.php?r=default/index/verify"})},bindEvent:function(){var a=this;FastClick.attach(document.body),Wlib._bindLazyLoad(),a.dom.topLi.on("click",function(){var c=b(this).hasClass("selected");c||(b(this).addClass("selected").siblings().removeClass("selected"),a.makeSubTag(a.data.newArr[parseInt(b(this).attr("data-index"))]),a.data.category=b(this).text())}),a.dom.nextBtn.on("click",function(){b(".tips-wrapper").hide()}),b("#fileInput").on("change",function(){if(b(this)[0].files.length>9)return void Wlib.tips("\u6700\u591a\u53ea\u80fd\u9009\u62e99\u5f20\u56fe\u7247");if(b(".img-tag").length+b(this)[0].files.length>9)return void Wlib.tips("\u60a8\u8fd8\u80fd\u9009\u62e9"+(9-b(".img-tag").length)+"\u5f20\u56fe\u7247");for(var c=0;c<b(this)[0].files.length;c++){var d=new FormData;d.append("pic",b(this)[0].files[c]),d.append("type",a.data.picType),Wlib.SendRequest("default/person/uploadPic",d,"POST",function(c){b("#imgs").prepend("<li class='img-tag'><div><img src='"+c.url+"'></div></li>"),a.data.picData.push(c.path),9==b(".img-tag").length&&b("#addPic").hide()})}}),b("#sendBtn").on("click",function(){var c={uid:localStorage.getItem("uid"),token:localStorage.getItem("token"),checkcode:b("#code").val()||"",content:b("#content").val(),type:3,author:b("#author").val(),title:b("#author").val()||"",size1:b("#size1").val()||"",size2:b("#size2").val()||"",range:b("#range").val()||"",starting_price:b("#starting_price").val()||"",fidelity:b(".baozhen").val(),end_time:b("#end_time").val()||"",address:b("#address").text().trim()||"\u897f\u5b89",compile:"",category:a.data.category,sort:a.data.sort,times:a.data.times,ban_look:"",pictures:a.data.picData.join(",")};console.log(c),Wlib.SendRequest("default/publish/postInfo",c,"POST",function(a){1==a.state&&(window.location.href="../../pages/pics/index.html")})}),b("#verycode").on("click",function(){b(this).attr("src",location.protocol+"//"+document.domain+"/index.php?r=default/index/verify")})},makeSubTag:function(a){var c=this;b(".tip-tab-wrap").html(juicer(c.dom.tagtpl.html(),a.next)),c.dom.staLi=b(".lv2-wrapper li"),a.next.times||(c.data.times=""),c.dom.staLi.on("click",function(){var a=b(this).hasClass("selected");a||(b(this).addClass("selected").siblings().removeClass("selected"),b(this).hasClass("times-tag")?c.data.times=b(this).text():c.data.sort=b(this).text())})},getData:function(){var a=this;Wlib.SendRequest("default/api/square",{},"GET",function(b){a.data.data=b,a.renderUI(),a.recacheDom(),a.bindEvent()})},getPicVericode:function(){Wlib.SendRequest("default/index/verify",{},"GET",function(a){console.log(a)})}};var d=new c;d.init()}(window,$);