/*! Generated by Clam: finace 2015-11-22 15:46:26 */
window.Wlib=function(){function a(a,b){this.evn=a,this.ver=b||"2014.8.8"}return a.prototype={config:function(){var a={};switch(this.evn){case"publish":a.port="https://ssl.instarekber.com/vshop/1/H5/",a.portNew="https://ssl.instarekber.com/ushop/h5/",a.port2="https://ssl.instarekber.com/ushop",a.apiPort="http://api.instarekber.com",a.loginPort="https://login.instarekber.com/ushop",a.instaUrl="http://www.instarekber.com/eula.html";break;case"daily":a.port="https://ssl-test.instarekber.com/vshop/1/H5/",a.portNew="https://ssl-test.instarekber.com/ushop/h5/",a.port2="https://ssl-test.instarekber.com/ushop",a.apiPort="http://api.test.instarekber.com",a.loginPort="https://ssl-test.instarekber.com/ushop",a.imUrlPort="./chat/",a.instaUrl="http://www-test.instarekber.com/eula.html";break;case"local":a.port="https://ssl-test.instarekber.com/vshop/1/H5/",a.portNew="https://ssl-test.instarekber.com/ushop/h5/",a.port2="https://ssl-test.instarekber.com/ushop",a.apiPort="http://api.test.instarekber.com",a.loginPort="https://ssl-test.instarekber.com/ushop",a.imUrlPort="./chat/",a.instaUrl="http://www-test.instarekber.com/eula.html"}return a},getRequestParam:function(a,b){var c;return b=b||window.location.href,c=b.match(new RegExp("[?&]"+a+"=([^&#]*)([&#]?)","i")),c?decodeURIComponent(c[1]):c},tips:function(a,b,c){var d=$("<div class = 'fixed tipsfadeIn tipsanimated'>"+a+"</div>");$("body").append(d),setTimeout(function(){$(d).remove(),b&&b()},3e3)},removeTips:function(a){var b=$(".tipsfadeIn");b.length>0?($(b).remove(),a()):a()},alert:function(a,b,c){var d=$("<div class = 'fixed fadeIn animated'>"+a+"</div>");d.append(b),$("body").append(d),$("body").find(".btn").on("click",function(){c?c():$(d).remove()})},remove_alert:function(a){$("#_alert_bg").fadeOut(function(){$(this).remove(),a&&a()})},confirm:function(a,b,c,d,e){var f=document,g=f.createElement("div");g.setAttribute("id","_confirm_bg"),f.body.appendChild(g);var h=f.createElement("div");h.setAttribute("id","_confirm_content"),g.appendChild(h);var i=$("#_confirm_content"),j="";j=j+"<p>"+a+"</p>",j+="<em id='_confirm_shadowA'>&nbsp;</em>",j+="<em id='_confirm_shadowB'>&nbsp;</em>",j+="<div id='_confirm_btnW'>",c[0]?(j=j+"<div id='_confirm_btnA' class='"+b[1]+"'><span>"+b[0]+"</span></div>",j+="<em id='_confirm_shadowC'>&nbsp;</em>",j+="<em id='_confirm_shadowD'>&nbsp;</em>",j=j+"<div id='_confirm_btnB' class='"+c[1]+"'><span>"+c[0]+"</span></div>"):j=j+"<div id='_confirm_btnA' class='"+b[1]+"' style='width:100%'>"+b[0]+"</div>",j+="</div>",i.html(j).addClass("fixed fadeIn animated").show(),$("#_confirm_btnA").bind("click",function(){e&&e(),$("#_confirm_bg").remove()}),c[0]&&$("#_confirm_btnB").bind("click",function(){d(),$("#_confirm_bg").remove()})},_bindLazyLoad:function(){function a(){setTimeout(function(){c()},30)}function b(){window.removeEventListener("scroll",a,!1),window.removeEventListener("resize",a,!1)}function c(){for(var a,c,e,f=window.innerHeight,g=window.pageYOffset,h=0;h<d.length;)a=$(d[h]),e=a.offset(),g+f+20>=e.top&&(c=$(a),$(c[0]).attr("src",c.attr("lazy-image")),$(c[0]).removeClass("lazy-image"),[].splice.call(d,h,1),h--,d.length||b()),h++}var d=$(".lazy-image");window.addEventListener("scroll",a,!1),window.addEventListener("resize",a,!1),c()},_bindScrollTobottom:function(a,b){function c(){setTimeout(function(){e()},1)}function d(){window.removeEventListener("scroll",c,!1),window.removeEventListener("resize",c,!1)}function e(){var c,e=window.innerHeight,f=window.pageYOffset;c=$("body").height(),f+e+50>=c&&(d(),a&&b&&a())}window.addEventListener("scroll",c,!1),window.addEventListener("resize",c,!1),e()},GetJsonData:function(a,b,c){$.ajax({url:"http://icefox-cool.xicp.net/master/"+a,dataType:"jsonp",method:"GET",success:function(a){b(a)},error:function(a){c&&c(DATA)}})},GetScript:function(a,b,c){$.ajax({url:a,dataType:"script",success:function(a){b(a)},error:function(a){c&&c(a)}})}},new a("publish","")}($);