/**
 * Created by gorden on 15/7/31.
 */
(function (win, $, Swiper) {
    var DocList = function () {
        this.init();
    }

    DocList.prototype = {
        init: function () {
            var that = this;
            that.addJuicerHandler();
            that.cacheDom();
            that.cacheData();
            that.makeTimeList();
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
            that.data.clinicId = Wlib.getRequestParam("clinicId");
            that.data.departmentId = Wlib.getRequestParam("departmentId");
            that.data.titleId = Wlib.getRequestParam("titleId");
            that.data.locationId = Wlib.getRequestParam("locationId");
            that.data.depList = [];
            that.data.firstResult = 0;
            that.data.maxResults = 5;
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
        recacheDom: function () {
            var that = this;
            that.dom.address = $(".address");
            that.dom.city = $('.citybox');
            that.dom.overlay = $('#overlay');
            that.dom.seldep = $('#seldep');
            that.dom.selpro = $('#selpro');
            that.dom.desdep = $('#desdep');
            that.dom.despro = $('#despro');

            that.dom.dataitems = $(".swiper-slide");
            that.dom.taocan = $(".taochan-wrapper");
            that.dom.times = $(".time-item");

            that.dom.tab1 = $("#tab1");
            that.dom.tab2 = $("#tab2");
            that.dom.wrap1 = $(".js");
            that.dom.wrap2 = $(".xz");

            that.dom.times = $(".time-item");

        },
        addJuicerHandler: function () {
            var that = this;

            juicer.register("makeRate", function (v) {
                var rate = new Rate({
                    rate: parseFloat(v),
                    activeImg: '../../images/redstar.png',
                    defaultImg: '../../images/graystar.png',
                    halfImg: '../../images/halfstar.png'
                });
                return rate.init()
            });

            juicer.register("makeTitle", function (str) {
                var res = "";
                switch (str) {
                    case '1' :
                        res = '主任医师';
                        break;
                    case '2' :
                        res = '副主任医师';
                        break;
                    case '3' :
                        res = '主治医师';
                        break;
                    case '4' :
                        res = '住院医师';
                        break;
                    case '-1' :
                        res = '不限';
                        break;
                }
                return res;
            });

            juicer.register("makeTimeListCheck", function (arr) {
                var o = that.data.originTimeList;
                var res = false;
                for (var j = that.data.fuckJ || 0; j <= arr.length; j++) {
                    if (res == true)
                        break;
                    for (var i = 0; i < o.length; i++) {
                        if (arr[j] == o[i].des) {
                            res = true;
                            that.data.fuckJ = j+1;
                            break;
                        }
                    }
                }

                return res ? (that.data.fuckJ == 1 ? "selected" : "") : "dis";

            });


        },
        fetchData: function () {
            var that = this;
            var param = {
                "clinicId": that.data.clinicId
            }

            Wlib.SendRequest("2030", param, function (res) {
                that.data.hos = res.entity;
                //that.fetcPingjia(function(){
                //    that.renderUI();
                //    that.recacheDom();
                //    that.bindEvent();
                //    //return;
                //    //}
                //    that.dom.loading.hide();
                //});


                that.fetchTime();
                console.log(res)


            });
        },
        fetchTime: function () {
            var that = this;
            var param = {
                "clinicId": that.data.clinicId,
                "deptId": that.data.departmentId,
                "titleId": that.data.titleId
            }

            Wlib.SendRequest("2028", param, function (res) {
                if (res.entity) {
                    that.data.timeEnable = res.entity;
                    that.fetchDataByTime(res.entity[0], function () {
                        that.renderUI();
                        that.recacheDom();
                        that.fetchDepartments();
                        that.bindEvent();
                        console.log(that.data);
                    });
                    return;
                }
                that.data.timeEnable = [];
                that.renderUI();
                that.recacheDom();
                that.fetchDepartments();
                that.bindEvent();
                Wlib.tips("没有查询记录");


            });
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
                    obj.des = obj.y + "-" + obj.m + "-" + obj.d

                    arr.push(obj);

                }

                return arr;


            })(new Date());

            that.data.originTimeList = arr;
        },
        fetchDataByTime: function (str, callback) {
            var that = this;
            var param = {
                "clinicId": that.data.clinicId,
                "deptId": that.data.departmentId,
                "titleId": that.data.titleId,
                "date": str,
                "firstResult":that.data.firstResult,
                "maxResults":that.data.maxResults
            }

            Wlib.SendRequest("2029", param, function (res) {
                that.data.itemList = res.entity;
                callback && callback();


            });
        },
        bindNext : function(){
          var that = this;
            var param = {
                "clinicId": that.data.clinicId,
                "deptId": that.data.departmentId,
                "titleId": that.data.titleId,
                "date": str,
                "firstResult":that.data.firstResult,
                "maxResults":that.data.maxResults
            }

            Wlib.SendRequest("2029", param, function (res) {
                that.data.itemList = res.entity;



            });
        },
        renderDepart: function () {
            var that = this;
            var res = "", title = "";
            for (var i = 0; i < that.data.depList.length; i++) {
                if (that.data.departmentId == that.data.depList[i].data.id) {
                    title = that.data.depList[i].data.name;
                }
                res += '<div data-id="' + that.data.depList[i].data.id + '" class="condit"><span class="ks_' + that.data.depList[i].data.id + '"></span>' + that.data.depList[i].data.name + '</div>';
            }
            $("#desdep").html(res);
            title ? $("#seldep").text(title) : $("#seldep").text("科室")

            that.dom.desdep.find("div").on("click", function () {
                var id = $(this).attr("data-id");
                that.data.departmentId = id;
                window.location.href = '../../pages/hosorder/index.html?' + that.makeURL();
            });
        },
        fetchDepartments: function () {
            var that = this;
            if (that.data.depList.length == 0) {
                Wlib.SendRequest("253", {}, function (res) {
                    if (res.errorcode == 0 && res.entity) {
                        that.data.depList = res.entity;
                        that.renderDepart();
                    }
                });
            } else {
                //that.renderDepart();
            }

        },
        makeURL: function () {
            var that = this;

            return 'clinicId=' + that.data.clinicId + '&departmentId=' + that.data.departmentId + '&titleId=' + that.data.titleId;
        },
        bindEvent: function () {
            var that = this;
            that.dom.overlay.on("click", function () {
                that.dom.overlay.toggleClass("fadeIn");
                resetDom();
            });
            that.dom.seldep.on("click", function () {
                resetDom();
                that.dom.desdep.show();
                that.dom.overlay.toggleClass("fadeIn");
            });
            that.dom.selpro.on("click", function () {
                resetDom();
                that.dom.despro.show();
                that.dom.overlay.toggleClass("fadeIn");
            });

            function resetDom() {
                that.dom.city.hide();
                that.dom.overlay.removeClass("fadeIn");
                that.dom.desdep.hide();
                that.dom.despro.hide();
            }

            that.dom.dataitems.on("click", function () {
                if ($(this).hasClass("selected") || $(this).hasClass("dis")) {
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
            });

            that.dom.tab1.on("click", function () {
                if ($(this).hasClass("select")) {
                    return;
                }

                $(this).addClass("select").siblings().removeClass("select");
                that.dom.wrap1.show();
                that.dom.wrap2.hide();
            });

            that.dom.tab2.on("click", function () {
                if ($(this).hasClass("select")) {
                    return;
                }

                $(this).addClass("select").siblings().removeClass("select");
                that.dom.wrap2.show();
                that.dom.wrap1.hide();
            });
            that.dom.despro.find("div").on("click", function () {
                var id = $(this).attr("data-id");
                that.data.titleId = id;
                window.location.href = '../../pages/hosorder/index.html?' + that.makeURL();
            });

            that.dom.times.on("click", function () {
                if ($(this).hasClass("selected")) {
                    return;
                }
                if ($(this).hasClass("dis")) {
                    return;
                }
                //$(this).addClass("selected").siblings().removeClass("selected");

                //下一页

                window.location.href = "../../pages/preorder/index.html";


            })
        }
    }

    var docs = new DocList();


})(window, $, Swiper);