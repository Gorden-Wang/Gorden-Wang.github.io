/**
 * Created by gorden on 16/4/15.
 */
(function (win, $) {
    function Confirm(opt) {
        this.opt = opt || {};
        this.init();
    }

    Confirm.prototype = {
        init: function () {
            this.cacheData();
            this.renderUI();
            this.bindEvent();

        },
        cacheData: function () {
            this.tpl = '<div class="J-Con-Wrap">' +
                '<p class="J-con-title">${title}</p>' +
                '<p class="J-con-sub">${subtitle}</p>' +
                '<div class="J-con-btns">' +
                '{@each btns as btn}' +
                '<div class="J-con-btn" id="${btn.id}">${btn.title}</div>' +
                '{@/each}' +
                '</div>' +
                '</div>'
        },
        renderUI: function () {
            var that = this;
            var html = juicer(this.tpl, this.opt);
            this.makeOverLay();
            $("body").append(html);

        },
        makeOverLay: function () {
            $('body').append('<div class="J-overLay"></div>')
        },
        bindEvent: function () {
            $('#J-Con-Can').on("click", function () {
                win.history.back();
            });
            $("#J-Con-Sale").on("click",function(){
                win.location.href = "../../pages/post/index.html?tag=10"
            });
            $("#J-Con-Auo").on("click",function(){
                win.location.href = "../../pages/post/index.html?tag=11"
            });
        }
    }
    win.Confirm = Confirm;
})(window, $)