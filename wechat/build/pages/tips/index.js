/**
 * Created by gorden on 15/7/31.
 */
(function (win, $) {
    var DocList = function () {
        this.init();
    }
    var URL = location.href.split("#")[0];
    DocList.prototype = {
        init: function () {
            var that = this;
            Wlib.wx.getJS(URL, function () {
                that.cacheDom();
                that.renderUI();
                that.recacheDom();
                that.bindEvent();
            });
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
            that.dom.wrapper.html(juicer(that.dom.tpl.html(), {}));
            that.dom.loading.hide();
        },
        recacheDom: function () {
            var that = this;
            that.dom.docdes = $("#docdes");
            that.dom.feedback = $("#feedback");
            that.dom.docwrapper = $("#deswrapper");
            that.dom.fbwrapper = $("#fbwrapper");
        },
        bindEvent: function () {
            var that = this;

            that.dom.docdes.on("click", function () {
                if ($(this).hasClass("tab_selected")) {
                    return
                }
                $(this).addClass("tab_selected").siblings().removeClass("tab_selected");
                that.dom.docwrapper.show();
                that.dom.fbwrapper.hide()
            });

            that.dom.feedback.on("click", function () {
                if ($(this).hasClass("tab_selected")) {
                    return
                }
                $(this).addClass("tab_selected").siblings().removeClass("tab_selected");
                that.dom.fbwrapper.show();
                that.dom.docwrapper.hide();
            });
        }
    }

    var docs = new DocList();


})(window, $);