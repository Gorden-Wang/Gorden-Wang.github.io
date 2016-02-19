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
            //that.getData();

            that.renderUI();
            that.recacheDom();
            that.bindEvent();
            that.getSaleData();
            that.getTopImg();
        },
        cacheData: function () {
            var that = this;

            that.data = {

            }
            that.SELTAG = 1;

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
            that._makeFooter();
            that.dom.loading.hide();
        },
        recacheDom: function () {
            var that = this;

            that.dom.topLi = $(".top-tab li");
            that.dom.staLi = $(".sta-tab li");
            that.dom.itemLi = $(".list-wrapper li");
            that.dom.mainlist = $("#mainList ul");

        },
        _makeFooter : function(){
          var that = this;
            var data ={
                classname: "f-5",
                selected: true,
                url: '',
                id: ''
            };

            var footer = new Wlib.Footer($("#footer"), data,4);
        },

        addJuicerHandler: function () {
            var that = this;
            juicer.register("getPic", function () {
                  //@TODO 头像和昵称
                  return  localStorage.getItem("")
            });
            juicer.register("makeURL", function (type,id) {
                var t = parseInt(type),res="";
                switch (t){
                    case 2:
                //        出售
                        res = '../../pages/sale/index.html?id='+id;
                        break;
                    case 1 :
                //        拍卖
                        res = '../../pages/auction/index.html?id='+id;
                        break;
                    case 7 :
                //        欣赏
                        res = '../../pages/appreciate/index.html?id='+id;
                        break;
                    case 6 :
                        //        鉴定
                        res = '../../pages/identify/index.html?id='+id;
                        break;
                    case 3 :
                        //        文字
                        res = '../../pages/text/index.html?id='+id;
                        break;
                }

                return res;

            });


        },
        bindEvent: function () {
            var that = this;

            FastClick.attach(document.body);




            that.dom.topLi.on("click",function(){
                var isSelect = $(this).hasClass("selected");

                if(isSelect){
                    return;
                }

                $(this).addClass("selected").siblings().removeClass("selected");
            });


            that.dom.staLi.on("click",function(){
                var isSelect = $(this).hasClass("selected");
                var tag = parseInt($(this).attr("data-tag"));
                if(isSelect){
                    return;
                }

                $(this).addClass("selected").siblings().removeClass("selected");
                that.SELTAG = tag;
                that.dom.mainlist.html("");
                //$(window).off("scroll");
                window.onscroll = null

                switch(tag){
                    case 1 :
                        that.getSaleData();
                        break;
                    case 2 :
                        that.getAuctionData();
                        break;
                    case 3 :
                        that.getAppreciateData();
                        break;
                    case 4 :
                        that.getIdentifyData();
                        break;
                    case 5 :
                        that.getTextData();
                        break;
                }
            });

            that.dom.itemLi.on("click",function(){
                win.location = "detail.html"
            })
        },
        getTopImg : function(){
          var that = this;
            Wlib.SendRequest("default/person/personInfo",{fid:localStorage.getItem("uid")},"GET",function(data){

                $("#topImg").attr("src",data.visualize);

            });
        },
        getMultiDataDes : function(data){
          var that = this;
            var list = [];
            for(var i in data){
                for(var j in data[i]){
                    list.push(data[i][j]);
                }
            }
            return {
                length : list.length,
                lastId : list.length-1 > 0 && list[list.length-1].id
            }
        },
        getSaleData : function(){
            var that = this;
            Wlib.SendRequest("default/gallery/sale",{fid:localStorage.getItem("uid"),token:localStorage.getItem("token"),infoid:0},"GET",function(data){
                that.data.list = data;
                if(data.list.length == 0){
                    Wlib.tips("没有更多数据");
                    return;
                }
                that.dom.mainlist.append(juicer($("#sale-item").html(),{list : data}));
                Wlib._bindLazyLoad();
                if(data.list.length == 20){
                    that.bindNext();
                    that.LASTID = data.list[19].id;
                }

            });
        },
        getAuctionData : function(){
            var that = this;
            Wlib.SendRequest("default/gallery/auction",{fid:localStorage.getItem("uid"),token:localStorage.getItem("token"),infoid:0},"GET",function(data){
                that.data.list = data;
                if(data.list.length == 0){
                    Wlib.tips("没有更多数据");
                    return;
                }
                that.dom.mainlist.append(juicer($("#sale-item").html(),{list : data}));
                Wlib._bindLazyLoad();
                if(data.list.length == 20){
                    that.bindNext();
                    that.LASTID = data.list[19].id;
                }

            });
        },
        getAppreciateData : function(){
            var that = this;
            Wlib.SendRequest("default/gallery/appreciate",{fid:localStorage.getItem("uid"),token:localStorage.getItem("token"),infoid:0},"GET",function(data){
                that.data.list = data;
                if(data.list.length == 0){
                    Wlib.tips("没有更多数据");
                    return;
                }

                that.dom.mainlist.append(juicer($("#sale-item").html(),{list : data}));
                Wlib._bindLazyLoad();
                if(data.list.length == 20){
                    that.bindNext();
                    that.LASTID = data.list[19].id;
                }

            });
        },
        getIdentifyData : function(){
            var that = this;
            Wlib.SendRequest("default/gallery/identify",{fid:localStorage.getItem("uid"),token:localStorage.getItem("token"),infoid:0},"GET",function(data){
                that.data.list = data;
                if(data.list.length == 0){
                    Wlib.tips("没有更多数据");
                    return;
                }

                that.dom.mainlist.append(juicer($("#sale-item").html(),{list : data}));
                Wlib._bindLazyLoad();
                if(data.list.length == 20){
                    that.bindNext();
                    that.LASTID = data.list[19].id;
                }

            });
        },
        getTextData : function(){
            var that = this;
            Wlib.SendRequest("default/gallery/webtext",{fid:localStorage.getItem("uid"),token:localStorage.getItem("token"),infoid:0},"GET",function(data){
                that.data.list = data;
                if(data.list.length == 0){
                    Wlib.tips("没有更多数据");
                    return;
                }

                that.dom.mainlist.append(juicer($("#text-item").html(),{list : data}));
                var dataDes = that.getMultiDataDes(data.list);
                if(dataDes.length == 20){
                    that.bindNext();
                    that.LASTID = dataDes.lastId;
                }

            });
        },
        bindNext : function(){
            var that = this;
            Wlib._bindScrollTobottom(function(){
                if(that.SELTAG == 1){
                    //出售
                    Wlib.SendRequest("default/gallery/sale",{fid:localStorage.getItem("uid"),token:localStorage.getItem("token"),infoid:that.LASTID},"GET",function(data){
                        that.data.list = data;
                        that.dom.mainlist.append(juicer($("#sale-item").html(),{list : data}));
                        that.recacheDom();
                        Wlib._bindLazyLoad();
                        if(data.list.length == 20){
                            that.bindNext();
                            that.LASTID = data.list[19].id;
                        }

                    });
                }
                if(that.SELTAG == 2){
                    //出售
                    Wlib.SendRequest("default/gallery/auction",{fid:localStorage.getItem("uid"),token:localStorage.getItem("token"),infoid:that.LASTID},"GET",function(data){
                        that.data.list = data;
                        that.dom.mainlist.append(juicer($("#sale-item").html(),{list : data}));
                        that.recacheDom();
                        Wlib._bindLazyLoad();
                        if(data.list.length == 20){
                            that.bindNext();
                            that.LASTID = data.list[19].id;
                        }

                    });
                }
                if(that.SELTAG == 3){
                    //出售
                    Wlib.SendRequest("default/gallery/appreciate",{fid:localStorage.getItem("uid"),token:localStorage.getItem("token"),infoid:that.LASTID},"GET",function(data){
                        that.data.list = data;
                        that.dom.mainlist.append(juicer($("#sale-item").html(),{list : data}));
                        that.recacheDom();
                        Wlib._bindLazyLoad();
                        if(data.list.length == 20){
                            that.bindNext();
                            that.LASTID = data.list[19].id;
                        }

                    });
                }
                if(that.SELTAG == 4){
                    //出售
                    Wlib.SendRequest("default/gallery/identify",{fid:localStorage.getItem("uid"),token:localStorage.getItem("token"),infoid:that.LASTID},"GET",function(data){
                        that.data.list = data;
                        that.dom.mainlist.append(juicer($("#sale-item").html(),{list : data}));
                        that.recacheDom();
                        Wlib._bindLazyLoad();
                        if(data.list.length == 20){
                            that.bindNext();
                            that.LASTID = data.list[19].id;
                        }

                    });
                }
                if(that.SELTAG == 5){
                    //出售
                    Wlib.SendRequest("default/gallery/webtext",{fid:localStorage.getItem("uid"),token:localStorage.getItem("token"),infoid:that.LASTID},"GET",function(data){
                        that.data.list = data;
                        that.dom.mainlist.append(juicer($("#text-item").html(),{list : data}));
                        that.recacheDom();
                        var dataDes = that.getMultiDataDes(data.list);
                        if(dataDes.length == 20){
                            that.bindNext();
                            that.LASTID = dataDes.lastId;
                        }

                    });
                }
            },true);
        }
    }

    var index = new Index();


})(window, $);