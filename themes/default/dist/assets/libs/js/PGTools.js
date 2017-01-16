/**
 * Created by luozhong on 16/1/19.
 * desc：分享  兼容微信  camera360 新老版本
 */

(function () {

    var PGinterfaces = "";

    var PGTool = function () {

    };

    var P = PGTool.prototype;

    P.server = window.PGServer;

    //检查平台
    var checkFlatform = function () {
        var u = navigator.userAgent;
        return {
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            weixin: u.indexOf('MicroMessenger') > -1 //是否微信 （2015-01-22新增）
        };
    };

    //检查语言
    var checkLanguage = function () {
        var type = navigator.appName;
        var lang = "";
        if (type == "Netscape") {
            lang = navigator.language;
        } else {
            lang = navigator.userLanguage;
        }
        //return lang.substr(0, 2);
        return lang.toLowerCase();
        //return "en";
    };

    /*
     * title：配置PGBridge
     * */
    var configPg = function () {
        window.PG.setConfig({
            mode: 'dev',
            channel: 'native',
            appName: 'demo',
            debug: false
        });
    };
    /*
     * title：配置微信
     * */
    var configWx = function () {
        window.PG.setConfig({
            mode: 'dev',
            channel: 'wx',
            appName: 'zipai',
            WXRegisterUrl: 'https://activity.camera360.com/wechat/oauth/GetSha1Str',
            debug: false
        });
    };

    //检查app当前版本是否支持api
    var checkApi = function (interfaces, api, callback) {
        var data = {
            jsApiList: [api]
        };
        interfaces.checkJsApi(data).then(function (res) {
            var checkResult = 0;
            if (checkFlatform().ios) {
                checkResult = res.checkResult[api];
            }
            if (checkFlatform().android) {
                checkResult = res.apiResult[api];
            }
            callback && callback(checkResult);
        })
    };


    //初始化PG组件
    var initPg = function (callback, p) {
        if (checkFlatform().weixin) {
            configWx();
        } else {
            configPg();
        }
        if (PGinterfaces != "") {
            callback && callback(PGinterfaces);
            return;
        }
        window.PG.ready().then(function (interfaces) {
            PGinterfaces = interfaces;
            callback && callback(interfaces);
        });
    };

    //低版本show 分享渠道
    var showMenius = function (interfaces) {
        interfaces.showMenuItems({
            list: [{
                name: 'share',
                list: [
                    {name: 'wechat'},
                    {name: 'wechatMoments'}
                ]
            }
            ]
        }).then(function (res) {
        });
    };

    /*
     * name：配置分享文案 低版本 V7.0.2之前
     * desc：需先初始化
     * */
    var configShareDocument = function (interfaces, title, desc, link, imgUrl) {
        interfaces.onWebShareDefault({
            title: title,
            desc: desc,
            link: link,
            imgUrl: imgUrl,
            trigger: function (res) {
            },
            success: function (res) {
                //window.PGShare(1);
            },
            cancel: function (res) {
            },
            fail: function (res) {
            }
        });
        interfaces.onWebShareTimeline({
            title: desc,
            desc: desc,
            link: link,
            imgUrl: imgUrl,
            trigger: function (res) {
            },
            success: function (res) {
                //window.PGShare(1);
            },
            cancel: function (res) {
            },
            fail: function (res) {
            }
        });
    };

    //高版本分享  电商
    var newStoreShare = function (interfaces, title, desc, link, imgUrl, channel) {
        title = title || "";
        desc = desc || "";
        link = link || location.href;
        imgUrl = imgUrl || '';
        channel = channel && channel.constructor == Array ? channel.join(",") : "qq,wechat,wechatMoments,qqzone,weibo";
        configPg();
        var text = "分享";
        if (checkLanguage().indexOf("zh") < 0) {
            text = "Share";
        }
        var share = {
            "toolBar": [
                {
                    "display": {
                        "text": text
                    },
                    "action": "scheme://showShareDialog?chinnel=" + channel + "&title=" + encodeURIComponent(title) + "&description=" + encodeURIComponent(desc) + "&url=" + encodeURIComponent(link) + "&image=" + encodeURIComponent(imgUrl)
                }
            ]
        };
        configShareDocument(interfaces, title, desc, link, imgUrl);
        interfaces.configToolBar(share);
    };

    var insertPageShareIos = function (title, desc, link, imgUrl, channel) {
        initPg(function (interfaces) {
            checkApi(interfaces, "showShareChannelsMenuActionSheet", function (res) {
                if (res) {
                    interfaces.showShareChannelsMenuActionSheet({
                        shareChannels: channel
                    }).then(function (res) {
                        if (res.status == 200) {
                            interfaces.shareUrl({
                                channel: res.shareChannels,
                                shareData: {
                                    title: title,
                                    desc: desc,
                                    link: link,
                                    imgUrl: imgUrl
                                }
                            })
                        }
                    });
                }
            });
        });
    };

    //处理用户信息  id token  因为之前安卓某一版本bug  返回字段出错 需兼容处理
    P.dealNativeUserInfo = function (res) {
        var userInfo = {
            result: {
                mobile: '',
                uid: '',
                userToken: ''
            }
        };
        if (typeof res != "object" && typeof res != "undefined") {
            res = $.parseJSON(res)
        }
        if (checkFlatform().android) {
            if (typeof res.params != "undefined") {
                userInfo.result.uid = res.params.userId || "";
                userInfo.result.userToken = res.params.token || "";
                if (typeof res.result.mobile != "undefined") {
                    userInfo.result.mobile = res.params.mobile || "";
                }
            } else {
                if (typeof res.result.result != "undefined") {
                    userInfo.result.uid = res.result.result.userId || "";
                    userInfo.result.userToken = res.result.result.token || "";
                    if (typeof res.result.mobile != "undefined") {
                        userInfo.result.mobile = res.result.result.mobile || "";
                    }
                } else {
                    userInfo.result.uid = res.result.userId || "";
                    userInfo.result.userToken = res.result.token || "";
                    if (typeof res.result.mobile != "undefined") {
                        userInfo.result.mobile = res.result.mobile || "";
                    }
                }
            }
        }

        if (checkFlatform().ios) {
            if (typeof res.result.uid != "undefined") {
                userInfo.result.uid = res.result.uid || "";
                userInfo.result.userToken = res.result.userToken || "";
                userInfo.result.mobile = res.result.mobile || "";
            } else {
                userInfo.result.uid = res.result.mUserId || "";
                userInfo.result.userToken = res.result.mToken || "";
                userInfo.result.mobile = res.result.mobile || "";
            }
            if (typeof res.result.mobile != "undefined") {
                userInfo.result.mobile = res.result.mobile || "";
            }
        }
        return userInfo
    };

    P.shareImage = function(url,desc,callback){
        initPg(function(interfaces){
            interfaces.showMenuItems({
                list: [{
                    name: 'share',
                    list: [
                        {name: 'wechat'},
                        {name: 'wechatMoments'}
                    ]
                }
                ]
            }).then(function (res) {
                interfaces.downloadImage({url: url}).then(function (r) {
                    var params = {
                        localId: r.localId,
                        desc:desc
                    };
                    interfaces.shareImage(params).then(function (res) {
                        callback && callback(res);
                    })
                });
            });
        })
    };

    //分享
    P.shareUrl = function (title, desc, link, imgUrl, channel) {
        initPg(function (interfaces) {
            if (!checkFlatform().weixin) {
                //判断是否支持新版分享  否则用旧版
                checkApi(interfaces, 'showShareChannelsMenuActionSheet', function (res) {
                    if (res) {//新版本
                        newStoreShare(interfaces, title, desc, link, imgUrl, channel);
                    } else {
                        showMenius(interfaces);
                    }

                    showMenius(interfaces);
                });
            }

            configShareDocument(interfaces, title, desc, link, imgUrl);
        }, "pgSahre");
    };

    //P.pageShare = function (title, desc, link, imgUrl, channel) {
    //    insertPageShareIos(title, desc, link, imgUrl, channel);
    //};

    P.checkApis = function (api, callback) {
        initPg(function (interfaces) {
            checkApi(interfaces, api, function (res) {
                callback && callback(res);
            });
        });
    };

    //配置返回键
    P.PGSetReturnBtn = function (url) {
        var returnBtn = {};
        if (url == "") {
            returnBtn = {
                "action": "scheme://exit"
            };
        } else {
            returnBtn = {
                "action": url
            };
        }
        initPg(function (interfaces) {
            checkApi(interfaces, 'configReturnBtn', function (res) {
                if (res) {
                    interfaces.configReturnBtn(returnBtn);
                }
            });
        });
    };

    P.back = function (){
        initPg(function (interfaces) {
            interfaces.back();
        });
    };

    //获取公共参数
    P.getNativeInfo = function (callback) {
        initPg(function (interfaces) {
            interfaces.getNativeInfo().then(function (res) {
                callback && callback(res);
            });
        });
    };

    //调用登录功能
    P.pgLogin = function (callback) {
        initPg(function (interfaces) {
            interfaces.login("").then(function (res) {
                if (res.result.constructor === Object) {
                    callback && callback(res);
                }
            });
        });
    };

    ////获取用户信息  此功能会自动调用登录
    //P.getUserInfo = function (callback) {
    //    P.pgLogin(function(res){
    //        var userInfo = dealNativeInfo(res);
    //        callback && callback(userInfo);
    //    });
    //};

    //客户端签名
    P.createSignature = function (data, callback) {
        initPg(function (interfaces) {
            interfaces.createSignature(data).then(function (res) {
                callback && callback(res);
            });
        })
    };

    //隐藏右上角菜单
    P.hideToolBar = function (callback) {
        var hideBar = {
            "toolBar": []
        };
        initPg(function (interfaces) {
            interfaces.configToolBar(hideBar).then(function () {
                callback && callback();
            });
        })
    };
    //设置右上角菜单
    P.configToolBar = function (data, callback) {
        initPg(function (interfaces) {
            interfaces.configToolBar(data).then(function () {
                callback && callback();
            });
        })
    };

    //配置页面内按钮分享
    P.setPageShare = function (title, desc, link, imgUrl, channle) {
        if (checkFlatform().android) {
            initPg(function (interfaces) {
                configShareDocument(interfaces, title, desc, link, imgUrl);
            });
            if (channle.constructor == Array) {
                channle = channle.join(",");
            } else {
                channle = "wechat,wechatMoments,qqzone,weibo";
            }
            location.href = "scheme://showShareDialog?chinnel=" + channle
        }
        if (checkFlatform().ios) {
            if (channle.constructor != Array) {
                channle = ['qq', 'qqzone', 'wechat', 'wechatMoments', 'weibo'];
            }
            insertPageShareIos(title, desc, link, imgUrl, channle);
        }
    };

    //选择照片
    P.chooseImage = function (imageSize, callback) {
        initPg(function (interfaces) {
            interfaces.chooseImage({type: 'all', imageSize: 'w' + imageSize}).then(function (res) {
                callback && callback(res);
            })
        });
    };

    //选择贴纸照片
    P.chooseC360Image = function (data, callback) {
        initPg(function (interfaces) {
            interfaces.chooseC360Image({url: data}).then(function (res) {
                callback && callback(res);
            })
        });
    };
    //上传照片
    P.uploadImage = function (params, callback) {
        initPg(function (interfaces) {
                interfaces.uploadImage(params).then(function (res) {
                    if (checkFlatform().weixin) {
                        var p = {
                            "mediaId": res.serverId
                        };
                        P.server.getTicket(params.uploadUrl, p, function (res) {
                            callback && callback(res);
                        });
                    } else {

                        res.data = {
                            serverId: res.serverId
                        };
                        callback && callback(res);
                    }
                })
            }
        )
        ;
    };

    //保存图像
    P.saveImage = function (localId, callback) {
        initPg(function (interfaces) {
            interfaces.downloadImage({url: localId}).then(function (r) {
                var params = {
                    localId: r.localId
                };
                interfaces.saveImage(params).then(function (res) {
                    callback && callback(res);
                })
            });
        });
    };
    //iOS回弹效果关闭或开启
    P.doWebViewEnableBounceVertical = function (verticalBounce, callback) {
        initPg(function (interfaces) {
            interfaces.doWebViewEnableBounceVertical({verticalBounce: verticalBounce}).then(function (r) {});
        });
    };

    //不同分享渠道定义不同文案
    P.changeShareChanelText = function (r, callback) {
        if(!checkFlatform().weixin){
            initPg(function (interfaces) {
                interfaces.changeShareChanelText(r);
            });
        }
    };

    window.PGTool = PGTool;
})();
