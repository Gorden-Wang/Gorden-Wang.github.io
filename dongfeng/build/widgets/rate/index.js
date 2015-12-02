/**
 * Created by gorden on 15/5/6.
 */

(function ($) {
    function Rate(opt) {
        // @author : gorden
        // @depend : index.scss zepto
        // @param :
        // var opt = {
        //    rate: '4.5',
        //    activeImg : '../../images/rate.png',
        //    defaultImg : '../../images/unde.png',
        //    halfImg : '../../images/half.png',
        //    wrapper : '#test',
        //    isHalf : true
        //};
        var imgPort = document.location.hostname.indexOf("test") > 0 || document.location.hostname.indexOf("local") > 0? 'https://ssl-static-test.instarekber.com/upay' : 'https://ssl-static.instarekber.com/upay' ;

        this.opt = {
            rate : opt.rate && String(opt.rate) || '0.0',
            activeImg : opt.activeImg || imgPort + '/images/common/star.png',
            defaultImg : opt.defaultImg || imgPort + '/images/common/unstar.png',
            halfImg : opt.halfImg || imgPort +'/images/common/halfstar.png',
            wrapper : opt.wrapper || '',
            starCount : opt.statCount || 5,
            isHalf : opt.isHalf || true,
            descObj : {
                lev5 : opt.descObj&&opt.descObj.lev5 || "非常棒",
                lev4 : opt.descObj&&opt.descObj.lev4 || "满意",
                lev3 : opt.descObj&&opt.descObj.lev3 || "一般",
                lev2 : opt.descObj&&opt.descObj.lev2 || "不满意",
                lev1 : opt.descObj&&opt.descObj.lev1 || "很差"
            },
            descWrapper : opt.descWrapper || ".rate-desc"
        };

        this.opt.rate.length == 1 && (this.opt.rate = this.opt.rate + ".0");


    }

    Rate.prototype = {
        init : function(){
            var that = this;
            if(that.opt.wrapper){
                $(that.opt.wrapper).append(that._renderUI());
            }else{
                return that._renderUI();
            }
        },
        _getRate : function(){
            var that = this;
            return that.opt.isHalf ? that.opt.rate : String(Math.round(that.opt.rate));
        },
        _getStar : function(){
            var that = this,
                r = that._getRate(),
                arr = r.split(".");
            return {
                one : Number(arr[0]),
                half : Math.round(parseInt(arr[1].slice(0,1))/10)
            }
        },
        _renderUI : function(){
            var that = this,
                starObj = that._getStar()
                starDom="",
                sel = starObj.one + starObj.half;
            for(var i = 0 ; i< starObj.one;i++){
                starDom += "<i><img src='" + that.opt.activeImg + "'></i>";
            }
            !!starObj.half && (starDom += '<i><img src="'+that.opt.halfImg+'"></i>');

            for(var i = sel;i<that.opt.starCount;i++){
                starDom += "<i><img src='" + that.opt.defaultImg + "'></i>"
            }

            return "<span class='rate-eles'>"+starDom+"</span>";
        },
        lazyRender : function(rate){
            var that = this;
            that.opt.rate = rate;
            return that._renderUI();
        },
        makeRate : function(){

        },
        bindEvent:function(wrapper){
            var that = this;
            var w = that.opt.wrapper || wrapper || 'body';
            $(w).find("i").each(function(i,v){
                $(this).on("click",function(){
                    var dom = that.lazyRender(_getSelectTag(this));
                    $(w).empty();
                    $(w).append(dom);
                    that.bindEvent(wrapper);
                })
            })


            function _getSelectTag(obj){
                var i= 0,obj=obj;
                while($(obj).prev().length > 0){
                     ++i;
                    obj = $(obj).prev();
                }
                that.rate = i+1;
                _refreshDom(that.opt.descWrapper,i+1);
                return parseInt(i+1)+".0";
            }

            function _refreshDom(wrapper,rate){
                var desc = that.opt.descObj["lev"+rate];
                $(wrapper).html(desc);

            }
        }
    }

     window.Rate = Rate;
})($);