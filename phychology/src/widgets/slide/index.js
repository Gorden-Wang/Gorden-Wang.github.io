/**
 * Created by gorden on 15/11/19.
 */

(function (win,scroll) {

    /*
     wrapper : #test
     sibling : #next
     dir : 0-left | 1-right,
     scroll : #scrollwrapper,
     inner : innerHTML


     */
    function Slider(opt) {
        this.opt = opt;
        this.init();
    }

    Slider.prototype = {
        init: function () {
            var that = this;
            that._renderUI();
        },

        slideIn: function () {
            var that = this;
            var wrapper = that.WRAPPER;
            if (that.opt.dir == 0) {
                //left menu
                wrapper.addClass("l-slide-in m-slide");
                that.NEXTWRAPPER.addClass("l-slide-in-main m-slide");

            }else{
                wrapper.addClass("r-slide-in m-slide");
                that.NEXTWRAPPER.addClass("r-slide-in-main m-slide");
            }

            that._makeOverLay();

            that.OVERLAY.on("touchstart",function(){
                that.slideOut();
            });
            that.OVERLAY.on("touchmove",function(e){
                e.preventDefault();
            })

        },
        slideOut: function () {
            var that = this;
            var wrapper = that.WRAPPER;
            if (that.opt.dir == 0) {
                //left menu
                wrapper.removeClass("l-slide-in");
                that.NEXTWRAPPER.removeClass("l-slide-in-main");



            }else{
                wrapper.removeClass("r-slide-in");
                that.NEXTWRAPPER.removeClass("r-slide-in-main");
            }
            that.OVERLAY.fadeOut();


        },
        _makeOverLay: function () {
            var that = this;

            if(!that.OVERLAY){
                that.OVERLAY = $("<div class='slide-overlay'></div>");
                that.WRAPPER.parent().append(that.OVERLAY);
            }else{
                that.OVERLAY.fadeIn();
            }

        },
        _renderUI: function () {
            var that = this;

            that.WRAPPER = $(that.opt.wrapper);
            that.NEXTWRAPPER = $(that.opt.sibling);



            if (that.opt.dir == 0) {

                that.WRAPPER.css({
                    "transform": "translate3d(-100%, 0px, 0px)",
                    "-webkit-transform": "translate3d(-100%, 0px, 0px)",
                    "width":"80%",
                    "position":"fixed",
                    "top":"0px",
                    "overflow":"hidden",
                    "z-index":"20",
                    "height":$(window).height()

                });


            }else{
                that.WRAPPER.css({
                    "transform": "translate3d(100%, 0px, 0px)",
                    "-webkit-transform": "translate3d(100%, 0px, 0px)",
                    "width":"100%",
                    "padding-right":"20%",
                    "position":"fixed",
                    "top":"0px",
                    "overflow":"hidden",
                    "z-index":"20",
                    "height":$(window).height()
                });
            }

            that.opt.inner && that.WRAPPER.html(that.opt.inner);

        },
        bindScroll : function(){
            var that = this;
            var s = new scroll(that.opt.scroll || that.opt.wrapper, { scrollX: true, freeScroll: true,tap:true});
            return s;
        }


    }

    window.Wlib ? Wlib.Slider = Slider : window.Slider = Slider;


})(window,IScroll);