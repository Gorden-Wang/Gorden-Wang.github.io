/**
 * Created by gorden on 15/7/31.
 */
(function (win, $) {
    var Index = function () {
        var that = this;
        Wlib.wx.checkLogin(function(){
            Wlib.wx.getJSSign('', function (data) {
                Wlib.wx.jsConfig(data, function () {
                    Wlib.wx.hideMenu();
                    that.init();
                });
            });
        });

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
                id: Wlib.getRequestParam("id"),
                edite : Wlib.getRequestParam("edite")
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
            if(that.data.edite){
                var obj = {
                    wrapper : $(".seller-wrapper"),
                    proId : that.data.id,
                    editeUrl : '../../pages/post/index.html?id='+that.data.id+"&tag=2"
                }
                var e = new EditeProduct(obj);
            }
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
            juicer.register("makeHackInputDisplay", function (uid) {
                return uid == localStorage.getItem("uid") ? false : true;
            });

        },
        shareWX: function () {
            var that = this;
            setTimeout(function(){
                var obj = {
                    title: '微拍时代 全民说画',
                    desc: that.data.data.author + '作品正在出售',
                    link: 'http://wx.talkart.cn/pages/sale/index.html?id='+Wlib.getRequestParam('id'),
                    img: that.data.data.minipic[0]
                }

                Wlib.wx.shareTo(obj.title,obj.desc,obj.link,obj.img);
            },20);

        },
        bindEvent: function () {
            var that = this;
            that.shareWX();
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

            $(".ul-wrapper4 li").on("click", function () {
                var self = this;
                var isMy = $(this).find('input').length == 0 ? true : false;
                var id = $(this).attr("data-id");
                var feedbackId = $(this).attr("data-fromId");
                var name = $(this).attr("data-name");

                //tle, btnA, btnB, submit_fun, cancel_fun
                if(isMy){
                    Wlib.confirm("确定要删除这条评论吗?",['取消'],['确认'],function(){
                        that.deleCommon(id,function(){
                            $(self).remove();
                        });
                    });
                }else{
                    //add placeholder

                    that.dom.commText.attr("placeholder","回复"+name+":").focus();
                    that.FEEDBACKID = feedbackId;
                    $.scrollTo(5000, 200);


                }

            });

            Wlib._bindLazyLoad();

        },
        deleCommon : function(id,callback){
            var that = this;
            var req = {
                id: id,
                uid: localStorage.getItem("uid"),
                token: localStorage.getItem("token")
            }
            that.dom.loading.show();

            Wlib.SendRequest("default/person/deleteComment", req, "GET", function (data) {
                if (data.state == 1) {
                    that.dom.loading.hide();
                    Wlib.tips("删除评论成功");
                    callback && callback();

                } else {
                    that.dom.loading.hide();
                    Wlib.tips("删除评论失败")
                }
            });
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
            that.FEEDBACKID && (req.fid = that.FEEDBACKID);
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