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
            that.addJuicerHandler();
            that.cacheData();
            that.cacheDom();
            that.getData();
        },
        cacheData: function () {
            var that = this;

            that.data = {
                id: Wlib.getRequestParam("id")
            }
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
            that.dom.moreLi = $("#more .swiper-slide");
            that.dom.scrollTo = $(".icon10");
            that.dom.myBtn = $("#mybtn");
            that.dom.buyBtn = $(".buyBtn");
            that.dom.sendComm = $(".backToHome");
            that.dom.commText = $(".saysometing input");
            that.dom.moreComm = $(".more-btn");

        },
        addJuicerHandler: function () {
            var that = this;
            juicer.register("getId", function (url) {
                return  Wlib.getRequestParam("id",url);
            });
            juicer.register("getType", function (type) {
                var res = "";
                switch (type){
                    case "出售":
                        res = "../../pages/sale/index.html";
                        break;
                    case "拍卖":
                        res = "../../pages/auction/index.html";
                        break;
                    //  @TODO : 鉴定，欣赏

                }
                return res;
            });

        },
        bindEvent: function () {
            var that = this;
            FastClick.attach(document.body);
            var swiper = new Swiper('#pics', {
                pagination: '.swiper-pagination'
            });
            var swiper2 = new Swiper('#more', {
                slidesPerView: 3.5,
                paginationClickable: true,
                spaceBetween: 5,
                lazyLoading : true
            });


            Wlib._scrollHide(100,that.dom.scrollTo);

            that.dom.moreLi.on("click",function(){
                var id = $(this).attr("data-id");
                var des = $(this).attr("data-url");

                if(!id){
                    Wlib.tips("已经下架");
                    return;
                }

                win.location = des + "?id="+id;
            });

            that.dom.scrollTo.on("click",function(){
                $.scrollTo(0,500);
            });

            that.dom.myBtn.on("click", function () {
                if (localStorage.getItem("isbind") == 1) {
                    win.location = "../../pages/my/index.html";
                } else {
                    Wlib.alert("绑定手机号，以便卖家可以联系到您。", "确定", function () {
                        localStorage.setItem("bindNextAction", "my");
                        win.location = "../../pages/regist/index.html";
                    });


                }

            });

            that.dom.buyBtn.on("click",function(){
                win.location = "../../pages/buy/index.html";
            });
            $("#pics .swiper-slide").on("click",function(){
                var current = $(this).find("img").attr("src");
                //   如果是个数组的话，直接穿进去就ok了。
                Wlib.wx.previewImgs(current,that.data.data.pic);
            });

            $("#complain").on("click", function () {
                that.addComplain(this);
            });
            $("#collect").on("click", function () {
                that.addCollect(this);
            });
            $("#praise").on("click", function () {
                that.addPraise(this);
            });
            that.dom.sendComm.on("click",function(){
                that.sendComm();
            });
            that.dom.moreComm.on("click",function(){
                Wlib.tips("下载APP查看更多评论。");
                location.href = "http://www.talkart.cc/index.php?r=default/index/download";
            });

            $(".seller-wrapper").on("click",function(){
                location.href = "../../pages/friendInfo/index.html?fid="+that.data.data.user_id;
            });

            Wlib._bindLazyLoad();

        },
        getData: function () {
            var that = this;

            //@TODO : uid 已经验证手机号
            var req = {
                id : that.data.id,
                uid : localStorage.getItem("uid"),
                token : localStorage.getItem("token")
            }
            Wlib.SendRequest("default/api/info",req,"GET",function(data){
                that.data.data = data;
                that.renderUI();
                that.recacheDom();
                that.bindEvent();
            })

        },
        addComplain: function (obj) {
            /*
             给某一个商品投诉
             */
            var that = this;
            var req = {
                id: that.data.id,
                uid: localStorage.getItem("uid"),
                token: localStorage.getItem("token"),
                type: 1
            }
            that.dom.loading.show();
            Wlib.SendRequest("default/picture/complain", req, "POST", function (data) {
                if (data.state == 1) {
                    that.dom.loading.hide();
                    Wlib.tips("举报成功");

                } else {
                    that.dom.loading.hide();
                    Wlib.tips("举报失败");
                }
            });


        },
        addCollect: function (obj) {
            /*
             给某一个商品收藏
             */
            var that = this;
            var req = {
                id: that.data.id,
                uid: localStorage.getItem("uid"),
                token: localStorage.getItem("token"),
                type : 1
            }
            that.dom.loading.show();
            if (that.data.data.collect == 0) {
                //去收藏
                Wlib.SendRequest("default/picture/collect", req, "GET", function (data) {
                    if (data.state == 1) {
                        that.dom.loading.hide();
                        Wlib.tips(data.message);
                        $(obj).html("已收藏");
                        that.data.data.collect = 1;

                    } else {
                        that.dom.loading.hide();
                        Wlib.tips("收藏失败")
                    }
                });
            } else {
                //取消收藏
                Wlib.SendRequest("default/picture/collect", req, "GET", function (data) {
                    if (data.state == 1) {
                        that.dom.loading.hide();
                        Wlib.tips(data.message);
                        $(obj).html("收藏")
                        that.data.data.collect = 0;
                    } else {
                        that.dom.loading.hide();
                        Wlib.tips("取消收藏失败")
                    }
                });
            }


        },
        addPraise: function (obj) {
            /*
             给某一个商品点赞
             */
            var that = this;
            var req = {
                id: that.data.id,
                uid: localStorage.getItem("uid"),
                token: localStorage.getItem("token"),
                type: 1
            }
            that.dom.loading.show();
            if (that.data.data.praise == 0) {
                //去点赞
                Wlib.SendRequest("default/picture/praise", req, "GET", function (data) {
                    if (data.state == 1) {
                        that.dom.loading.hide();
                        Wlib.tips(data.message);
                        $(obj).removeClass("icon7").addClass("icon9");
                        that.data.data.praise = 1;
                        //that.dom.praiseList.prepend('<li><a><img src="'+localStoarge.getItem("avatar")+'"></a></li>')

                    } else {
                        that.dom.loading.hide();
                        Wlib.tips("点赞失败")
                    }
                });
            } else {

                //取消关注
                req.type = 2;
                Wlib.SendRequest("default/picture/praise", req, "GET", function (data) {
                    if (data.state == 1) {
                        that.dom.loading.hide();
                        Wlib.tips(data.message);
                        $(obj).removeClass("icon9").addClass("icon7");
                        that.data.data.praise = 0;
                    } else {
                        that.dom.loading.hide();
                        Wlib.tips("取消点赞失败")
                    }
                });
            }


        },
        sendComm : function(){
            var that = this;
            var req = {
                id: that.data.id,
                uid: localStorage.getItem("uid"),
                token: localStorage.getItem("token"),
                type: 1,
                content : that.dom.commText.val()
            }
            that.dom.loading.show();
            Wlib.SendRequest("default/picture/comment", req, "POST", function (data) {
                if (data.state == 1) {
                    that.dom.loading.hide();
                    Wlib.tips("评论成功");
                    setTimeout(function(){
                        location.reload();
                    },3000)

                } else {
                    that.dom.loading.hide();
                    Wlib.tips("评论失败");
                }
            });
            that.dom.commText.val("");
        }
    }

    var index = new Index();


})(window, $);