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
            that.renderUI();
            that.recacheDom();
            that.bindEvent();
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

            that.dom.topWrapper = $(".top-header");
            that.dom.addBtn = $(".f-3");
            that.dom.input = $("input");
            that.dom.saveBtn = $(".right-w");
            that.dom.inputWrap = $(".input-wrapper");

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
            juicer.register("getId", function (url) {
                return Wlib.getRequestParam("id", url);
            });

        },
        bindEvent: function () {
            var that = this;

            FastClick.attach(document.body);

            that.dom.addBtn.on("click", function () {
                that.dom.topWrapper.hide();
                that.dom.inputWrap.show();
            });

            that.dom.saveBtn.on("click", function () {
                that.dom.loading.show();
                that.optIntrest(1,that.dom.input.val());
            });


        },
        optIntrest : function(type,name){
            //type : 1 add  2  remove
            var that = this;
            var req = {
                type : type,
                uid : localStorage.getItem("uid"),
                token : localStorage.getItem("token"),
                painter : name
            };

            Wlib.SendRequest("default/person/interest", req, "POST", function (data) {
                if(data.state == 1){
                    Wlib.tips("操作成功");
                    that.dom.loading.hide();
                }
            })
        },
        getData: function () {
            var that = this;
            var req = {
                uid: localStorage.getItem("uid"),
                token: localStorage.getItem("token")
            };
            Wlib.SendRequest("default/person/myInterest", req, "GET", function (data) {
                that.data.list = data;
                that.renderUI();
                that.recacheDom();
                that.bindEvent();
            })

        }
    }

    var index = new Index();


})(window, $);