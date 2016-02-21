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

            }
            that.PAGE=1;

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
            juicer.register("getFuckType", function (type,id) {
                var res = "",type=parseInt(type);
                switch (type) {
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

            juicer.register("makeLoveDis", function (data) {
                var a = data.map(function (v) {
                    return v.name;
                })
                return a.join(",");
            });

        },
        bindEvent: function () {
            var that = this;

            FastClick.attach(document.body);


            Wlib._bindLazyLoad();







        },
        getData: function () {
            var that = this;

            Wlib.SendRequest("default/person/myCollect",{uid:localStorage.getItem("uid"),token:localStorage.getItem("token"),page:that.PAGE},"GET",function(data){
                that.data.data = data;
                that.renderUI();
                that.recacheDom();
                $("#mainWrap").append(juicer($("#picli").html(),{data : data}));
                that.bindEvent();

                if(data.list.length == 10){
                    //说明还有下一页
                    that.PAGE ++;
                    that.getCollect();
                }
            })

        },
        getCollect : function(){
            var that = this;
        //    default/person/myCollect
            Wlib._bindScrollTobottom(function(){
                Wlib.SendRequest("default/person/myCollect",{uid:localStorage.getItem("uid"),token:localStorage.getItem("token"),page:that.PAGE},"GET",function(data){
                    var tps = $(juicer($("#picli").html(),{data : data}));
                    $("#mainWrap").append(tps);
                    Wlib._bindLazyLoad();
                    if(data.list.length == 10){
                        //说明还有下一页
                        that.PAGE ++;
                        that.getCollect();
                    }
                })
            },true);

        }
    }

    var index = new Index();


})(window, $);