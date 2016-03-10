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

            that.getData(function () {
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
            that.dom.loading.hide();
        },
        recacheDom: function () {
            var that = this;

            that.dom.newLi = $(".itemli li");
            that.dom.wallet = $(".wallet-wrap");

        },
        _makeFooter: function () {
            var that = this;
            var data = {
                classname: "f-5",
                selected: true,
                url: '',
                id: ''
            };

            var footer = new Wlib.Footer($("#footer"), data, 4);
        },
        addJuicerHandler: function () {
            var that = this;


        },
        bindEvent: function () {
            var that = this;

            FastClick.attach(document.body);

            $("#pic").on("click",function(){
                location.href = "../../pages/pics/index.html?fid="+Wlib.getRequestParam("fid");
            })

        },

        getData: function (callback) {
            var that = this;

            var req = {
                uid: localStorage.getItem("uid"),
                token: localStorage.getItem("token"),
                fid: Wlib.getRequestParam("fid")
            };
            Wlib.SendRequest("default/friend/friendInfo", req, "GET", function (data) {
                that.data.data = data;
                callback && callback();
            })
        }


    }

    var index = new Index();


})(window, $);