/*! Generated by Clam: act01 2016-05-11 16:41:15 */
!function(a,b){var c=function(){this.init()};c.prototype={init:function(){var a=this;a.cacheData(),a.cacheDom(),a.addJuicerHandler(),a.getItems()},cacheData:function(){var a=this;a.data={},a.data.param={userId:Wlib.getRequestParam("userId")||203,token:Wlib.getRequestParam("token")||"e2c0be24560d78c5e599c2a9c9d0bbd2",gameId:Wlib.getRequestParam("gameId")||1}},cacheDom:function(){var a=this;a.dom={wrapper:b("#page"),loading:b("#loading"),tpl:b("#tpl")}},renderUI:function(){var a=this;a.dom.wrapper.prepend(juicer(a.dom.tpl.html(),a.data)),a.dom.loading.hide()},recacheDom:function(){var a=this;a.dom.full=b(".full-img")},bindEvent:function(){var a=this;b(".button,.t-w.flex").on("click",function(){var b=a.data.data.enableDownload;Wlib.downLite(b)})},addJuicerHandler:function(){function a(a){var b=new Date(a),c={y:b.getFullYear(),m:b.getMonth()+1,d:b.getDate(),h:b.getHours(),mm:b.getMinutes()+1,day:b.getDay()};return c}function b(a){var b="";switch(a){case 0:b="\u661f\u671f\u65e5";break;case 1:b="\u661f\u671f\u4e00";break;case 2:b="\u661f\u671f\u4e8c";break;case 3:b="\u661f\u671f\u4e09";break;case 4:b="\u661f\u671f\u56db";break;case 5:b="\u661f\u671f\u4e94";break;case 6:b="\u661f\u671f\u516d"}return b}juicer.register("makeDay",function(c){var d=a(c);return b(d.day)}),juicer.register("makeMD",function(b){var c=a(b);return c.m+"-"+c.d}),juicer.register("makeHMS",function(a){return a.split(" ")[1]}),juicer.register("makeGameName",function(a,b){return b||(b=0),a.split(" ")[b]})},getItems:function(){function a(a){1===a.code&&1==a.success?(c.data.data=a.data,c.renderUI(),c.recacheDom(),c.bindEvent(),console.log(c.data.data)):Wlib.tips(a.message)}var c=this;b.ajax({url:"http://121.199.57.142:8081/lifefinancial/api/game/proceedGameDetail.json?userId="+c.data.param.userId+"&token="+c.data.param.token+"&gameId="+c.data.param.gameId,dataType:"json",method:"GET",success:function(b){a(b)},error:function(a){error&&error(DATA)}})}};new c}(window,$);