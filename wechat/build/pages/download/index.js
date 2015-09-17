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




            var isIphone = navigator.userAgent.match(/iPhone|iPad|iPod/) ? true : false;

            $("#download").on("click",function(){
                //MicroMessenger
                if(isIphone){
                    window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.yihealth";
                }else{
                    window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.yihealth";
                }
            })



            var didScroll;
            var lastScrollTop = 0;
            var delta = 5;
            var navbarHeight = $('header').outerHeight();

            $(window).scroll(function(event){
                didScroll = true;
            });

            setInterval(function() {
                if (didScroll) {
                    hasScrolled();
                    didScroll = false;
                }
            }, 250);

            function hasScrolled() {
                var st = $(this).scrollTop();

                // Make sure they scroll more than delta
                if(Math.abs(lastScrollTop - st) <= delta)
                    return;

                if (st > lastScrollTop && st > navbarHeight){
                    // Scroll Down
                    $('header').removeClass('nav-down').addClass('nav-up');
                } else {
                    // Scroll Up
                    if(st + $(window).height() < $(document).height()) {
                        $('header').removeClass('nav-up').addClass('nav-down');
                    }
                }

                lastScrollTop = st;
            }


        }
    }

    var person = new Person();


})(window, $);