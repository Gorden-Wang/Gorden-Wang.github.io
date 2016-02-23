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

            that.getData(function(){
                that.renderUI();
                that.recacheDom();
                that.bindEvent();
            });

        },
        cacheData: function () {
            var that = this;

            that.data = {}

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

            that.dom.newLi = $(".itemli li");
            that.dom.wallet = $(".wallet-wrap");

        },
        _makeFooter: function () {
            var that = this;
            var data ={
                classname: "f-5",
                selected: true,
                url: '',
                id: ''
            };

            var footer = new Wlib.Footer($("#footer"), data,4);
        },
        addJuicerHandler: function () {
            var that = this;


        },
        bindEvent: function () {
            var that = this;

            FastClick.attach(document.body);

            $("#getCoin").on("click",function(){
                window.location.href = "http://www.talkart.cc/index.php?r=default/news/coin";
            });

            $("#how").on("click",function(){
                window.location.href = "http://www.talkart.cc/index.php?r=default/news/share";
            });
            $(".download").on("click",function(){
                location.href = "http://www.talkart.cc/index.php?r=default/index/download";
            });
            $(".toShare").on("click",function(){
                $("body").append("<div class='overlay'></div>")
                $("body").append("<div id='tip'><p class='t-title'>把此信息分享给您的朋友吧</p><p id='content'>买卖书画，就用说画手机APP。安装并输入邀请码："+that.data.data.share_code+" ，我们都可以获得30画币。快来下载http://talkart.cc/index.php?r=default/index/download说画 书画从业者必备神器</p></div>")
                var sel = window.getSelection(),
                    range = document.createRange();

                range.setStart($("#content")[0].firstChild, 0);
                range.setEnd($("#content")[0].firstChild, $("#content").text().length);
                sel.removeAllRanges();
                sel.addRange(range);

                $(".overlay").on("click",function(){
                    $(this).remove();
                   $("#tip").remove();
                });


            });

        },
        getData : function(callback){
            var that = this;
            Wlib.SendRequest("default/set/getShareCode",{uid:localStorage.getItem("uid"),token:localStorage.getItem("token")},"GET",function(data){
                that.data.data = data;
                callback && callback();
            });
        }

    }

    var index = new Index();


})(window, $);