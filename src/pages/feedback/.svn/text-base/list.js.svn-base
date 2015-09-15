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
            that.data.doctorId = Wlib.getRequestParam("doctorId");
            that.data.firstResult = 0;
            that.data.maxResults = 10;
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
                "doctorId": that.data.doctorId,
                "firstResult" : that.data.firstResult,
                "maxResults" :  that.data.maxResults
            }

            Wlib.SendRequest("2032", param, function (res) {
                that.data.list = res.entity;
                that.data.COUNT = res.entity.list ? res.entity.list.length : res.entity.length
                console.log(that.data)
                //that.dom.loading.hide();
                that.renderUI();
                that.recacheDom();
                //that.renderRate();
                that.bindEvent();

            });

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