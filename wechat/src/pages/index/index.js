/**
 * Created by gorden on 15/7/31.
 */
(function (win, $) {
    var Index = function () {
        this.init();
    }
    var URL = location.href.split("?")[0];

    Index.prototype = {
        init: function () {
            var that = this;
            Wlib.wx.getJS(URL,function(){
                that.cacheData();
                that.cacheDom();
                that.renderUI();
                that.recacheDom();
                that.bindEvent();
                that.getPosition();
            });

        },
        cacheData: function () {
            var that = this;

            that.data = {
                locationId: "1"//默认北京
            }
            that.data.cityList = win.CITYLIST;
            localStorage.setItem("userId", Wlib.getRequestParam("userId")||"");
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
                window.location = "../../pages/hoslist/index.html?locationId=" + that.data.locationId + "&latitude="+that.data.latitude+"&longitude="+that.data.longitude;
            });
            that.dom.person.on("click", function () {

                var url = "http://"+document.domain+"/wechat"+"/pages/person/index.html?locationId=" + that.data.locationId;
                Wlib.forceLogin(url,function(){});

            });
            that.dom.citySelect.on("change", function () {
                that.data.locationId = $(this).val();
            });
            //wx.onMenuShareTimeline({
            //    title: '伊健康-您身边的健康专家', // 分享标题
            //    link: location.href, // 分享链接
            //    imgUrl: 'http://test.hmsgtech.com/wechat/images/about/logo.png', // 分享图标
            //    success: function () {
            //        // 用户确认分享后执行的回调函数
            //    },
            //    cancel: function () {
            //        // 用户取消分享后执行的回调函数
            //    }
            //});

            //Wlib.wx.hideShare();

            Wlib.wx.shareTo('伊健康-您身边的健康专家','',URL,'/images/about/logo.png');
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
                that.data.latitude = position.coords.latitude;
                that.data.longitude = position.coords.longitude;
                Wlib.SendRequestNew("commonQuery","locate", {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }, function (res) {
                    if (res.value) {
                        var CityList = {
                            "1": "",
                            "2": "",
                            "3": "",
                            "187": ""
                        };
                        (res.value.id in CityList) && that.dom.citySelect.val(res.value.id);
                    }
                })
            }

            getLocation();


        }
    }

    var index = new Index();


})(window, $);