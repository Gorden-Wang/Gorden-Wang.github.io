/**
 * Created by gorden on 15/7/31.
 */
(function (win, $) {
    var Index = function () {
        this.init();
    }

    Index.prototype = {
        init: function () {
            var that = this;
            that.cacheData();
            that.cacheDom();
            that.renderUI();
            that.recacheDom();
            that.bindEvent();
            that.getPosition();
        },
        cacheData: function () {
            var that = this;

            that.data = {
                locationId: "1"//默认北京
            }
            that.data.cityList = win.CITYLIST;
            localStorage.setItem("userId",Wlib.getRequestParam("userId"))
        },
        cacheDom: function () {
            var that = this;
            that.dom = {
                wrapper: $("#page"),
                loading: $("#loading"),
                tpl: $("#tpl")
            }
        },
        renderUI: function () {
            var that = this;
            that.dom.wrapper.html(juicer(that.dom.tpl.html(), that.data));
            that.dom.loading.hide();
        },
        recacheDom: function () {
            var that = this;
            that.dom.banner = $(".banner");
            that.dom.doc = $("#docItme");
            that.dom.hos = $("#hosItme");
            that.dom.person = $(".personal");
            that.dom.citySelect = $("select");
        },
        bindEvent: function () {
            var that = this;
            that.dom.banner.on("click", function () {
                var url = $(this).attr("data-href");
                url && (window.location = url);
            });
            that.dom.doc.on("click", function () {
                window.location = "../../pages/doclist/index.html?locationId=" + that.data.locationId;
            });
            that.dom.hos.on("click", function () {
                window.location = "../../pages/hoslist/index.html?locationId=" + that.data.locationId;
            });
            that.dom.person.on("click", function () {
                window.location = "../../pages/person/index.html?locationId=" + that.data.locationId;
            });
            that.dom.citySelect.on("change", function () {
                that.data.locationId = $(this).val();
            })
        },
        getPosition: function () {
            var that = this;

            function getLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition);
                }
                else {
                    Wlib.tips("没有定位到您的城市，请稍候再试")
                }
            }

            function showPosition(position) {
                console.log(position)
               // callback && callback({latitude: position.coords.latitude, longitude: position.coords.longitude})

                //var myGeo = new BMap.Geocoder();
                //myGeo.getLocation(new BMap.Point(  position.coords.longitude,position.coords.latitude), function(result){
                //    if (result){
                //        console.log(result);
                //    }
                //});

                Wlib.SendRequest("1267",{latitude: position.coords.latitude, longitude: position.coords.longitude},function(res){
                    if(res.entity){
                        var CityList = {
                            "1" : "",
                            "2" : "",
                            "3" : "",
                            "187" : ""
                        };
                        (res.entity.id in CityList) && that.dom.citySelect.val(res.entity.id);
                    }
                })
            }

            getLocation();


        }
    }

    var index = new Index();


})(window, $);