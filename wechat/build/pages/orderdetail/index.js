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

            that.data= {
                orderId : Wlib.getRequestParam("orderId")
            }
        },
        renderUI : function(){
            var that = this;
            that.dom.wrapper.html(juicer(that.dom.tpl.html(),that.data));
            that.dom.loading.hide();
        },
        fetchData : function(){
          var that = this;

            var param = {
                "orderId": that.data.orderId
            }

            Wlib.SendRequest("2037", param, function (res) {

                //@TODO 获取支付方式，去支付
                if(res.errorcode == 0){
                    that.data.de = res.entity;

                    that.fetchDepartments(function(){
                        that.renderUI();
                        that.recacheDom();
                        that.bindEvent();
                    });
                }



            });
        },


        fetchDepartments: function (callback) {
            var that = this;
                Wlib.SendRequest("253", {}, function (res) {
                    if (res.errorcode == 0 && res.entity) {
                        that.data.depList = res.entity;
                        callback && callback();
                    }
                });
        },

        addJuicerHandler: function () {
            var that = this;

            juicer.register("makeStatus", function (v) {
                var res = '未付款';
                switch (v){
                    case 1 :
                        res = '未付款';
                        break;
                    case 2 :
                        res = '已付款';
                        break;
                    case 3 :
                        res = '已完成';
                        break;
                    case 4 :
                        res = '已退款';
                        break;
                }
                return res;
            });

            juicer.register("makeType", function (v) {
                var res = '线下门诊';

                switch (v){
                    case 1 :
                        res = '线下门诊';
                        break;
                    case 2 :
                        res = '线上问诊';
                        break;
                    case 3 :
                        res = '预约体检';
                        break;
                }
                return res;
            });

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

            juicer.register("makeFuckTime", function (time) {

                var time = new Date(time), w;
                switch (time.getDay()) {
                    case 0 :
                        w = "周日";
                        break;
                    case 1 :
                        w = "周一";
                        break;
                    case 2 :
                        w = "周二";
                        break;
                    case 3 :
                        w = "周三";
                        break;
                    case 4 :
                        w = "周四";
                        break;
                    case 5 :
                        w = "周五";
                        break;
                    case 6 :
                        w = "周六";
                        break;
                }
                var obj = {
                    y: time.getFullYear(),
                    m: (time.getMonth() + 1) < 10 ? "0" + (time.getMonth() + 1) : (time.getMonth() + 1),
                    d: time.getDate(),
                    w: w
                }
                var resTime = obj.y + "/" + obj.m + '/' + obj.d;


                return resTime

            });

            juicer.register("makeDep", function (id) {

                var res = "",title="";
                for (var i = 0; i < that.data.depList.length; i++) {
                    if(id == that.data.depList[i].data.id){
                        title = that.data.depList[i].data.name;
                    }
                }
                return res;

            });

            juicer.register("makeFuckTimeFuck", function (time) {

                var time = new Date(time), w;
                switch (time.getDay()) {
                    case 0 :
                        w = "周日";
                        break;
                    case 1 :
                        w = "周一";
                        break;
                    case 2 :
                        w = "周二";
                        break;
                    case 3 :
                        w = "周三";
                        break;
                    case 4 :
                        w = "周四";
                        break;
                    case 5 :
                        w = "周五";
                        break;
                    case 6 :
                        w = "周六";
                        break;
                }
                var obj = {
                    y: time.getFullYear(),
                    m: (time.getMonth() + 1) < 10 ? "0" + (time.getMonth() + 1) : (time.getMonth() + 1),
                    d: time.getDate() < 10 ? ("0"+time.getDate()): time.getDate(),
                    w: w,
                    h : time.getHours() < 10 ? ("0"+time.getHours()) : time.getHours(),
                    mm:(time.getMinutes() + 1) < 10 ? "0" + (time.getMinutes() + 1) : (time.getMinutes() + 1),
                }
                var resTime = obj.y + "年" + obj.m + '月' + obj.d+"日" + " " + obj.h + ":" + obj.mm;


                return resTime

            });




        },
        recacheDom : function(){
          var that = this;
            that.dom.address = $(".address");
            that.dom.city = $('.citybox');
            that.dom.overlay = $('#overlay');
            that.dom.seldep = $('#seldep');
            that.dom.selpro = $('#selpro');
            that.dom.desdep = $('#desdep');
            that.dom.despro = $('#despro');
            that.dom.person = $(".personal");
        },
        bindEvent : function(){
        //?treatmentPlanId=1&userId=00000301&treatmentPlanDetailId=2&doc=菜菜&dep=妇科&add=北京协和医院&time=2015年09月21日%2013:15&price=50
        }
    }

    var docs = new DocList();


})(window, $);