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
            that.getSaleData();
            //that.renderUI();
            //that.recacheDom();
            //that.bindEvent();
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
                tpl: $("#tpl"),
                mainlist : $("#mainList")
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


            Wlib._bindLazyLoad();

            that.dom.topLi.on("click",function(){
                var isSelect = $(this).hasClass("selected");

                if(isSelect){
                    return;
                }

                $(this).addClass("selected").siblings().removeClass("selected");
            });


            that.dom.staLi.on("click",function(){
                var isSelect = $(this).hasClass("selected");

                if(isSelect){
                    return;
                }

                $(this).addClass("selected").siblings().removeClass("selected");
            });

            that.dom.itemLi.on("click",function(){
                win.location = "detail.html"
            })
        },
        getSaleData : function(){
            var that = this;
            Wlib.SendRequest("default/gallery/sale",{fid:localStorage.getItem("uid"),token:localStorage.getItem("token"),infoid:0},"GET",function(data){
                that.data.list = data;
                that.renderUI();
                that.recacheDom();
                that.bindEvent();

                if(data.list.length == 20){
                    that.bindNext();
                    that.LASTID = data.list[19].id;
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
                        //that.renderUI();
                        that.dom.mainlist.append(juicer($("#sale-item").html(),data));
                        that.recacheDom();
                        that.bindEvent();
                        if(data.list.length == 20){
                            that.bindNext();
                            that.LASTID = data.list[19].id;
                        }

                    });
                }
            });
        }
    }

    var index = new Index();


})(window, $);