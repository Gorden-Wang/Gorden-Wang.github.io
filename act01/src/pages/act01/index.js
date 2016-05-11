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
            that.addJuicerHandler();

            that.getItems();
            //that.renderUI();
            //that.recacheDom();
            //that.bindEvent();
        },
        cacheData: function () {
            var that = this;
            that.data = {};
            //http://121.199.57.142:8081/lifefinancial/api/game/proceedGameDetail.json?userId=203&token=e2c0be24560d78c5e599c2a9c9d0bbd2&gameId=1
            that.data.param = {
                userId: Wlib.getRequestParam("userId") || 203,
                token: Wlib.getRequestParam("token") || 'e2c0be24560d78c5e599c2a9c9d0bbd2',
                gameId: Wlib.getRequestParam("gameId") || 1
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
            that.dom.wrapper.prepend(juicer(that.dom.tpl.html(), that.data));
            that.dom.loading.hide();
        },
        recacheDom: function () {
            var that = this;
            that.dom.full = $(".full-img");
        },
        bindEvent: function () {
            var that = this;
            $(".button,.t-w.flex").on("click", function () {
                var url = that.data.data.enableDownload;
                Wlib.downLite(url);
            })

        },
        addJuicerHandler: function () {
            var that = this;
            juicer.register("makeDay", function (time) {
                var obj = makeTime(time);
                return makeDay(obj.day);

            });
            juicer.register("makeMD", function (time) {
                var obj = makeTime(time);
                return obj.m+"-"+obj.d;

            });
            juicer.register("makeHMS", function (time) {

                return time.split(" ")[1]

            });

            function makeTime(time) {
                var v = new Date(time);
                var obj = {
                    y: v.getFullYear(),
                    m: v.getMonth() + 1,
                    d: v.getDate(),
                    h: v.getHours(),
                    mm: v.getMinutes() + 1,
                    day: v.getDay()
                }

                return obj
            }

            function makeDay(i) {
                var res = ""
                switch (i) {
                    case 0 :
                        res = '星期日';
                        break;
                    case 1 :
                        res = '星期一';
                        break;
                    case 2 :
                        res = '星期二';
                        break;
                    case 3 :
                        res = '星期三';
                        break;
                    case 4 :
                        res = '星期四';
                        break;
                    case 5 :
                        res = '星期五';
                        break;
                    case 6 :
                        res = '星期六';
                        break;
                }
                return res;
            }

            juicer.register("makeGameName", function (str, tag) {
                if (!tag) {
                    tag = 0
                }
                return str.split(" ")[tag];
            })


        },
        getItems: function () {

            var that = this;

            //var data = {
            //    success: true,
            //    code: 1,
            //    message: "success",
            //    data: {
            //        teamA: {
            //            teamId: 1,
            //            teamName: "AC米兰",
            //            imageUrl: "/file/game/team/image/fb48e889-f497-40b0-9736-27bcb27f99cb.jpg",
            //            content: "AC米兰AC米兰AC米兰AC米兰",
            //            status: 1,
            //            typeId: 1
            //        },
            //        teamB: {
            //            teamId: 2,
            //            teamName: "罗马",
            //            imageUrl: "/file/game/team/image/b8c84cf0-c4c3-4ecd-9fc5-fd5aa4eb01a7.png",
            //            content: "罗马罗马罗马",
            //            status: 1,
            //            typeId: 1
            //        },
            //        winOrLose: [
            //            {
            //                detailId: 75,
            //                gameId: 1,
            //                type: 0,
            //                scoreType: 0,
            //                name: "胜",
            //                integral: 200,
            //                note: "",
            //                odds: "0.30"
            //            },
            //            {
            //                detailId: 74,
            //                gameId: 1,
            //                type: 0,
            //                scoreType: 0,
            //                name: "平",
            //                integral: 200,
            //                note: "",
            //                odds: "0.20"
            //            },
            //            {
            //                detailId: 73,
            //                gameId: 1,
            //                type: 0,
            //                scoreType: 0,
            //                name: "负",
            //                integral: 200,
            //                note: "",
            //                odds: "0.30"
            //            }
            //        ],
            //        score: {
            //            lose: [
            //                {
            //                    detailId: 84,
            //                    gameId: 1,
            //                    type: 1,
            //                    scoreType: 2,
            //                    name: "0:8",
            //                    integral: 200,
            //                    note: "",
            //                    odds: "0.20"
            //                },
            //                {
            //                    detailId: 83,
            //                    gameId: 1,
            //                    type: 1,
            //                    scoreType: 2,
            //                    name: "0:7",
            //                    integral: 200,
            //                    note: "",
            //                    odds: "0.90"
            //                },
            //                {
            //                    detailId: 82,
            //                    gameId: 1,
            //                    type: 1,
            //                    scoreType: 2,
            //                    name: "0:6",
            //                    integral: 200,
            //                    note: "",
            //                    odds: "0.40"
            //                }
            //            ],
            //            flat: [
            //                {
            //                    detailId: 81,
            //                    gameId: 1,
            //                    type: 1,
            //                    scoreType: 1,
            //                    name: "0:0",
            //                    integral: 200,
            //                    note: "",
            //                    odds: "0.50"
            //                }
            //            ],
            //            win: [
            //                {
            //                    detailId: 80,
            //                    gameId: 1,
            //                    type: 1,
            //                    scoreType: 0,
            //                    name: "1:0",
            //                    integral: 200,
            //                    note: "",
            //                    odds: "0.50"
            //                },
            //                {
            //                    detailId: 79,
            //                    gameId: 1,
            //                    type: 1,
            //                    scoreType: 0,
            //                    name: "2:0",
            //                    integral: 200,
            //                    note: "",
            //                    odds: "1.00"
            //                },
            //                {
            //                    detailId: 78,
            //                    gameId: 1,
            //                    type: 1,
            //                    scoreType: 0,
            //                    name: "3:0",
            //                    integral: 200,
            //                    note: "",
            //                    odds: "0.10"
            //                },
            //                {
            //                    detailId: 77,
            //                    gameId: 1,
            //                    type: 1,
            //                    scoreType: 0,
            //                    name: "4:0",
            //                    integral: 200,
            //                    note: "",
            //                    odds: "0.20"
            //                },
            //                {
            //                    detailId: 76,
            //                    gameId: 1,
            //                    type: 1,
            //                    scoreType: 0,
            //                    name: "5:0",
            //                    integral: 200,
            //                    note: "",
            //                    odds: "0.12"
            //                }
            //            ]
            //        },
            //        sum: [
            //            {
            //                detailId: 85,
            //                gameId: 1,
            //                type: 2,
            //                scoreType: 0,
            //                name: "20",
            //                integral: 200,
            //                note: "",
            //                odds: "0.40"
            //            }
            //        ],
            //        game: {
            //            gameId: 1,
            //            groupId: 0,
            //            typeId: 1,
            //            teamA: 1,
            //            teamB: 2,
            //            gameName: "AC米兰 VS 罗马",
            //            gameResultId: "73",
            //            gameResult: "0:1",
            //            gameTime: "2016-05-08 10:15:57",
            //            guessStartTime: "2016-04-24 10:16:09",
            //            guessEndTime: "2016-05-07 00:00:00",
            //            guessStatus: 4,
            //            guessBattle: 1,
            //            guessGoal: 1,
            //            guessScore: 1,
            //            createUserId: 0,
            //            updateUserId: 0,
            //            typeName: "欧洲杯"
            //        }
            //    }
            //}

            //callback(data);

            function callback(data) {

                if (data.code === 1 && data.success == true) {
                    //成功

                    that.data.data = data.data;

                    that.renderUI();
                    that.recacheDom();
                    that.bindEvent();



                    console.log(that.data.data)


                } else {
                    Wlib.tips(data.message);
                }

            }


            $.ajax({
                url: 'http://121.199.57.142:8081/lifefinancial/api/game/proceedGameDetail.json?userId='+that.data.param.userId+'&token='+that.data.param.token+'&gameId='+that.data.param.gameId,
                dataType : "json",
                method : "GET",
                success: function (res) {
                    callback(res);
                },
                error: function (err) {
                    error && error(DATA);
                }
            })


        }
    }

    var index = new Index();


})(window, $);