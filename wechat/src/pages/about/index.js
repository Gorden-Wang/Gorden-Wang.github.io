/**
 * Created by gorden on 15/7/31.
 */
(function (win, $) {
    var Index = function () {
        this.init();
    }
    var URL = location.href.split("#")[0];
    Index.prototype = {
        init: function () {
            var that = this;
            Wlib.wx.getJS(URL,function() {
                that.cacheData();
                that.cacheDom();
                that.bindEvent();
            });
        },
        cacheData: function () {
            var that = this;
            that.data = {
                userId : Wlib.getUserId()
            }


        },
        cacheDom: function () {
            var that = this;
            that.dom  = {
                ck : $(".ck-wrapper")
            }
        },
        renderUI: function () {
            var that = this;

        },
        recacheDom: function () {
            var that = this;

        },
        bindEvent: function () {
            var that = this;

            that.dom.ck.on("click",function(){
                var item = $(this).find(".check-item");
                item.toggleClass("selected");

                $(this).siblings().find(".check-item").removeClass("selected");
            });

            $(".btn").on("click",function(){
                var select = that.dom.ck.find(".check-item.selected");
                var tag = select.parent(".ck-wrapper").attr("data-id");
                var content = $("textarea").val();

            })

        }
    }

    var index = new Index();


})(window, $);