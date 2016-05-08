/**
 * Created by Gorden on 16/4/9.
 */
/*
 opt : Obj
 wrapper :
 proId:
 eiditeUrl :
 share :
 */
(function (win, $) {
    function EditeProduct(opt) {
        this.opt = opt;
        this.init();
    }

    EditeProduct.prototype = {
        init: function () {
            this.cacheData();
            this.renderUI();
            this.bindEvent();
        },
        cacheData: function () {
            var that = this;
            this.tpl = '<section class="edite-wrapper">' +
                '<div class="modify-sel">' +
                '<span id="J_del">删除</span>' +
                '   <span id="J_edite">编辑</span>' +
                '   </div>' +
                '   <div id="J_share" class="share-btn">' +
                '   <p>分享给朋友们</p>' +
                '   <span>(推广)</span>' +
                '   </div>' +
                '   </section>';
        },
        renderUI: function () {
            var that = this,
                wrap = this.opt.wrapper ;
            wrap.html(juicer(that.tpl, {}));
        },
        bindEvent : function(){
            var that = this,
                delDom = $("#J_del"),
                editeDom = $("#J_edite"),
                shareDom = $("#J_share");

            delDom.on("click",function(e){
                //alert("click 删除");
                //default/person/deletePhoto  GET  uid token id

                var req = {
                    id: that.opt.proId,
                    uid: localStorage.getItem("uid"),
                    token: localStorage.getItem("token")
                }
                Wlib.SendRequest("default/person/deletePhoto", req, "GET", function (data) {
                    history.back();
                })
                e.stopPropagation();
            });
            editeDom.on("click",function(e){
                //alert("click 编辑");
                win.location = that.opt.editeUrl;
                e.stopPropagation();
            });
            shareDom.on("click",function(e){
                Wlib.tips("请下载APP体验更多分享功能");
                location.href = "http://www.talkart.cc/index.php?r=default/index/download";
                e.stopPropagation();
            });
        }
    }

    win.EditeProduct = EditeProduct;

})(window, $)