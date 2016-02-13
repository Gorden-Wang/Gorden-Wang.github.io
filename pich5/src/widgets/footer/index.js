/**
 * Created by gorden on 15/12/16.
 */

(function ($, win) {

    /*
     @wrapper:domwrapper
     @data :
     {
     classname,
     selected,
     url,
     id
     }
     @tag:the index of data
     */
    function Footer(wrapper, data, tag) {
        this.DATA = [
            {
                classname: "f-1",
                selected: false,
                url: '../../pages/index/index.html',
                id: ''
            },
            {
                classname: "f-2",
                selected: false,
                url: '',
                id: ''
            },
            {
                classname: "f-3",
                selected: false,
                url: '',
                id: 'postBtn'
            },
            {
                classname: "f-4",
                selected: false,
                url: '',
                id: ''
            },
            {
                classname: "f-5",
                selected: false,
                url: '',
                id: ''
            }
        ];
        this.DATA[tag] = data;
        this.wrapper = wrapper;
        this.TPL = '<ul>{@each data as item}{@if item.selected==true}<li id="${item.id}" data-url="${item.url}" class="selected"><span class="f-icon ${item.classname}"></span></li>{@else}<li id="${item.id}" data-url="${item.url}"><span class="f-icon ${item.classname}"></span></li>{@/if}{@/each}</ul>'
        this.init();
    }


    Footer.prototype = {
        init: function () {
            var that = this;
            that.renderUI();
            that.bindEvent();
        },
        renderUI: function () {
            var that = this;
            that.wrapper.html(juicer(that.TPL, {data: that.DATA}));
        },
        bindEvent: function () {
            var that = this;
            that.wrapper.find("li").on("click", function () {
                if ($(this).hasClass("selected")) {
                    return;
                }
                var url = $(this).attr("data-url");
                url && (win.location = url);
            });

            $("#postBtn").on("click", function () {
                var wrapper = $(".post-wrapper");
                if(wrapper.length >0 ){
                    wrapper.show();
                }else{
                    that._makeSlide();
                    wrapper = $(".post-wrapper")
                    wrapper.show();
                }

                $("#post-cancel").one("click",function(){
                    wrapper.hide();
                });

                $("#postsale").one("click",function(){
                    win.location = "../../pages/post/index.html?tag=2";
                });

                $("#postaution").one("click",function(){
                    win.location = "../../pages/post/index.html?tag=1";
                });
                $("#postother").one("click",function(e){
                    var isOpen = $(this).hasClass("w-open");
                    if(isOpen){
                        //跳走

                    }else{
                        $(this).html('<span>作品欣赏</span><span>文字信息</span><span>非书画类</span>');
                        $(this).addClass("w-open");
                        $(this).find("span").one("click",function(){
                            if($(this).html() == "作品欣赏"){
                                    win.location = "../../pages/post/like.html";
                            }
                            if($(this).html() == "文字信息"){
                                win.location = "../../pages/post/font.html";
                            }
                            if($(this).html() == "非书画类"){
                                win.location = "../../pages/post/none.html";

                            }
                        })
                    }
                    //win.location = "../../pages/post/index.html?tag=1";
                });

            });
        },
        _makeSlide: function () {
            var that = this;
            var d = [
                '<div class="post-wrapper">',
                    '<div class="p-banner">',
                        '下载说话app享受更多功能',
                    '</div>',
                    '<ul>',
                        '<li id="postsale">',
                            '发布出售作品',
                        '</li>',
                        '<li id="postaution">',
                             '发布拍卖作品',
                        '</li>',
                        '<li id="postother">',
                            '发布其他作品',
                        '</li>',
                        '<li id="post-cancel">',
                            '取消',
                        '</li>',
                    '</ul>',
                '</div>'].join("");
            $("body").append(d);

        }
    }

    win.Wlib ? (win.Wlib.Footer = Footer) : (win.Footer = Footer);

})($, window);