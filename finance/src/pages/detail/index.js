/**
 * Created by gorden on 15/10/10.
 */
(function (win, $) {
    var Index = function () {
        this.init();
    }

    Index.prototype = {
        init: function () {
            var that = this;
            that.cacheData();
            that.cacheDom();
            //that.renderUI();


            that.getItems();
        },
        cacheData: function () {
            var that = this;
            //newsId=1&userId=8&token=c9f0f895fb98ab9159f51fd0297e236d
            that.data = {
                newsId: Wlib.getRequestParam("newsId"),
                type : Wlib.getRequestParam("type"),
                pageIndex : 1,
                pageSize : 10


            }
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
        },
        renderList : function(){
          var that = this;

            $("#reply").append(juicer($("#item-tpl").html(), that.data))
        },
        bindEvent: function () {
            var that = this;

        },
        getItems: function () {

            var that = this;


            function callback(data){

                if(data.success && data.code == "1"){
                    //成功

                    that.data.data = data.data;

                    that.renderUI();
                    that.bindEvent();

                    that.getList();

                    console.log(that.data.list)


                }else{
                    Wlib.tips(data.message);
                }





            }


            Wlib.GetJsonData("http://121.199.57.142:8081/lifefinancial/api/news/detail.json?newsId="+that.data.newsId+"&type="+that.data.type,callback,callback);

        },

        getList : function(){
            var that = this;


            function callback(data){

                if(data.success && data.code == "1"){
                    //成功

                    var data = {
                        success: true,
                        code: 1,
                        message: "success",
                        data: [
                            {
                                commentId: 2,
                                newsId: 1,
                                commentUserId: 31,
                                repliedUserId: 1,
                                repliedCommentId: 1,
                                content: "哈哈哈哈哈哈哈哈哈哈哈哈哈",
                                crType: 0,
                                releaseTime: "7天前",
                                commentUserName: "丁玲珑",
                                commentUserHeadImage: "/file/user/31/afd1407f-e89a-4d0b-ade7-bf26e22a7e7b.jpg",
                                repliedUserName: "李东",
                                repliedUserHeadImage: "/file/user/1/63dc528c-9ab2-4f9e-9d18-b760d9a7017d.png"
                            },
                            {
                                commentId: 18,
                                newsId: 1,
                                commentUserId: 1,
                                repliedUserId: 8,
                                repliedCommentId: 1,
                                content: "1111",
                                crType: 0,
                                releaseTime: "6天前",
                                commentUserName: "李东",
                                commentUserHeadImage: "/file/user/1/63dc528c-9ab2-4f9e-9d18-b760d9a7017d.png",
                                repliedUserName: "尼丝纺",
                                repliedUserHeadImage: ""
                            },
                            {
                                commentId: 19,
                                newsId: 1,
                                commentUserId: 1,
                                repliedUserId: 1,
                                repliedCommentId: 1,
                                content: "1111",
                                crType: 0,
                                releaseTime: "6天前",
                                commentUserName: "李东",
                                commentUserHeadImage: "/file/user/1/63dc528c-9ab2-4f9e-9d18-b760d9a7017d.png",
                                repliedUserName: "李东",
                                repliedUserHeadImage: "/file/user/1/63dc528c-9ab2-4f9e-9d18-b760d9a7017d.png"
                            },
                            {
                                commentId: 20,
                                newsId: 1,
                                commentUserId: 1,
                                repliedUserId: 2,
                                repliedCommentId: 1,
                                content: "1111",
                                crType: 0,
                                releaseTime: "6天前",
                                commentUserName: "李东",
                                commentUserHeadImage: "/file/user/1/63dc528c-9ab2-4f9e-9d18-b760d9a7017d.png",
                                repliedUserName: "王健林",
                                repliedUserHeadImage: ""
                            },
                            {
                                commentId: 21,
                                newsId: 1,
                                commentUserId: 1,
                                repliedUserId: 2,
                                repliedCommentId: 1,
                                content: "1111",
                                crType: 0,
                                releaseTime: "6天前",
                                commentUserName: "李东",
                                commentUserHeadImage: "/file/user/1/63dc528c-9ab2-4f9e-9d18-b760d9a7017d.png",
                                repliedUserName: "王健林",
                                repliedUserHeadImage: ""
                            },
                            {
                                commentId: 22,
                                newsId: 1,
                                commentUserId: 1,
                                repliedUserId: 2,
                                repliedCommentId: 1,
                                content: "1111",
                                crType: 0,
                                releaseTime: "6天前",
                                commentUserName: "李东",
                                commentUserHeadImage: "/file/user/1/63dc528c-9ab2-4f9e-9d18-b760d9a7017d.png",
                                repliedUserName: "王健林",
                                repliedUserHeadImage: ""
                            },
                            {
                                commentId: 23,
                                newsId: 1,
                                commentUserId: 1,
                                repliedUserId: 2,
                                repliedCommentId: 1,
                                content: "1111",
                                crType: 0,
                                releaseTime: "6天前",
                                commentUserName: "李东",
                                commentUserHeadImage: "/file/user/1/63dc528c-9ab2-4f9e-9d18-b760d9a7017d.png",
                                repliedUserName: "王健林",
                                repliedUserHeadImage: ""
                            },
                            {
                                commentId: 24,
                                newsId: 1,
                                commentUserId: 1,
                                repliedUserId: 2,
                                repliedCommentId: 1,
                                content: "1111",
                                crType: 0,
                                releaseTime: "6天前",
                                commentUserName: "李东",
                                commentUserHeadImage: "/file/user/1/63dc528c-9ab2-4f9e-9d18-b760d9a7017d.png",
                                repliedUserName: "王健林",
                                repliedUserHeadImage: ""
                            },
                            {
                                commentId: 26,
                                newsId: 1,
                                commentUserId: 1,
                                repliedUserId: 2,
                                repliedCommentId: 1,
                                content: "1111",
                                crType: 0,
                                releaseTime: "6天前",
                                commentUserName: "李东",
                                commentUserHeadImage: "/file/user/1/63dc528c-9ab2-4f9e-9d18-b760d9a7017d.png",
                                repliedUserName: "王健林",
                                repliedUserHeadImage: ""
                            },
                            {
                                commentId: 30,
                                newsId: 1,
                                commentUserId: 11,
                                repliedUserId: 2,
                                repliedCommentId: 26,
                                content: "22222222",
                                crType: 1,
                                releaseTime: "5天前",
                                commentUserName: "李四",
                                commentUserHeadImage: "/file/user/11/76787645-510a-4535-bbbd-8fe38cc13846.jpg",
                                repliedUserName: "王健林",
                                repliedUserHeadImage: ""
                            },
                            {
                                commentId: 31,
                                newsId: 1,
                                commentUserId: 11,
                                repliedUserId: 0,
                                repliedCommentId: 0,
                                content: "的恶魔我想咨询",
                                crType: 0,
                                releaseTime: "5天前",
                                commentUserName: "李四",
                                commentUserHeadImage: "/file/user/11/76787645-510a-4535-bbbd-8fe38cc13846.jpg",
                                repliedUserName: "",
                                repliedUserHeadImage: ""
                            },
                            {
                                commentId: 39,
                                newsId: 1,
                                commentUserId: 11,
                                repliedUserId: 1,
                                repliedCommentId: 19,
                                content: "蓝凌命名空间",
                                crType: 1,
                                releaseTime: "4天前",
                                commentUserName: "李四",
                                commentUserHeadImage: "/file/user/11/76787645-510a-4535-bbbd-8fe38cc13846.jpg",
                                repliedUserName: "李东",
                                repliedUserHeadImage: "/file/user/1/63dc528c-9ab2-4f9e-9d18-b760d9a7017d.png"
                            },
                            {
                                commentId: 40,
                                newsId: 1,
                                commentUserId: 11,
                                repliedUserId: 2,
                                repliedCommentId: 30,
                                content: "默默中央音乐学院",
                                crType: 1,
                                releaseTime: "4天前",
                                commentUserName: "李四",
                                commentUserHeadImage: "/file/user/11/76787645-510a-4535-bbbd-8fe38cc13846.jpg",
                                repliedUserName: "王健林",
                                repliedUserHeadImage: ""
                            }
                        ],
                        pager: {
                            pageIndex: 1,
                            pageCount: 0,
                            pageSize: 100,
                            totalCount: 0,
                            startRownum: 100
                        }
                    };


                    that.data.list = data.data;
                    that.renderList();

                    //that.renderUI();
                    //that.recacheDom();
                    //that.bindEvent();

                    if(that.data.list.length == data.data.length){
                        //@TODO 下一页
                    }

                    console.log(that.data.data)


                }else{
                    Wlib.tips(data.message);
                }





            }


            Wlib.GetJsonData("http://121.199.57.142:8081/lifefinancial/api/news/detail.json?newsId="+that.data.newsId+"&pageIndex="+that.data.pageIndex+"&pageSize="+that.data.pageSize,callback,callback);
        }
    }

    var index = new Index();


})(window, $);