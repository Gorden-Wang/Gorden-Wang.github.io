/**
 * Created by gorden on 15/7/31.
 */
(function (win, $) {
    var DocList = function () {
        this.init();
    }

    DocList.prototype = {
        init : function(){
            var that = this;
            that.addJuicerHandler();
            that.cacheDom();
            that.cacheData();

            that.fetchData();
        },
        cacheDom : function(){
            var that = this;
            that.dom = {
                wrapper : $("#page"),
                loading : $("#loading"),
                tpl : $("#tpl")
            }

        },
        cacheData : function(){
            var that = this;
            that.data = {};
            that.data.doctorId = Wlib.getRequestParam("doctorId");
        },
        renderUI : function(){
            var that = this;
            that.dom.wrapper.html(juicer(that.dom.tpl.html(),that.data));
            that.dom.loading.hide();
        },
        recacheDom : function(){
          var that = this;
            that.dom.docdes = $("#docdes");
            that.dom.feedback = $("#feedback");
            that.dom.docwrapper = $("#deswrapper");
            that.dom.fbwrapper = $("#fbwrapper");
        },
        addJuicerHandler : function(){
            var that = this;
            juicer.register("makeTitle", function (str) {
                var res = "";
                switch (str) {
                    case 1 :
                        res = '主任医师';
                        break;
                    case 2 :
                        res = '副主任医师';
                        break;
                    case 3:
                        res = '主治医师';
                        break;
                    case 4 :
                        res = '住院医师';
                        break;
                }
                return res;
            });
            //juicer.register("makeCityName",function(str){
            //    for(var i=0;i<CITYLIST.length;i++){
            //        if(str == CITYLIST[i].id){
            //            return CITYLIST[i].name;
            //        }
            //    }
            //});
            juicer.register("makeDes",function(obj){
                var res="";
                for(var i=0;i<obj.length;i++){
                   res = res+obj[i].name;
                    if(i<obj.lenght){
                        res+=",";
                    }
                }
                return res;
            });




        },
        fetchData :function(){
          var that = this;
            var param = {
                "doctorId": that.data.doctorId,
                "userid" : Wlib.getUserId()
            }

            Wlib.SendRequestNew("treatQuery","doctorInfo", param, function (res) {
                that.data.doc = res.value;

                that.renderUI();
                that.recacheDom();
                that.bindEvent();
                //return;
                //}
                that.dom.loading.hide();


                //that.fetcPingjia(function(){
                //
                //});



            });
        },
        fetcPingjia :function(callback){
            var that = this;
            var param = {
                "doctorId": that.data.doctorId
            }

            Wlib.SendRequestNew("treatQuery","findDoctorComment", param, function (res) {
                that.data.pingjia = res.value;
                callback && callback();
                //that.dom.loading.hide();


            });
        },
        bindEvent : function(){
            var that = this;

            that.dom.docdes.on("click",function(){
                if($(this).hasClass("tab_selected")){
                    return
                }
                $(this).addClass("tab_selected").siblings().removeClass("tab_selected");
                that.dom.docwrapper.show();
                that.dom.fbwrapper.hide()
            });

            that.dom.feedback.on("click",function(){
                //if($(this).hasClass("tab_selected")){
                //    return
                //}
                //$(this).addClass("tab_selected").siblings().removeClass("tab_selected");
                //that.dom.fbwrapper.show();
                //that.dom.docwrapper.hide();

                window.location.href = '../../pages/feedback/list.html?doctorId='+that.data.doctorId
            });
        }
    }

    var docs = new DocList();


})(window, $);