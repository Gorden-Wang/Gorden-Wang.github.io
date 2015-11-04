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
            that.addJuicerHandler();
            that.router();
            that.cacheData();
            that.cacheDom();
            that.initWeChat();
            //that.renderUI();
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
        },
        renderUI: function () {
            var that = this;
            that.dom.wrapper.html(juicer(that.dom.tpl.html(), that.data));
            that.dom.loading.hide();
        },
        initWeChat: function () {
            wx.ready(function () {
                wx.onMenuShareAppMessage({
                    title: $("#shareTitle").attr("content"), // 分享标题
                    desc: $("#shareDes").attr("content"), // 分享描述
                    link: $("#shareLink").attr("content") || window.location.href, // 分享链接
                    imgUrl: $("#shareImg").attr("content") || 'http://www.gorden.wang/wechat/build/pages/download/logo.png', // 分享图标
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
            });
        },
        recacheDom: function () {
            var that = this;
            that.dom.banner = $(".banner");
            that.dom.full = $(".full-img");
        },

        addJuicerHandler: function () {
            var that = this;
            juicer.register("makeRate", function (v) {
                var rate = new Rate({
                    rate: parseFloat(v),
                    activeImg: './redstar.png',
                    defaultImg: './graystar.png',
                    halfImg: './halfstar.png'
                });
                return rate.init()
            });

            juicer.register("makeTime", function (v,isTime) {
                //2015/08/01
                var time = new Date(v);
                var obj = {
                    y : time.getFullYear(),
                    m : (time.getMonth()+1) <10 ? "0"+(time.getMonth()+1) : (time.getMonth()+1),
                    d : time.getDate(),
                    h : time.getHours(),
                    mm : time.getMinutes()+1
                }

                if(isTime){
                    return obj.m+"/"+obj.d+" "+obj.h+":"+obj.mm
                }
                return obj.y+"/"+obj.m+"/"+obj.d;
            });

            juicer.register("makeFuckTime", function (v) {
               return v.replace(/([^-])+-/,"").slice(0,-3)
            });

        },
        bindEvent: function () {
            var that = this;


            var isIphone = navigator.userAgent.match(/iPhone|iPad|iPod/) ? true : false;

            $("#download").on("click", function () {
                //MicroMessenger
                if (isIphone) {
                    window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.yihealth";
                } else {
                    window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.yihealth";
                }
            });
            $("footer").on("click", function () {
                //MicroMessenger
                if (isIphone) {
                    window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.yihealth";
                } else {
                    window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.yihealth";
                }
            });


            $(".download-li").on("click", function () {
                //MicroMessenger
                if (isIphone) {
                    window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.yihealth";
                } else {
                    window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.yihealth";
                }
            });


            var didScroll;
            var lastScrollTop = 0;
            var delta = 5;
            var navbarHeight = $('header').outerHeight();

            $(window).scroll(function (event) {
                didScroll = true;
            });

            setInterval(function () {
                if (didScroll) {
                    hasScrolled();
                    didScroll = false;
                }
            }, 250);

            function hasScrolled() {
                var st = $(this).scrollTop();

                // Make sure they scroll more than delta
                if (Math.abs(lastScrollTop - st) <= delta)
                    return;

                if (st > lastScrollTop && st > navbarHeight) {
                    // Scroll Down
                    $('header').removeClass('nav-down').addClass('nav-up');
                } else {
                    // Scroll Up
                    if (st + $(window).height() < $(document).height()) {
                        $('header').removeClass('nav-up').addClass('nav-down');
                    }
                }

                lastScrollTop = st;
            }


            $("#cl-address").on("click",function(){
                var lat = $(this).attr("data-lat");
                var lng = $(this).attr("data-lng");

                if(lat && lng){
                    location.href = "../../pages/map/index.html?longitude="+lng+"&latitude="+lat;
                }
            });

            $(".swiper-slide").on("click",function(){
                var src = $(this).find("img").attr("src");
                that.dom.full.show().append("<a class><img src='"+src +"'></a>");
            })
            that.dom.full.on("click",function(){
                $(this).html("");
                $(this).hide();
            });

        },
        router: function () {
            var that = this;
            var router = location.href.match(/download\/(.+).html/)[1];

            switch (router) {
                case  "clinic" :
                    that.renderClinic();
                    break;
                case "index" :
                    that.fetchNewsContent();
                    break;
                case "community":
                    that.fetchcommunityContent();
                    break;

            }
        },
        renderClinic: function () {
            var that = this;

            that.fetchClinic();


        },
        fetchClinic: function () {
            var that = this;
            var param = {
                "clinicId": Wlib.getRequestParam("clinicId")
            }

            Wlib.SendRequestNew("treatQuery", "clinicInfo", param, function (res) {
                that.data.clinic = res.value;
                //that.renderUI();
                //that.recacheDom();
                //that.bindEvent();
                //that.dom.loading.hide();
                //
                //if (!res.entity || res.entity.length == 0) {
                //    Wlib.tips("没有查询到相关记录。")
                //}

                that.fetchClinicComment();
            });


        },
        fetchClinicComment:function(){
            var that = this;
            var param = {
                "clinicId": Wlib.getRequestParam("clinicId"),
                "firstResult":0,
                "maxResults":5
            }

            Wlib.SendRequestNew("treatQuery", "findClinicComment", param, function (res) {
                that.data.com = res.value;
                that.renderUI();
                that.recacheDom();
                that.bindEvent();
                that.dom.loading.hide();

                if (!res.value || res.value.length == 0) {
                    Wlib.tips("没有查询到相关记录。")
                }

            });
        },
        fetchNewsContent : function(){
            var that = this;
            var param = {
                "newsid": Wlib.getRequestParam("newsid")
            }

            Wlib.SendRequestNew("newsQuery", "newsInfo", param, function (res) {
                that.data.news = res.value;
                that.fetchNewsCom();
                if (!res.value || res.value.length == 0) {
                    Wlib.tips("没有查询到相关记录。")
                }

            });

        },
        fetchNewsCom : function(){
            var that = this;
            var param = {
                "newsid": Wlib.getRequestParam("newsid"),
                "firstResult":0,
                "maxResults":2
            }

            Wlib.SendRequestNew("newsQuery", "findNewsComments", param, function (res) {
                that.data.com = res.value;
                that.renderUI();
                that.recacheDom();
                that.bindEvent();
                Wlib._bindLazyLoad();
                that.dom.loading.hide();

                if (!res.value || res.value.length == 0) {
                    Wlib.tips("没有查询到相关记录。")
                }

            });

        },
        fetchcommunityContent : function () {
            var that = this;
            var param = {
                "mainPostId": Wlib.getRequestParam("mainPostId")
            }

            Wlib.SendRequestNew("communityQuery", "findMainPostById", param, function (res) {
                that.data.com = res.value;
                that.fetchcommunityReply();

                if (!res.value || res.value.length == 0) {
                    Wlib.tips("没有查询到相关记录。")
                }

            });
        },
        fetchcommunityReply : function () {
            var that = this;
            var param = {
                "mainPostId": Wlib.getRequestParam("mainPostId"),
                "firstResult":0,
                "maxResults":2
            }

            Wlib.SendRequestNew("communityQuery", "findPosts", param, function (res) {
                that.data.comList = res.value;
                that.renderUI();
                that.recacheDom();
                that.bindEvent();
                var swiper = new Swiper('#pics', {
                    slidesPerView: 3,
                    paginationClickable: true,
                    spaceBetween: 10
                });
                var replay = new Swiper('.reply', {
                    slidesPerView: 5,
                    paginationClickable: true,
                    spaceBetween: 10
                });
                that.dom.loading.hide();

                if (!res.value || res.value.length == 0) {
                    Wlib.tips("没有查询到相关记录。")
                }

            });
        }


    }

    var person = new Person();


})(window, $);