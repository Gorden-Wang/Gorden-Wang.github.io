/**
 * Created by gorden on 16/3/15.
 */
/*! js ads 2016-03-15 */
define("2016/js/fruit/info", ["../common/zepto", "../common/cookie", "../common/piwik", "../common/wx-share-plugin", "../common/utils", "./basket"], function(a) {
    var b = a("../common/zepto")
        , c = (a("../common/cookie"),
            a("../common/preload"),
            a("../common/piwik"),
            a("../common/wx-share-plugin"))
        , d = a("./basket")
        , e = a("../common/utils")
        , f = {
            init: function() {
                this.cacheDOM(),
                    this.bindEvent(),
                    this.animate(),
                    this.initShare()
            },
            cacheDOM: function() {
                this.dom = {},
                    this.dom.container = b("#container"),
                    this.dom.btn = b("#join")
            },
            initShare: function() {
                $("title").html("分享了来自" + ""+ "的特色水果")
                var a = this.Unicode2String(e.urlQuery("name")) || "你的朋友"
                    , b = this.Unicode2String(e.urlQuery("province"))
                    , d = this.Unicode2String(e.urlQuery("city"))
                    , f = this.Unicode2String(e.urlQuery("fruit"));
                if (this.wxShareInfo = {
                        title: "我为家乡水果代言",
                        desc: "分享了来自" + ""+ "的特色水果",
                        //link: e.baseHost + "/p5/ads/2016/pages/fruit/share.php?name=",
                        imgUrl: "http://s.geilicdn.com/ads/2016/images/fruit/share_pic.png"
                    },
                        e.isWeixin()) {
                    var g = new c(this.wxShareInfo);
                    g.init(g)
                }
            },
            Unicode2String: function(a) {
                for (var b = "", c = 0; c < a.length / 5; c++)
                    b += String.fromCharCode(a[5 * c] + a[5 * c + 1] + a[5 * c + 2] + a[5 * c + 3] + a[5 * c + 4]);
                return b
            },
            String2Unicode: function(a) {
                for (var b = "", c = 0; c < a.length; c++)
                    b += a.codePointAt(c),
                    c != a.length - 1 && (b += "");
                return b
            },
            animate: function() {
                d.init({
                    container: [".animate"]
                })
            },
            bindEvent: function() {
                this.dom.btn.on("click", function() {
                    window.location.href = "join.php" + location.search
                })
            }
        };
    f.init()
});
