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
    function Footer(wrapper,data,tag) {
        this.DATA = [
            {
                classname : "f-1",
                selected : false,
                url : '../../pages/index/index.html',
                id : ''
            },
            {
                classname : "f-2",
                selected : false,
                url : '',
                id : ''
            },
            {
                classname : "f-3",
                selected : false,
                url : '',
                id : ''
            },
            {
                classname : "f-4",
                selected : false,
                url : '',
                id : ''
            },
            {
                classname : "f-5",
                selected : true,
                url : '',
                id : ''
            }
        ];
        this.DATA[tag] = data;
        this.wrapper=wrapper;
        this.TPL = '<ul>{@each data as item}{@if item.selected==true}<li id="${item.id}" data-url="${item.url}" class="selected"><span class="f-icon ${item.classname}"></span></li>{@else}<li id="${item.id}" data-url="${item.url}"><span class="f-icon ${item.classname}"></span></li>{@/if}{@/each}</ul>'
        this.init();
    }


    Footer.prototype = {
        init: function () {
            var that = this;
            that.renderUI();
            that.bindEvent();
        },
        renderUI : function(){
            var that = this;
            that.wrapper.html(juicer(that.TPL,{data:that.DATA}));
        },
        bindEvent : function(){
            var that = this;
            that.wrapper.find("li").on("click",function(){
                if($(this).hasClass("selected")){
                    return;
                }
                var url = $(this).attr("data-url");
                win.location = url;
            })
        }
    }

    win.Wlib ? (win.Wlib.Footer = Footer) : (win.Footer = Footer);

})($, window);