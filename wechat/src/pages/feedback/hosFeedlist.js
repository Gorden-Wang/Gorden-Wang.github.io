/**
 * Created by gorden on 15/7/31.
 */
(function (win, $, Rate) {
    var Person = function () {
        this.init();
    }

    Person.prototype = {
        init: function () {
            var that = this;
            that.addJuicerHandler();
            that.cacheData();
            that.cacheDom();
            that.fetchData();

        },
        cacheDom: function () {
            var that = this;
            that.dom = {
                wrapper: $("#page"),
                loading: $("#loading"),
                tpl: $("#tpl")
            }
        },
        cacheData : function(){
            var that = this;
            that.data = {};
            that.data.clinicId = Wlib.getRequestParam("clinicId");
            that.data.firstResult = 0;
            that.data.maxResults = 15;
        },
        renderUI: function () {
            var that = this;
            that.dom.wrapper.html(juicer(that.dom.tpl.html(), that.data));
            that.dom.loading.hide();

        },
        renderRate: function () {
            var that = this;

            var rate = new Rate({
                rate: 3.0,
                wrapper: '.rate-wrapper',
                activeImg : '../../images/redstar.png',
                defaultImg : '../../images/graystar.png',
                halfImg : '../../images/halfstar.png'});
            rate.init()


            var rate1 = new Rate({
                rate: 3.0,
                wrapper: '.top-li div',
                activeImg : '../../images/redstar.png',
                defaultImg : '../../images/graystar.png'});
            rate1.init()
        },

        fetchData : function(){
          var that = this;
            var param = {
                "clinicId": that.data.clinicId,
                "firstResult" : that.data.firstResult,
                "maxResults" :  that.data.maxResults
            }

            Wlib.SendRequestNew("treatQuery","findClinicComment", param, function (res) {
                if(res.value && res.value.length >0){
                    that.data.list = res.value;
                    that.data.COUNT = res.value.comments ? res.value.comments.length : res.value.length
                    console.log(that.data)
                    //that.dom.loading.hide();
                    that.renderUI();
                    that.recacheDom();
                    //that.renderRate();

                    if (res.value.comments && (res.value.comments.length == that.data.maxResults)) {
                        that.bindNext(true);
                    }
                }else{
                    that.dom.loading.hide();
                    Wlib.tips("没有用户评价");
                    setTimeout(function(){
                        window.history.back();
                    },3000);
                }



            });

        },
        bindNext :function(tag){
            var that = this;

            Wlib._bindScrollTobottom(function () {
                that.data.firstResult = that.data.firstResult + that.data.maxResults;
                var param = {
                    "doctorId": that.data.doctorId,
                    "firstResult" : that.data.firstResult,
                    "maxResults" :  that.data.maxResults
                }

                Wlib.SendRequestNew("treatQuery","findClinicComment", param, function (res) {
                    //if (res.entity && res.entity.length > 0) {

                    var data = {};
                    data.res = res.value || [];
                    var reshtml = juicer($("#tplItem").html(), data);
                    $("ul").append(reshtml);
                    if (res.value.comments && (res.value.comments.length == that.data.maxResults)) {
                        that.bindNext(true);
                    }
                    if (!res.entity || res.entity.length == 0) {
                        Wlib.tips("没有查询到相关记录。")
                    }

                });
            }, tag)
        },
        addJuicerHandler: function () {
            var that = this;

            juicer.register("makeRate", function (v) {
                v = v || 3.4;
                var rate = new Rate({
                    rate: parseFloat(v),
                    activeImg: '../../images/redstar.png',
                    defaultImg: '../../images/graystar.png',
                    halfImg : '../../images/halfstar.png'
                });
                return rate.init()
            });

            juicer.register("makeTime", function (v) {
                //2015/08/01
                var time = new Date(v);
                var obj = {
                    y : time.getFullYear(),
                    m : (time.getMonth()+1) <10 ? "0"+(time.getMonth()+1) : (time.getMonth()+1),
                    d : time.getDate()
                }

                return obj.y+"/"+obj.m+"/"+obj.d;
            });

            juicer.register("makePercen", function (v) {
                return v*100;
            });





        },
        recacheDom: function () {
            var that = this;
            that.dom.banner = $(".banner");
        },
        bindEvent: function () {
            var that = this;
            that.dom.banner.on("click", function () {
                var url = $(this).attr("data-href");
                url && (window.location = url);
            });
        }
    }

    var person = new Person();


})(window, $, Rate);