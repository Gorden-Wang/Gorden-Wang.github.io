/**
 * Created by gorden on 15/7/31.
 */
(function (win, $, Swiper) {
    var DoOrder = function () {
        this.init();
    }

    DoOrder.prototype = {
        init: function () {
            var that = this;
            that.addJuicerHandler();
            that.cacheData();
            that.cacheDom();
            //that.renderUI();
            //that.recacheDom();
            // that.bindEvent();
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
        cacheData: function () {
            var that = this;
            that.data = {};
            that.data.cityList = win.CITYLIST;
            that.data.doctorId = Wlib.getRequestParam("doctorId");

        },
        renderUI: function () {
            var that = this;
            that.dom.wrapper.html(juicer(that.dom.tpl.html(), that.data));

            var appendNumber = 4;
            var prependNumber = 1;
            var swiper = new Swiper('.swiper-container', {
                nextButton: '.pre',
                prevButton: '.next',
                slidesPerView: 4,
                centeredSlides: false,
                paginationClickable: true,
                spaceBetween: 0,
            });
            that.dom.loading.hide();
        },
        makeTimeList: function () {
            var that = this;

            var arr = (function (date) {

                //<div>
                //<p class="year">2015</p>
                //
                //    <p class="day">06月12日</p>
                //<span class="week">周一</span>
                //    </div>

                var arr = [];
                var time, obj, w;
                for (var i = 1; i <= 7; i++) {
                    time = new Date(date.getTime() + i * 24 * 3600 * 1000);
                    switch (time.getDay()) {
                        case 0 :
                            w = "星期日";
                            break;
                        case 1 :
                            w = "星期一";
                            break;
                        case 2 :
                            w = "星期二";
                            break;
                        case 3 :
                            w = "星期三";
                            break;
                        case 4 :
                            w = "星期四";
                            break;
                        case 5 :
                            w = "星期五";
                            break;
                        case 6 :
                            w = "星期六";
                            break;
                    }
                    obj = {
                        y: time.getFullYear(),
                        m: (time.getMonth() + 1) < 10 ? "0" + (time.getMonth() + 1) : (time.getMonth() + 1),
                        d: time.getDate(),
                        w: w
                    }

                    arr.push(obj);

                }

                return arr;


            })(new Date());

            that.data.timeList = arr;
        },
        recacheDom: function () {
            var that = this;
            that.dom.left = $("#leftbtn");
            that.dom.dataitems = $(".swiper-slide");
            that.dom.taocan = $(".taochan-wrapper");
            that.dom.times = $(".time-item");


        },
        fetchData: function () {
            var that = this;
            var param = {
                "doctorId": that.data.doctorId,
                "userid" : Wlib.getUserId()
            }

            Wlib.SendRequestNew("treatQuery","findDoctorTreatmentPlans", param, function (res) {
                that.data.docList = res.value;

                if(res.value){
                    that.makeTimeList();
                    console.log(that.data)

                    that.fetchDocDetail(function () {

                        that.renderUI();
                        that.recacheDom();
                        that.bindEvent();
                        that.dom.loading.hide();

                    })
                }else{
                    that.dom.loading.hide();
                    Wlib.tips("没有该医生的约诊信息。",null,true);


                }



            });
        },
        fetchDocDetail: function (callback) {
            var that = this;
            var param = {
                "doctorId": that.data.doctorId,
                "userid" : Wlib.getUserId()
            }

            Wlib.SendRequestNew("treatQuery","doctorInfo", param, function (res) {
                that.data.doc = res.value;
                callback && callback();


            });
        },
        addJuicerHandler: function () {
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
            juicer.register("makeDes", function (obj) {
                var res = "";
                for (var i = 0; i < obj.length; i++) {
                    res = res + obj[i].name;
                    if (i < obj.lenght) {
                        res += ",";
                    }
                }
                return res;
            });

            juicer.register("getPrice", function () {
                return that.data.docList[0].plan.price;
            });
            juicer.register("makeTime", function (time) {

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
                var resTime = obj.y + "年" + obj.m + '月' + obj.d + '日';


                return '<div>' +
                    resTime +
                    '</div>' +
                    '<span>' + w +
                    '</span>';

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
                var resTime = obj.y + "年" + obj.m + '月' + obj.d + '日';


                return resTime

            });


        },
        bindEvent: function () {
            var that = this;
            that.dom.dataitems.on("click", function () {
                if ($(this).hasClass("selected")) {
                    return;
                }
                $(this).addClass("selected").siblings().removeClass("selected");
            });
            that.dom.taocan.on("click", function () {
                $(this).find("p").toggleClass("taocanToggle");
                $(this).find(".t-r").toggleClass("rightToogle")
            });
            that.dom.times.on("click", function () {
                if ($(this).hasClass("selected")) {
                    return;
                }
                if ($(this).hasClass("dis")) {
                    return;
                }

                //如果没有登录 TODO : 删除localStorage

                !!localStorage.getItem("userId") && localStorage.setItem("userId", "00000301");


                var param = [
                    "treatmentPlanId="+ $(this).attr("data-plan"),
                    "userId="+ localStorage.getItem("userId"),
                    "treatmentPlanDetailId="+ $(this).attr("data-id"),
                    "doc="+ that.data.doc.name,
                    "dep="+ $("#res-dep").text(),
                    "add="+ $("#res-add").text(),
                    "time="+ $(this).attr("data-time")+" "+$(this).text(),
                    "price="+that.data.docList[0].plan.price
                ]
                var resparam = [].join.call(param,"&");
                console.log(resparam)
                //Wlib.SendRequest("2033", param, function (res) {
                //
                //    console.log(res);
                //    var nextparam = {
                //        doc : that.data.doc.name,
                //        dep :
                //    }
                //
                //    window.location.href = "../../pages/preorder/index.html?oid="+res.entity+"uid="+localStorage.getItem("userId");
                //
                //});
                window.location.href = "../../pages/preorder/index.html?"+resparam;





            })

            //@TODO : 下一页。。

        }

    }

    var doc = new DoOrder();


})(window, $, Swiper);