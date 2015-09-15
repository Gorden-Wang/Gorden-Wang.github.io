/**
 * Created by gorden on 15/7/31.
 */
(function (win, $) {
    var DocList = function () {
        this.init();
    }

    DocList.prototype = {
        init : function(){
            var that = this;
            that.cacheDom();
            that.renderUI();
            that.recacheDom();
            that.bindEvent();
        },
        cacheDom : function(){
            var that = this;
            that.dom = {
                wrapper : $("#page"),
                loading : $("#loading"),
                tpl : $("#tpl")
            }

        },
        renderUI : function(){
            var that = this;
            that.dom.wrapper.html(juicer(that.dom.tpl.html(),{}));
            that.dom.loading.hide();
        },
        recacheDom : function(){
          var that = this;
            that.dom.filter = $('#filter');
            that.dom.overlay = $('#overlay');
            that.dom.filterbox = $(".filterbox");
            that.dom.bannerItems = $(".item");
        },
        bindEvent : function(){
            var that = this;
            that.dom.filter.on("click",function(){
                that.dom.filterbox.toggle();
                that.dom.overlay.toggleClass("fadeIn");
            });

            that.dom.overlay.on("click",function(){
                that.dom.overlay.toggleClass("fadeIn");
                that.dom.filterbox.toggle();
            });

            that.dom.bannerItems.on("click",function(){
                var  hasClass = $(this).hasClass(".selected");
                if(!hasClass){
                    $(this).addClass("selected").siblings(".item").removeClass("selected");
                }
            })



            //that.dom.person.on("click",function(){
            //    window.location = "../../pages/person/index.html"
            //});
        }
    }

    var docs = new DocList();


})(window, $);