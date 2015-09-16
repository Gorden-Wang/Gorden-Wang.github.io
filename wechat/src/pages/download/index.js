/**
 * Created by gorden on 15/7/31.
 */
(function (win, $) {
    var Person = function () {
        this.init();
    }

    Person.prototype = {
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
            that.dom.banner = $(".banner");
        },
        bindEvent : function(){
            var that = this;

            var thisH = window.pageYOffset,nextH= window.pageYOffset;
            var isHide =  $("header").hasClass("hide");
            var header = $("header");
            $(window).on("scroll",function(event){
                nextH = window.pageYOffset;
                if(nextH > thisH){
                    //页面向上走
                    if(!isHide){
                        header.addClass("hide");
                    }
                }else{
                    //页面向下走

                    if(!isHide){
                        header.removeClass("hide");
                    }
                }
                thisH = window.pageYOffset;
            })

        }
    }

    var person = new Person();


})(window, $);