/*! Generated by Clam: wechat 2016-05-09 16:25:30 */
window.Wlib=function(){function a(a,b){this.evn=a,this.ver=b||"2014.8.8"}return a.prototype={config:function(){},getRequestParam:function(a,b){var c;return b=b||window.location.href,c=b.match(new RegExp("[?&]"+a+"=([^&#]*)([&#]?)","i")),c?decodeURIComponent(c[1]):c},tips:function(a,b,c){if(c)var d=$("<div class = 'fixed tipsfadeInNo tipsanimated'>"+a+"</div>");else var d=$("<div class = 'fixed tipsfadeIn tipsanimated'>"+a+"</div>");$("body").append(d),setTimeout(function(){c||($(d).remove(),b&&b())},3e3)},removeTips:function(a){var b=$(".tipsfadeIn");b.length>0?($(b).remove(),a()):a()},alert:function(a,b,c){var d="color: white;text-align: center;font-size: 15px;margin-top: 20px; width: 5em;height: 3em;",e=$("<div class = 'fixed fadeIn animated' style='z-index: 502'>"+a+"</div>");b&&e.append("<button style='"+d+"'>"+b+"</button>"),$("body").append("<div class='alert-bg'></div>"),$("body").append(e),$(e).find("button").on("click",function(){c?c():$(e).remove(),$(".alert-bg").remove()})},remove_alert:function(a){$("#_alert_bg").fadeOut(function(){$(this).remove(),a&&a()})},confirm:function(a,b,c,d,e){var f=document,g=f.createElement("div");g.setAttribute("id","_confirm_bg"),f.body.appendChild(g);var h=f.createElement("div");h.setAttribute("id","_confirm_content"),g.appendChild(h);var i=$("#_confirm_content"),j="";j=j+"<p>"+a+"</p>",j+="<em id='_confirm_shadowA'>&nbsp;</em>",j+="<em id='_confirm_shadowB'>&nbsp;</em>",j+="<div id='_confirm_btnW'>",c[0]?(j=j+"<div id='_confirm_btnA' class='"+b[1]+"'><span>"+b[0]+"</span></div>",j+="<em id='_confirm_shadowC'>&nbsp;</em>",j+="<em id='_confirm_shadowD'>&nbsp;</em>",j=j+"<div id='_confirm_btnB' class='"+c[1]+"'><span>"+c[0]+"</span></div>"):j=j+"<div id='_confirm_btnA' class='"+b[1]+"' style='width:100%'>"+b[0]+"</div>",j+="</div>",i.html(j).addClass("fixed fadeIn animated").show(),$("#_confirm_btnA").bind("click",function(){e&&e(),$("#_confirm_bg").remove()}),c[0]&&$("#_confirm_btnB").bind("click",function(){d(),$("#_confirm_bg").remove()})},_bindLazyLoad:function(){function a(){setTimeout(function(){c()},30)}function b(){window.removeEventListener("scroll",a,!1),window.removeEventListener("resize",a,!1)}function c(){for(var a,c,e,f=window.innerHeight,g=window.pageYOffset,h=0;h<d.length;)a=$(d[h]),e=a.offset(),g+f+20>=e.top&&(c=$(a),$(c[0]).attr("src",c.attr("lazy-image")),$(c[0]).removeClass("lazy-image"),[].splice.call(d,h,1),h--,d.length||b()),h++}var d=$(".lazy-image");window.addEventListener("scroll",a,!1),window.addEventListener("resize",a,!1),c()},_bindScrollTobottom:function(a,b){function c(){setTimeout(function(){e()},1)}function d(){window.removeEventListener("scroll",c,!1),window.removeEventListener("resize",c,!1)}function e(){var c,e=window.innerHeight,f=window.pageYOffset;c=$("body").height(),f+e+100>=c&&(d(),a&&b&&a())}window.addEventListener("scroll",c,!1),window.addEventListener("resize",c,!1),e()},_scrollHide:function(a,b){function c(){setTimeout(function(){d()},1)}function d(){var c=window.pageYOffset;c>=a?b.show():b.hide()}window.addEventListener("scroll",c,!1),window.addEventListener("resize",c,!1),d()},getUserId:function(){return Wlib.getRequestParam("userId")||localStorage.getItem("userId")||""},SendRequest:function(a,b,c,d,e){b=function(a,b){var c="";if("POST"==b)c=a;else for(var d in a)c+=d+"="+a[d]+"&";return c}(b,c);var f=function(){return"localhost"==document.domain?"http://115.159.100.197/index.php?r=":location.protocol+"//"+document.domain+"/index.php?r="}(),g={dataType:"JSONP",success:function(a){return 1==a.nodata?($("body").html(""),void Wlib.alert("\u5546\u54c1\u5df2\u4e0b\u67b6,\u8bf7\u6d4f\u89c8\u5176\u4ed6\u5546\u54c1")):void(d&&d(a))},error:function(a){e&&e(a)}};"POST"==c?(g.url=f+a,g.data=b,g.dataType="JSON",g.type="POST",console.log(b),b.toString().indexOf("FormData")>0&&(g.enctype="multipart/form-data",g.cache=!1,g.contentType=!1,g.processData=!1)):g.url=f+a+"&"+b+"callback=?",$.ajax(g)},GetJsonData:function(a,b,c){$.ajax({url:a,dataType:"JSON",success:function(a){b(a)},error:function(a){c&&c(a)}})},GetScript:function(a,b,c){$.ajax({url:a,dataType:"script",success:function(a){b(a)},error:function(a){c&&c(a)}})},forceLogin:function(a,b){var c="http://www.talkart.cc/index.php?r=wechat/wechat/pay";$.ajax({url:c+"?callback=?&re_url="+encodeURIComponent(a||location.href),dataType:"JSONP",success:function(a){alert(JSON.stringify(a))},error:function(a){alert("\u83b7\u53d6\u6388\u6743\u6570\u636e\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5")}})},getTimeZone:function(a){return a?a.replace("T"," "):""},wx:{isWeixin:function(){return!!(navigator.userAgent.toLowerCase().indexOf("micromessenger")>-1)},auth:function(a,b){var b=encodeURIComponent(b||location.href.split("#")[0]);Wlib.getRequestParam("uid")&&Wlib.getRequestParam("token")&&(localStorage.setItem("uid",Wlib.getRequestParam("uid")),localStorage.setItem("token",Wlib.getRequestParam("token")),Wlib.getRequestParam("avatar")&&localStorage.setItem("avatar",Wlib.getRequestParam("avatar")),localStorage.setItem("isbind",Wlib.getRequestParam("isbind")),localStorage.setItem("openid",Wlib.getRequestParam("open_id")),localStorage.setItem("imtoken",Wlib.getRequestParam("password"))),localStorage.getItem("uid")&&localStorage.getItem("token")?a&&a():$.ajax({url:"http://www.talkart.cc/index.php?r=wechat/wechat/authoriztion&url="+b,dataType:"JSONP",success:function(a){location.href=a.url},error:function(){alert("\u670d\u52a1\u5668\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002")}})},forceLogin:function(a,b){var b=encodeURIComponent(b||location.href.split("#")[0]);Wlib.getRequestParam("uid")&&Wlib.getRequestParam("token")?(localStorage.setItem("uid",Wlib.getRequestParam("uid")),localStorage.setItem("token",Wlib.getRequestParam("token")),Wlib.getRequestParam("avatar")&&localStorage.setItem("avatar",Wlib.getRequestParam("avatar")),localStorage.setItem("isbind",Wlib.getRequestParam("isbind")),localStorage.setItem("openid",Wlib.getRequestParam("open_id")),localStorage.setItem("imtoken",Wlib.getRequestParam("password")),a&&a()):$.ajax({url:"http://www.talkart.cc/index.php?r=wechat/wechat/authoriztion&url="+b,dataType:"JSONP",success:function(a){location.href=a.url},error:function(){alert("\u670d\u52a1\u5668\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002")}})},checkLogin:function(a,b){return localStorage.getItem("uid")&&localStorage.getItem("token")?void Wlib.SendRequest("wechat/wechat/myinfo",{openid:localStorage.getItem("openid")},"GET",function(b){1==b.state&&(localStorage.setItem("uid",b.uid),localStorage.setItem("token",b.token),b.avatar&&localStorage.setItem("avatar",b.avatar),localStorage.setItem("isbind",b.isbind),localStorage.setItem("openid",b.openid),localStorage.setItem("imtoken",b.imtoken),a&&a())}):void Wlib.wx.forceLogin(a,b)},getJSSign:function(a,b){var c=a||location.href.split("#")[0];$.ajax({url:"http://www.talkart.cc/index.php?r=wechat/wechat/jsapiSign&url="+c+"&callback=?",dataType:"JSONP",success:function(a){b&&b(a)},error:function(){alert("\u670d\u52a1\u5668\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002")}})},jsConfig:function(a,b){wx.config({debug:!1,appId:a.appId,timestamp:a.timestamp,nonceStr:a.nonceStr,signature:a.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone","hideMenuItems","showMenuItems","chooseImage","uploadImage","previewImage"]}),b&&b()},hideMenu:function(){wx.ready(function(){wx.hideMenuItems({menuList:["menuItem:share:qq","menuItem:share:weiboApp","menuItem:share:QZone","menuItem:share:appMessage","menuItem:share:timeline","menuItem:copyUrl","menuItem:openWithQQBrowser","menuItem:openWithSafari","menuItem:share:email","menuItem:favorite"],success:function(){}})})},shareTo:function(a,b,c,d,e,f){wx.ready(function(){wx.showMenuItems({menuList:["menuItem:share:appMessage","menuItem:share:timeline"],success:function(){}});var g=("www.hmsgtech.com"!=document.domain?"http://test.hmsgtech.com/wechat":"http://www.hmsgtech.com/wechat",a||"\u8bf4\u753b");wx.onMenuShareTimeline({title:g,desc:b,link:c,imgUrl:d,success:function(){e&&e()},cancel:function(){f&&f()}}),wx.onMenuShareAppMessage({title:g,link:c,desc:b,imgUrl:d,success:function(){e&&e()},cancel:function(){f&&f()}})})},pay:function(a){var b="http://www.talkart.cc/index.php?r=wechat/wechat/pay";$.ajax({url:b+"&callback=?",dataType:"JSONP",success:function(a){alert(JSON.stringify(a))},error:function(a){alert("\u83b7\u53d6\u6388\u6743\u6570\u636e\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5")}})},previewImgs:function(a,b){wx.previewImage({current:a,urls:b||[a]})},chooseImgs:function(a){wx.chooseImage({count:9,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(b){a&&a(b.localIds)}})},upLoadImgs:function(a,b){alert(a),wx.uploadImage({localId:a,isShowProgressTips:1,success:function(a){alert(a),b&&b(a.serverId)}})},getLocation:function(){wx.getLocation({type:"wgs84",success:function(a){a.latitude,a.longitude,a.speed,a.accuracy;alert(JSON.stringify(a))}})}}},new a("publish","")}($);