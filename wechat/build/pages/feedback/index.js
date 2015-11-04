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

            var rate = that.RATE = new Rate({
                rate: 5.0,
                wrapper: '#docrate',
                activeImg: '../../images/redstar.png',
                defaultImg: '../../images/graystar.png',
                halfImg: '../../images/halfstar.png'
            });
            rate.init();
            rate.bindEvent("#docrate");


            var rate1 = that.RATE1 = new Rate({
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
                "userid":  Wlib.getRequestParam("userId"),
                "doctorId": Wlib.getRequestParam("doctorId"),
                "doctorContent": $("#doccontent").val(),
                "doctorScore": that.RATE.rate || 5,
                "clinicId": Wlib.getRequestParam("clinicId"),
                "clinicContent": $("#hoscontent").val(),
                "clinicScore": that.RATE1.rate || 5,
                "treatmentPlanRecordId" : Wlib.getRequestParam("id")

            }

            if($.trim($("#doccontent").val()) == ""){
                Wlib.tips("请为医生填写评价");
                return;
            }
            if($.trim($("#hoscontent").val()) == ""){
                Wlib.tips("请为诊所填写评价");
                return;
            }
            Wlib.SendRequestNew("treatOperate","addDoctorAndClinicComment", param, function (res) {

                if(res.errorCode == 0){
                    Wlib.tips("感谢您的反馈");
                    setTimeout(function(){
                        window.history.back();
                    },4000);
                }

            });

        },
    }

    var person = new Person();


})(window, $);