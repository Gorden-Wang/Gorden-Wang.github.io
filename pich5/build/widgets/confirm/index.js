/*! Generated by Clam: wechat 2016-05-09 16:25:30 */
!function(a,b){function c(a){this.opt=a||{},this.init()}c.prototype={init:function(){this.cacheData(),this.renderUI(),this.bindEvent()},cacheData:function(){this.tpl='<div class="J-Con-Wrap"><p class="J-con-title">${title}</p><p class="J-con-sub">${subtitle}</p><div class="J-con-btns">{@each btns as btn}<div class="J-con-btn" id="${btn.id}">${btn.title}</div>{@/each}</div></div>'},renderUI:function(){var a=juicer(this.tpl,this.opt);this.makeOverLay(),b("body").append(a)},makeOverLay:function(){b("body").append('<div class="J-overLay"></div>')},bindEvent:function(){b("#J-Con-Can").on("click",function(){a.history.back()}),b("#J-Con-Sale").on("click",function(){a.location.href="../../pages/post/index.html?tag=10"}),b("#J-Con-Auo").on("click",function(){a.location.href="../../pages/post/index.html?tag=11"})}},a.Confirm=c}(window,$);