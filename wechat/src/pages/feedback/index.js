/**
 * Created by gorden on 15/7/31.
 */
(function (win, $) {
    var Person = function () {
        this.init();
    }

    Person.prototype = {
        init: function () {
            var that = this;
            that.cacheDom();
            that.renderUI();
            that.recacheDom();
            that.renderRate();
            that.bindEvent();
        },
        cacheDom: function () {
            var that = this;
            that.dom = {
                wrapper: $("#page"),
                loading: $("#loading"),
                tpl: $("#tpl")
            }
        },
        renderRate: function () {
            var that = this;

            var rate = new Rate({
                rate: 5.0,
                wrapper: '#docrate',
                activeImg: '../../images/redstar.png',
                defaultImg: '../../images/graystar.png',
                halfImg: '../../images/halfstar.png'
            });
            rate.init();
            rate.bindEvent("#docrate");


            var rate1 = new Rate({
                rate: 5.0,
                wrapper: '#hosrate',
                activeImg: '../../images/redstar.png',
                defaultImg: '../../images/graystar.png'
            });
            rate1.init();
            rate1.bindEvent("#hosrate");
        },
        renderUI: function () {
            var that = this;
            that.dom.wrapper.html(juicer(that.dom.tpl.html(), {}));
            that.dom.loading.hide();
        },
        recacheDom: function () {
            var that = this;
            that.dom.banner = $(".banner");
        },
        bindEvent: function () {
            var that = this;
            $("#addCom").on("click", function () {
                that.fetchData();
            });
        },
        fetchData: function () {
            var that = this;
            var param = {
                "userId":  localStorage.getItem("userId"),
                "doctorId": "11",
                "doctorContent": $("#doccontent").val(),
                "doctorScore": 5,
                "clinicId": 8,
                "clinicContent": $("#hoscontent").val(),
                "clinicScore": 5

            }

            Wlib.SendRequest("2036", param, function (res) {


            });

        },
    }

    var person = new Person();


})(window, $);