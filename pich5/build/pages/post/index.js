/**
 * Created by gorden on 15/7/31.
 */
(function (win, $) {
    var Index = function () {
        var that = this;
        Wlib.wx.getJSSign('', function (data) {
            Wlib.wx.jsConfig(data, function () {
                Wlib.wx.hideMenu();
                that.init();

            });
        });
    }

    Index.prototype = {
        init: function () {
            var that = this;
            that.addJuicerHandler();
            that.cacheData();
            that.cacheDom();
            that.getTags();
        },
        cacheData: function () {
            var that = this;

            that.data = {};
            that.data.newArr=[];

        },
        cacheDom: function () {
            var that = this;
            that.dom = {
                wrapper: $("#page"),
                loading: $("#loading"),
                tpl: $("#tpl"),
                tagtpl : $("#tagtpl")
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

            that.dom.topLi = $(".lv1-wrapper li");
            that.dom.staLi = $(".lv2-wrapper li");
            that.dom.nextBtn = $(".tips-btn");
            that.dom.imgs = $("#imgs");

        },
        _makeFooter: function () {
            var that = this;
            var data = {
                classname: "f-3",
                selected: true,
                url: '',
                id: ''
            };

            var footer = new Wlib.Footer($("#footer"), data, 2);
        },
        getTags: function () {
            var that = this;
            var req = {};
            Wlib.SendRequest("default/info/taglist", req, "GET", function (data) {
                console.log(data);
                that.data.data = data;
                that.renderUI();
                that.makeSubTag(that.data.newArr[0]);
                that.recacheDom();
                that.bindEvent();


                //    init data

                that.data.category = that.data.newArr[0].type;
                that.data.sort = that.data.newArr[0].next.sort[0];
                that.data.times = that.data.newArr[0].next.times[0];
            });
        },
        addJuicerHandler: function () {
            var that = this;
            juicer.register("getId", function (url) {
                return Wlib.getRequestParam("id", url);
            });
            juicer.register("getType", function (type) {
                var res = "";
                switch (type) {
                    case "出售":
                        res = "../../pages/sale/index.html";
                        break;
                    case "拍卖":
                        res = "../../pages/auction/index.html";
                        break;
                    //  @TODO : 鉴定，欣赏

                }
                return res;
            });

            juicer.register("getArray", function (data) {
                if(that.data.newArr.length > 0){
                    return that.data.newArr;
                }
                var arr = [];
                for(var i in data){
                    var obj = {};
                    obj.type = i;
                    obj.next = data[i];
                    arr.push(obj);
                }
                console.log(arr);
                that.data.newArr = arr;
                return that.data.newArr;
            });

            juicer.register("makeClass", function (str) {
                return str.length >= 4 ? "flex2" : "";
            });

        },
        bindEvent: function () {
            var that = this;

            FastClick.attach(document.body);


            Wlib._bindLazyLoad();

            that.dom.topLi.on("click", function () {
                var isSelect = $(this).hasClass("selected");

                if (isSelect) {
                    return;
                }

                $(this).addClass("selected").siblings().removeClass("selected");
                that.makeSubTag(that.data.newArr[parseInt($(this).attr("data-index"))]);
                that.data.category = $(this).text();
            });




            that.dom.nextBtn.on("click", function () {
                $(".tips-wrapper").remove();
            });

            //$("#addPic").on("click", function () {
            //    Wlib.wx.chooseImgs(function (ids) {
            //        //现实ID image.src = ids[0]
            //        that.dom.imgs.prepend("<li><div><img src='" + ids[0] + "'></div></li>");
            //        for (var i = 0, len = ids.length; i < len; i++) {
            //            Wlib.wx.upLoadImgs(ids[i], function (id) {
            //                alert(id);
            //            });
            //        }
            //
            //    })
            //});

            $("#fileInput").on("change",function(){
                var d = new FormData();
                d.append("pic",$(this)[0].files[0]);
                d.append("type",2);
                console.log(d);
                Wlib.SendRequest("default/person/uploadPic", d, "POST", function (data) {
                    console.log(data);
                })
            });
        },
        makeSubTag : function(obj){
          var that = this;
            $(".tip-tab-wrap").html(juicer(that.dom.tagtpl.html(),obj.next));

            that.dom.staLi = $(".lv2-wrapper li");
            if(!obj.next.times){
                that.data.times = "";
            }
            that.dom.staLi.on("click", function () {
                var isSelect = $(this).hasClass("selected");

                if (isSelect) {
                    return;
                }

                $(this).addClass("selected").siblings().removeClass("selected");
                if($(this).hasClass("times-tag")){
                    that.data.times = $(this).text();
                }else{
                    that.data.sort = $(this).text();
                }

            });
        },
        getData: function () {
            var that = this;

            Wlib.SendRequest("default/api/square", {}, "GET", function (data) {
                that.data.data = data;
                that.renderUI();
                that.recacheDom();
                that.bindEvent();
            })

        }
    }

    var index = new Index();


})(window, $);