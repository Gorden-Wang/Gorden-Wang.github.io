/*! Generated by Clam: finace 2015-11-20 22:10:59 */
!function(a,b){var c=function(){this.init()};c.prototype={init:function(){var a=this;a.cacheData(),a.cacheDom(),a.addJuicerHandler(),a.renderUI(),a.recacheDom(),a.bindEvent()},cacheData:function(){var a=this;a.data={},a.data.param={id:Wlib.getRequestParam("productId"),img_w:b("body").width(),img_h:Math.floor(.609375*b("body").width()),user_headimg_w:100,user_headimg_h:100}},cacheDom:function(){var a=this;a.dom={wrapper:b("#page"),loading:b("#loading"),tpl:b("#tpl"),rWrapper:b("#right-wrapper"),rtpl:b("#r-tpl"),lWrapper:b("#left-wrapper"),ltpl:b("#l-tpl")}},renderUI:function(){var a=this;a.RSLIDE=new Wlib.Slider({wrapper:"#right-wrapper",sibling:"#page",scroll:"#scrollwrapper",dir:"1"}),a.LSLIDE=new Wlib.Slider({wrapper:"#left-wrapper",sibling:"#page",scroll:"",dir:"0"}),a.dom.wrapper.html(juicer(a.dom.tpl.html(),a.data)),a.dom.rWrapper.html(juicer(a.dom.rtpl.html(),{})),a.dom.lWrapper.html(juicer(a.dom.ltpl.html(),a.data)),a.RSLIDE.bindScroll(),a.LSLIDE.bindScroll(),a.dom.loading.hide()},recacheDom:function(){var a=this;a.dom.tabs=b(".tab-wrapper li"),a.dom.mybtn=b("#mybtn"),a.dom.searchbtn=b("#searchbtn"),a.dom.filterbtn=b("#filterbtn"),a.dom.lbbtn=b(".m-icon0"),a.dom.filterLis=b(".r-content li"),a.dom.resetbtn=b("#resetbtn"),a.dom.filterSearchbtn=b("#filterSearchbtn"),a.dom.addNoteBtn=b(".fixedbtn"),a.dom.inetestbtn=b("#inetestbtn"),a.dom.newsbtn=b("#newsbtn"),a.dom.setbtn=b("#setbtn"),a.dom.loginbtn=b(".top-wrapper")},bindEvent:function(){var c=this;FastClick.attach(document.body),c.dom.tabs.on("click",function(){var a=b(this).attr("data-target"),c=b(this).siblings().attr("data-target"),d=b(this).hasClass("selected");d||(b(c).hide(),b(a).show(),b(this).addClass("selected").siblings().removeClass("selected"))}),c.dom.filterbtn.on("click",function(){c.RSLIDE.slideIn()}),c.dom.mybtn.on("click",function(){c.LSLIDE.slideIn()}),c.dom.lbbtn.on("click",function(){c.LSLIDE.slideOut()}),c.dom.searchbtn.on("click",function(){a.location="../../pages/index/search.html"}),c.dom.filterLis.on("click",function(){b(this).hasClass("selected")||b(this).addClass("selected").siblings().removeClass("selected")}),c.dom.resetbtn.on("click",function(){c.dom.filterLis.not(".unreset").removeClass("selected")}),c.dom.filterSearchbtn.on("click",function(){c.dom.loading.show(),setTimeout(function(){c.RSLIDE.slideOut(),c.dom.resetbtn.trigger("click"),c.dom.loading.hide()},2e3)}),c.dom.addNoteBtn.on("click",function(){a.location="../../pages/addNote/index.html"}),c.dom.inetestbtn.on("click",function(){a.location="../../pages/interest/index.html"}),c.dom.newsbtn.on("click",function(){a.location="../../pages/news/index.html"}),c.dom.setbtn.on("click",function(){a.location="../../pages/setting/index.html"}),c.dom.loginbtn.on("click",function(){a.location="../../pages/login/index.html"})},addJuicerHandler:function(){juicer.register("makeRateImg",function(a){var b=(a+"").split("."),c=b[0],d=b[1]>0?".5":"";return c+d})},getItems:function(){function a(a){"1"==a.resultCode?(b.data.data=a.resultData,b.renderUI(),b.recacheDom(),b.bindEvent(),console.log(b.data.data)):Wlib.tips(a.message)}var b=this,c=function(a){var b="";for(var c in a)b+=c+"="+a[c]+"&";return b.slice(0,-1)}(b.data.param);Wlib.GetJsonData("app/product/detail/jsonp?"+c,a,a)}};new c}(window,$);