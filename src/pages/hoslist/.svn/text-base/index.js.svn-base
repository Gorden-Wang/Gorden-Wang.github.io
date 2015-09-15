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
            that.dom.address = $(".address");
            that.dom.city = $('.citybox');
            that.dom.overlay = $('#overlay');
            that.dom.seldep = $('#seldep');
            that.dom.selpro = $('#selpro');
            that.dom.desdep = $('#desdep');
            that.dom.despro = $('#despro');
            that.dom.person = $(".personal");
        },
        bindEvent : function(){
            var that = this;
            that.dom.address.on("click",function(){
                resetDom();
                that.dom.city.show();
                that.dom.overlay.toggleClass("fadeIn");
            });
            that.dom.overlay.on("click",function(){
                that.dom.overlay.toggleClass("fadeIn");
                resetDom();
            });
            that.dom.seldep.on("click",function(){
                resetDom();
                that.dom.desdep.show();
                that.dom.overlay.toggleClass("fadeIn");
            });
            that.dom.selpro.on("click",function(){
                resetDom();
                that.dom.despro.show();
                that.dom.overlay.toggleClass("fadeIn");
            });

            function resetDom(){
                that.dom.city.hide();
                that.dom.overlay.removeClass("fadeIn");
                that.dom.desdep.hide();
                that.dom.despro.hide();
            }

            that.dom.person.on("click",function(){
                window.location = "../../pages/person/index.html"
            });
        }
    }

    var docs = new DocList();


})(window, $);