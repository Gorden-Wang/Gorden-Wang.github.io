/*! Generated by Clam: wechat 2015-11-06 17:24:05 */
!function(a){function b(a){var b=document.location.hostname.indexOf("test")>0||document.location.hostname.indexOf("local")>0?"https://ssl-static-test.instarekber.com/upay":"https://ssl-static.instarekber.com/upay";this.opt={rate:a.rate&&String(a.rate)||"0.0",activeImg:a.activeImg||b+"/images/common/star.png",defaultImg:a.defaultImg||b+"/images/common/unstar.png",halfImg:a.halfImg||b+"/images/common/halfstar.png",wrapper:a.wrapper||"",starCount:a.statCount||5,isHalf:a.isHalf||!0,descObj:{lev5:a.descObj&&a.descObj.lev5||"\u975e\u5e38\u68d2",lev4:a.descObj&&a.descObj.lev4||"\u6ee1\u610f",lev3:a.descObj&&a.descObj.lev3||"\u4e00\u822c",lev2:a.descObj&&a.descObj.lev2||"\u4e0d\u6ee1\u610f",lev1:a.descObj&&a.descObj.lev1||"\u5f88\u5dee"},descWrapper:a.descWrapper||".rate-desc"},1==this.opt.rate.length&&(this.opt.rate=this.opt.rate+".0")}b.prototype={init:function(){var b=this;return b.opt.wrapper?void a(b.opt.wrapper).append(b._renderUI()):b._renderUI()},_getRate:function(){var a=this;return a.opt.isHalf?a.opt.rate:String(Math.round(a.opt.rate))},_getStar:function(){var a=this,b=a._getRate(),c=b.split(".");return{one:Number(c[0]),half:Math.round(parseInt(c[1].slice(0,1))/10)}},_renderUI:function(){var a=this,b=a._getStar();starDom="",sel=b.one+b.half;for(var c=0;c<b.one;c++)starDom+="<i><img src='"+a.opt.activeImg+"'></i>";!!b.half&&(starDom+='<i><img src="'+a.opt.halfImg+'"></i>');for(var c=sel;c<a.opt.starCount;c++)starDom+="<i><img src='"+a.opt.defaultImg+"'></i>";return"<span class='rate-eles'>"+starDom+"</span>"},lazyRender:function(a){var b=this;return b.opt.rate=a,b._renderUI()},makeRate:function(){},bindEvent:function(b){function c(b){for(var c=0,b=b;a(b).prev().length>0;)++c,b=a(b).prev();return e.rate=c+1,d(e.opt.descWrapper,c+1),parseInt(c+1)+".0"}function d(b,c){var d=e.opt.descObj["lev"+c];a(b).html(d)}var e=this,f=e.opt.wrapper||b||"body";a(f).find("i").each(function(d,g){a(this).on("click",function(){var d=e.lazyRender(c(this));a(f).empty(),a(f).append(d),e.bindEvent(b)})})}},window.Rate=b}($);