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
        },
        cacheData: function () {
            var that = this;

            that.data = {

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
            that._makeFooter();
            that.dom.loading.hide();
        },
        recacheDom: function () {
            var that = this;

            that.dom.topLi = $(".lv1-wrapper li");
            that.dom.staLi = $(".lv2-wrapper li");
            that.dom.nextBtn = $(".tips-btn");

        },
        _makeFooter : function(){
          var that = this;
            var data ={
                classname: "f-3",
                selected: true,
                url: '',
                id: ''
            };

            var footer = new Wlib.Footer($("#footer"), data,2);
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

            that.dom.nextBtn.on("click",function(){
                $(".tips-wrapper").remove();
            })
        },
        getData: function () {
            var that = this;

            Wlib.SendRequest("default/api/square",{},"GET",function(data){
                that.data.data = data;
                that.renderUI();
                that.recacheDom();
                that.bindEvent();
            })

        }
    }

    var index = new Index();


})(window, $);