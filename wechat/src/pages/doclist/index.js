/**
 * Created by gorden on 15/7/31.
 */
(function (win, $) {
    var DocList = function () {
        this.init();
    }
    var URL = location.href.split("#")[0];
    DocList.prototype = {
        init: function () {
            var that = this;
            Wlib.wx.getJS(URL,function(){
                that.cacheData();
                that.cacheDom();
                that.addJuicerHandler();
                that.fetchDocList();
                Wlib.wx.shareTo();
            });



        },
        cacheData: function () {
            var that = this;
            that.data = {};
            that.data.locationId = Wlib.getRequestParam("locationId");
            that.data.cityList = win.CITYLIST;
            that.data.depList = [];
            that.data.departmentId = Wlib.getRequestParam("departmentId") || -1;
            that.data.titleId = Wlib.getRequestParam("titleId") || -1;
            that.data.maxResults = 10;
            that.data.firstResult = 0;
        },
        cacheDom: function () {
            var that = this;
            that.dom = {
                wrapper: $("#page"),
                loading: $("#loading"),
                tpl: $("#tpl"),
                itemtpl: $("#itemtpl")
            }

        },
        renderUI: function () {
            var that = this;
            that.dom.wrapper.html(juicer(that.dom.tpl.html(), that.data));
            Wlib._bindLazyLoad();
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
            that.dom.person = $(".personal");
        },
        makeURL: function () {
            var that = this;

            return 'locationId=' + that.data.locationId + '&departmentId=' + that.data.departmentId + '&titleId=' + that.data.titleId;
        },
        bindEvent: function () {
            var that = this;
            that.dom.address.on("click", function () {
                resetDom();
                that.dom.city.show();
                that.dom.overlay.toggleClass("fadeIn");
            });
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
            that.dom.city.find("li").on("click", function () {
                var id = $(this).attr("data-id");
                that.data.locationId = id;
                window.location.replace('../../pages/doclist/index.html?' + that.makeURL());

            });

            that.dom.despro.find("div").on("click", function () {
                var id = $(this).attr("data-id");
                that.data.titleId = id;
                window.location.replace( '../../pages/doclist/index.html?' + that.makeURL());
            });
            function resetDom() {
                that.dom.city.hide();
                that.dom.overlay.removeClass("fadeIn");
                that.dom.desdep.hide();
                that.dom.despro.hide();
            }

            that.dom.person.on("click", function () {
                window.location = "../../pages/person/index.html"
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
                    case -1 :
                        res = '医生级别';
                        break;

                }
                return res;
            });
            juicer.register("makeCityName", function (str) {
                for (var i = 0; i < CITYLIST.length; i++) {
                    if (str == CITYLIST[i].id) {
                        return CITYLIST[i].name;
                    }
                }
            });

        },
        bindNext: function (tag) {
            var that = this;

            Wlib._bindScrollTobottom(function () {
                that.data.firstResult = that.data.firstResult + that.data.maxResults;
                var param = {
                    "departmentId": that.data.departmentId || -1,
                    "locationId": that.data.locationId || -1,
                    "titleId": that.data.titleId || -1,
                    firstResult: that.data.firstResult || 0,
                    maxResults: that.data.maxResults || 5
                }

                Wlib.SendRequestNew("treatQuery","findDoctorAndClinics", param, function (res) {
                    //if (res.entity && res.entity.length > 0) {

                    var data = {};
                    data.docList = res.value || [];
                    var reshtml = juicer($("#itemtpl").html(),data);
                    $(".list-wrapper").append(reshtml);
                    Wlib._bindLazyLoad();
                    if(res.value.length == that.data.maxResults){
                        that.bindNext(true);
                    }
                    if (!res.value || res.value.length == 0) {
                        Wlib.tips("没有查询到相关记录。")
                    }

                });
            },tag)


        },
        renderDepart: function () {
            var that = this;
            var res = "",title="";
            for (var i = 0; i < that.data.depList.length; i++) {
                if(that.data.departmentId == that.data.depList[i].data.id){
                    title = that.data.depList[i].data.name;
                    that.data.departmentId == -1 && (title ="科室");
                }
                res += '<div data-id="' + that.data.depList[i].data.id + '" class="condit"><span class="ks_' + that.data.depList[i].data.id + '"></span>' + that.data.depList[i].data.name + '</div>';
            }
            $("#desdep").html(res);
            title ? $("#seldep").text(title) : $("#seldep").text("科室")


            that.dom.desdep.find("div").on("click", function () {
                var id = $(this).attr("data-id");
                that.data.departmentId = id;
                window.location.replace( '../../pages/doclist/index.html?' + that.makeURL());
            });
        },
        fetchDepartments: function () {
            var that = this;
            if (that.data.depList.length == 0) {
                Wlib.SendRequestNew("commonQuery","findClinicDepts", {}, function (res) {
                    if (res.errorcode == 0 && res.value) {
                        that.data.depList = res.value;
                        that.renderDepart();
                    }
                });
            } else {
                //that.renderDepart();
            }

        },
        fetchDocList: function () {
            var that = this;
            var param = {
                "departmentId": that.data.departmentId || -1,
                "locationId": that.data.locationId || -1,
                "titleId": that.data.titleId || -1,
                firstResult: that.data.firstResult || 0,
                maxResults: that.data.maxResults || 5
            }

            Wlib.SendRequestNew("treatQuery","findDoctorAndClinics", param, function (res) {
                //if (res.entity && res.entity.length > 0) {
                that.data.docList = res.value || [];
                that.renderUI();
                if(res.value && (res.value.length == that.data.maxResults)){
                    that.bindNext(true);
                }
                that.recacheDom();
                that.bindEvent();
                that.fetchDepartments();
                //return;
                //}
                that.dom.loading.hide();

                if (!res.value || res.value.length == 0) {
                    Wlib.tips("没有查询到相关记录。")
                }

            });


        }
    }

    var docs = new DocList();


})(window, $);