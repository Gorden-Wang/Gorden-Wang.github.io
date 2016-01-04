/**
 * Created by gorden on 15/7/31.
 */
(function (win, $) {
    var DocList = function () {
        this.init();
    }
    var URL = location.href.split("#")[0];
    DocList.prototype = {
        init : function(){
            var that = this;
            Wlib.wx.getJS(URL,function(){
                that.addJuicerHandler();
                that.cacheDom();
                that.cacheData();
                that.fetchData();
            });

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
            that.data.clinicId = Wlib.getRequestParam("clinicId");
        },
        renderUI : function(){
            var that = this;
            that.dom.wrapper.html(juicer(that.dom.tpl.html(),that.data));
            that.dom.loading.hide();
        },
        recacheDom : function(){
          var that = this;

            that.dom.hosdes = $("#hosdes");
            that.dom.hostip = $("#hostip");
            that.dom.deswrapper = $("#deswrapper");
            that.dom.tipwrapper = $("#tipwrapper");

        },
        fetchData :function(){
            var that = this;
            var param = {
                "clinicId": that.data.clinicId
            }

            Wlib.SendRequestNew("treatQuery","clinicInfo", param, function (res) {
                that.data.hos = res.value;
                //that.fetcPingjia(function(){
                //    that.renderUI();
                //    that.recacheDom();
                //    that.bindEvent();
                //    //return;
                //    //}
                //    that.dom.loading.hide();
                //});

                    that.renderUI();
                    that.recacheDom();
                    that.bindEvent();
                console.log(res)



            });
        },
        addJuicerHandler: function () {
            var that = this;

            juicer.register("makeRate", function (v) {
                var rate = new Rate({
                    rate: parseFloat(v),
                    activeImg: '../../images/redstar.png',
                    defaultImg: '../../images/graystar.png',
                    halfImg : '../../images/halfstar.png'
                });
                return rate.init()
            });


        },
        bindEvent : function(){
            var that = this;

            that.dom.hosdes.on("click",function(){
                if($(this).hasClass("tab_selected")){
                    return;
                }
                $(this).addClass("tab_selected").siblings().removeClass("tab_selected");
                that.dom.deswrapper.show();
                that.dom.tipwrapper.hide();

            });
            that.dom.hostip.on("click",function(){
               location.href = "../../pages/feedback/hosFeedList.html?clinicId="+that.data.clinicId;

            })

            $(".list_mz").on("click",function(event){
                if($(event.target).hasClass("tel")){
                    var num = $(event.target).text();
                    $("body").append("<iframe src='tel:"+num+"'></iframe>")
                }else{
                    window.location = $(this).attr("data-href");
                }
            })
        }
    }

    var docs = new DocList();


})(window, $);