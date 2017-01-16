/**************************************************************************/
/*                                                                        */
/* Copyright (c)2010-2012  Pinguo Company             　　　　　　　      */
/*                 品果科技                            版权所有 2010-2012 */
/*                                                                        */
/* PROPRIETARY RIGHTS of Pinguo Company are involved in the  　　　　　　 */
/* subject matter of this material.  All manufacturing, reproduction, use,*/
/* and sales rights pertaining to this subject matter are governed by the */
/* license agreement.  The recipient of this software implicitly accepts  */
/* the terms of the license.                                              */
/* 本软件文档资料是品果公司的资产,任何人士阅读和使用本资料必须获得        */
/* 相应的书面授权,承担保密责任和接受相应的法律约束.                       */
/*                                                                        */
/**************************************************************************/

/*
 @author zhangzhi
 @email zhangzhi@camera360.com
 @edit by liangyunzhu 2015/06/17
 @email liangyunzhu@camera360.com
 */

/**
 * Created by yangyang on 2015/7/24
 * Description
 * Email yangyang@camera360.com
 */

$ajax = function (options) {
    this.formatParams = function (data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        //arr.push(("v=" + Math.random()).replace("."));
        return arr.join("&");
    };
    options = options || {};

    if (options.dataType == "jsonpCallback" || options.dataType == "callback") {
        //创建 script 标签并加入到页面中
        var callbackName = ('jsonp_' + Math.random()).replace(".", "");
        var oHead = document.getElementsByTagName('head')[0];
        options.data[options.dataType] = callbackName;
        var params = this.formatParams(options.data);
        var oS = document.createElement('script');
        oHead.appendChild(oS);

        //创建jsonp回调函数
        window[callbackName] = function (json) {
            oHead.removeChild(oS);
            clearTimeout(oS.timer);
            window[callbackName] = null;
            options.success && options.success(json);
        };

        //发送请求
        oS.src = options.url + '?' + params;

        //超时处理
        if (options.time) {
            oS.timer = setTimeout(function () {
                window[callbackName] = null;
                oHead.removeChild(oS);
                options.fail && options.fail({message: "超时"});
            }, time);
        }
    } else {
        var params = this.formatParams(options.data);

        options.type = (options.type || "GET").toUpperCase();
        options.dataType = options.dataType || "json";
        //创建 - 非IE6 - 第一步
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else {
            //IE6及其以下版本浏览器
            var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        //接收 - 第三步
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                if (status >= 200 && status < 300) {
                    options.success && options.success(xhr.responseText, xhr.responseXML);
                } else {
                    options.fail && options.fail(status);
                }
            }
        };

        //连接 和 发送 - 第二步
        if (options.type == "GET") {
            xhr.open("GET", options.url + "?" + params, true);
            xhr.send(null);
        } else if (options.type == "POST") {
            xhr.open("POST", options.url, true);
            //设置表单提交时的内容类型
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(params);
        }
    }
};

server = function (url, data, callback) {
    $ajax({
        url: url,
        type: 'GET',
        dataType: 'jsonpCallback',
        data: data ? data : {},
        success: function (res) {
            callback && callback(res);
        },
        fail: function (request, textStatus, errorThrown) {

        }
    });
};

(function () {
    window.PGPromise = function (func) {
        if (!(func instanceof Function)) {
            throw new Error('not a function');
            return;
        }
        var me = this;
        this.status = 'pending';
        this.callbackArr = [];
        var resolve = function (data) {
            me.callbackArr.forEach(function (callback) {
                callback(data);
            });
            me.status = 'end';
        }
        func && func(resolve);
    }
    var fn = window.PGPromise.prototype;
    fn.then = function (func) {
        if (!(func instanceof Function)) {
            throw new Error('not a function');
            return this;
        }
        this.callbackArr.push(func);
        return this;
    }
})();


!function (a, b) {
    "function" == typeof define && (define.amd || define.cmd) ? define(function () {
        return b(a)
    }) : b(a, !0)
}(this, function (a, b) {
    function c(b, c, d) {
        a.WeixinJSBridge ? WeixinJSBridge.invoke(b, e(c), function (a) {
            g(b, a, d)
        }) : j(b, d)
    }

    function d(b, c, d) {
        a.WeixinJSBridge ? WeixinJSBridge.on(b, function (a) {
            d && d.trigger && d.trigger(a), g(b, a, c)
        }) : d ? j(b, d) : j(b, c)
    }

    function e(a) {
        return a = a || {}, a.appId = z.appId, a.verifyAppId = z.appId, a.verifySignType = "sha1", a.verifyTimestamp = z.timestamp + "", a.verifyNonceStr = z.nonceStr, a.verifySignature = z.signature, a
    }

    function f(a) {
        return {timeStamp: a.timestamp + "", nonceStr: a.nonceStr, "package": a.package, paySign: a.paySign, signType: a.signType || "SHA1"}
    }

    function g(a, b, c) {
        var d, e, f;
        switch (delete b.err_code, delete b.err_desc, delete b.err_detail, d = b.errMsg, d || (d = b.err_msg, delete b.err_msg, d = h(a, d, c), b.errMsg = d), c = c || {}, c._complete && (c._complete(b), delete c._complete), d = b.errMsg || "", z.debug && !c.isInnerInvoke && alert(JSON.stringify(b)), e = d.indexOf(":"), f = d.substring(e + 1)) {
            case"ok":
                c.success && c.success(b);
                break;
            case"cancel":
                c.cancel && c.cancel(b);
                break;
            default:
                c.fail && c.fail(b)
        }
        c.complete && c.complete(b)
    }

    function h(a, b) {
        var d, e, f, g;
        if (b) {
            switch (d = b.indexOf(":"), a) {
                case o.config:
                    e = "config";
                    break;
                case o.openProductSpecificView:
                    e = "openProductSpecificView";
                    break;
                default:
                    e = b.substring(0, d), e = e.replace(/_/g, " "), e = e.replace(/\b\w+\b/g, function (a) {
                        return a.substring(0, 1).toUpperCase() + a.substring(1)
                    }), e = e.substring(0, 1).toLowerCase() + e.substring(1), e = e.replace(/ /g, ""), -1 != e.indexOf("Wcpay") && (e = e.replace("Wcpay", "WCPay")), f = p[e], f && (e = f)
            }
            g = b.substring(d + 1), "confirm" == g && (g = "ok"), "failed" == g && (g = "fail"), -1 != g.indexOf("failed_") && (g = g.substring(7)), -1 != g.indexOf("fail_") && (g = g.substring(5)), g = g.replace(/_/g, " "), g = g.toLowerCase(), ("access denied" == g || "no permission to execute" == g) && (g = "permission denied"), "config" == e && "function not exist" == g && (g = "ok"), b = e + ":" + g
        }
        return b
    }

    function i(a) {
        var b, c, d, e;
        if (a) {
            for (b = 0, c = a.length; c > b; ++b)d = a[b], e = o[d], e && (a[b] = e);
            return a
        }
    }

    function j(a, b) {
        if (z.debug && !b.isInnerInvoke) {
            var c = p[a];
            c && (a = c), b && b._complete && delete b._complete, console.log('"' + a + '",', b || "")
        }
    }

    function k() {
        if (!("6.0.2" > w || y.systemType < 0)) {
            var b = new Image;
            y.appId = z.appId, y.initTime = x.initEndTime - x.initStartTime, y.preVerifyTime = x.preVerifyEndTime - x.preVerifyStartTime, C.getNetworkType({
                isInnerInvoke: !0,
                success: function (a) {
                    y.networkType = a.networkType;
                    var c = "https://open.weixin.qq.com/sdk/report?v=" + y.version + "&o=" + y.isPreVerifyOk + "&s=" + y.systemType + "&c=" + y.clientVersion + "&a=" + y.appId + "&n=" + y.networkType + "&i=" + y.initTime + "&p=" + y.preVerifyTime + "&u=" + y.url;
                    b.src = c
                }
            })
        }
    }

    function l() {
        return (new Date).getTime()
    }

    function m(b) {
        t && (a.WeixinJSBridge ? b() : q.addEventListener && q.addEventListener("WeixinJSBridgeReady", b, !1))
    }

    function n() {
        C.invoke || (C.invoke = function (b, c, d) {
            a.WeixinJSBridge && WeixinJSBridge.invoke(b, e(c), d)
        }, C.on = function (b, c) {
            a.WeixinJSBridge && WeixinJSBridge.on(b, c)
        })
    }

    var o, p, q, r, s, t, u, v, w, x, y, z, A, B, C;
    if (!a.jWeixin)return o = {
        config: "preVerifyJSAPI",
        onMenuShareTimeline: "menu:share:timeline",
        onMenuShareAppMessage: "menu:share:appmessage",
        onMenuShareQQ: "menu:share:qq",
        onMenuShareWeibo: "menu:share:weiboApp",
        onMenuShareQZone: "menu:share:QZone",
        previewImage: "imagePreview",
        getLocation: "geoLocation",
        openProductSpecificView: "openProductViewWithPid",
        addCard: "batchAddCard",
        openCard: "batchViewCard",
        chooseWXPay: "getBrandWCPayRequest"
    }, p = function () {
        var b, a = {};
        for (b in o)a[o[b]] = b;
        return a
    }(), q = a.document, r = q.title, s = navigator.userAgent.toLowerCase(), t = -1 != s.indexOf("micromessenger"), u = -1 != s.indexOf("android"), v = -1 != s.indexOf("iphone") || -1 != s.indexOf("ipad"), w = function () {
        var a = s.match(/micromessenger\/(\d+\.\d+\.\d+)/) || s.match(/micromessenger\/(\d+\.\d+)/);
        return a ? a[1] : ""
    }(), x = {initStartTime: l(), initEndTime: 0, preVerifyStartTime: 0, preVerifyEndTime: 0}, y = {
        version: 1,
        appId: "",
        initTime: 0,
        preVerifyTime: 0,
        networkType: "",
        isPreVerifyOk: 1,
        systemType: v ? 1 : u ? 2 : -1,
        clientVersion: w,
        url: encodeURIComponent(location.href)
    }, z = {}, A = {_completes: []}, B = {state: 0, res: {}}, m(function () {
        x.initEndTime = l()
    }), C = {
        config: function (a) {
            z = a, j("config", a);
            var b = z.check === !1 ? !1 : !0;
            m(function () {
                var a, d, e;
                if (b)c(o.config, {verifyJsApiList: i(z.jsApiList)}, function () {
                    A._complete = function (a) {
                        x.preVerifyEndTime = l(), B.state = 1, B.res = a
                    }, A.success = function () {
                        y.isPreVerifyOk = 0
                    }, A.fail = function (a) {
                        A._fail ? A._fail(a) : B.state = -1
                    };
                    var a = A._completes;
                    return a.push(function () {
                        z.debug || k()
                    }), A.complete = function () {
                        for (var c = 0, d = a.length; d > c; ++c)a[c]();
                        A._completes = []
                    }, A
                }()), x.preVerifyStartTime = l(); else {
                    for (B.state = 1, a = A._completes, d = 0, e = a.length; e > d; ++d)a[d]();
                    A._completes = []
                }
            }), z.beta && n()
        }, ready: function (a) {
            0 != B.state ? a() : (A._completes.push(a), !t && z.debug && a())
        }, error: function (a) {
            "6.0.2" > w || (-1 == B.state ? a(B.res) : A._fail = a)
        }, checkJsApi: function (a) {
            var b = function (a) {
                var c, d, b = a.checkResult;
                for (c in b)d = p[c], d && (b[d] = b[c], delete b[c]);
                return a
            };
            c("checkJsApi", {jsApiList: i(a.jsApiList)}, function () {
                return a._complete = function (a) {
                    if (u) {
                        var c = a.checkResult;
                        c && (a.checkResult = JSON.parse(c))
                    }
                    a = b(a)
                }, a
            }())
        }, onMenuShareTimeline: function (a) {
            d(o.onMenuShareTimeline, {
                complete: function () {
                    c("shareTimeline", {title: a.title || r, desc: a.title || r, img_url: a.imgUrl || "", link: a.link || location.href}, a)
                }
            }, a)
        }, onMenuShareAppMessage: function (a) {
            d(o.onMenuShareAppMessage, {
                complete: function () {
                    c("sendAppMessage", {
                        title: a.title || r,
                        desc: a.desc || "",
                        link: a.link || location.href,
                        img_url: a.imgUrl || "",
                        type: a.type || "link",
                        data_url: a.dataUrl || ""
                    }, a)
                }
            }, a)
        }, onMenuShareQQ: function (a) {
            d(o.onMenuShareQQ, {
                complete: function () {
                    c("shareQQ", {title: a.title || r, desc: a.desc || "", img_url: a.imgUrl || "", link: a.link || location.href}, a)
                }
            }, a)
        }, onMenuShareWeibo: function (a) {
            d(o.onMenuShareWeibo, {
                complete: function () {
                    c("shareWeiboApp", {title: a.title || r, desc: a.desc || "", img_url: a.imgUrl || "", link: a.link || location.href}, a)
                }
            }, a)
        }, onMenuShareQZone: function (a) {
            d(o.onMenuShareQZone, {
                complete: function () {
                    c("shareQZone", {title: a.title || r, desc: a.desc || "", img_url: a.imgUrl || "", link: a.link || location.href}, a)
                }
            }, a)
        }, startRecord: function (a) {
            c("startRecord", {}, a)
        }, stopRecord: function (a) {
            c("stopRecord", {}, a)
        }, onVoiceRecordEnd: function (a) {
            d("onVoiceRecordEnd", a)
        }, playVoice: function (a) {
            c("playVoice", {localId: a.localId}, a)
        }, pauseVoice: function (a) {
            c("pauseVoice", {localId: a.localId}, a)
        }, stopVoice: function (a) {
            c("stopVoice", {localId: a.localId}, a)
        }, onVoicePlayEnd: function (a) {
            d("onVoicePlayEnd", a)
        }, uploadVoice: function (a) {
            c("uploadVoice", {localId: a.localId, isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1}, a)
        }, downloadVoice: function (a) {
            c("downloadVoice", {serverId: a.serverId, isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1}, a)
        }, translateVoice: function (a) {
            c("translateVoice", {localId: a.localId, isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1}, a)
        }, chooseImage: function (a) {
            c("chooseImage", {scene: "1|2", count: a.count || 9, sizeType: a.sizeType || ["original", "compressed"]}, function () {
                return a._complete = function (a) {
                    if (u) {
                        var b = a.localIds;
                        b && (a.localIds = JSON.parse(b))
                    }
                }, a
            }())
        }, previewImage: function (a) {
            c(o.previewImage, {current: a.current, urls: a.urls}, a)
        }, uploadImage: function (a) {
            c("uploadImage", {localId: a.localId, isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1}, a)
        }, downloadImage: function (a) {
            c("downloadImage", {serverId: a.serverId, isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1}, a)
        }, getNetworkType: function (a) {
            var b = function (a) {
                var c, d, e, b = a.errMsg;
                if (a.errMsg = "getNetworkType:ok", c = a.subtype, delete a.subtype, c)a.networkType = c; else switch (d = b.indexOf(":"), e = b.substring(d + 1)) {
                    case"wifi":
                    case"edge":
                    case"wwan":
                        a.networkType = e;
                        break;
                    default:
                        a.errMsg = "getNetworkType:fail"
                }
                return a
            };
            c("getNetworkType", {}, function () {
                return a._complete = function (a) {
                    a = b(a)
                }, a
            }())
        }, openLocation: function (a) {
            c("openLocation", {latitude: a.latitude, longitude: a.longitude, name: a.name || "", address: a.address || "", scale: a.scale || 28, infoUrl: a.infoUrl || ""}, a)
        }, getLocation: function (a) {
            a = a || {}, c(o.getLocation, {type: a.type || "wgs84"}, function () {
                return a._complete = function (a) {
                    delete a.type
                }, a
            }())
        }, hideOptionMenu: function (a) {
            c("hideOptionMenu", {}, a)
        }, showOptionMenu: function (a) {
            c("showOptionMenu", {}, a)
        }, closeWindow: function (a) {
            a = a || {}, c("closeWindow", {immediate_close: a.immediateClose || 0}, a)
        }, hideMenuItems: function (a) {
            c("hideMenuItems", {menuList: a.menuList}, a)
        }, showMenuItems: function (a) {
            c("showMenuItems", {menuList: a.menuList}, a)
        }, hideAllNonBaseMenuItem: function (a) {
            c("hideAllNonBaseMenuItem", {}, a)
        }, showAllNonBaseMenuItem: function (a) {
            c("showAllNonBaseMenuItem", {}, a)
        }, scanQRCode: function (a) {
            a = a || {}, c("scanQRCode", {needResult: a.needResult || 0, scanType: a.scanType || ["qrCode", "barCode"]}, function () {
                return a._complete = function (a) {
                    var b, c;
                    v && (b = a.resultStr, b && (c = JSON.parse(b), a.resultStr = c && c.scan_code && c.scan_code.scan_result))
                }, a
            }())
        }, openProductSpecificView: function (a) {
            c(o.openProductSpecificView, {pid: a.productId, view_type: a.viewType || 0}, a)
        }, addCard: function (a) {
            var e, f, g, h, b = a.cardList, d = [];
            for (e = 0, f = b.length; f > e; ++e)g = b[e], h = {card_id: g.cardId, card_ext: g.cardExt}, d.push(h);
            c(o.addCard, {card_list: d}, function () {
                return a._complete = function (a) {
                    var c, d, e, b = a.card_list;
                    if (b) {
                        for (b = JSON.parse(b), c = 0, d = b.length; d > c; ++c)e = b[c], e.cardId = e.card_id, e.cardExt = e.card_ext, e.isSuccess = e.is_succ ? !0 : !1, delete e.card_id, delete e.card_ext, delete e.is_succ;
                        a.cardList = b, delete a.card_list
                    }
                }, a
            }())
        }, chooseCard: function (a) {
            c("chooseCard", {
                app_id: z.appId,
                location_id: a.shopId || "",
                sign_type: a.signType || "SHA1",
                card_id: a.cardId || "",
                card_type: a.cardType || "",
                card_sign: a.cardSign,
                time_stamp: a.timestamp + "",
                nonce_str: a.nonceStr
            }, function () {
                return a._complete = function (a) {
                    a.cardList = a.choose_card_info, delete a.choose_card_info
                }, a
            }())
        }, openCard: function (a) {
            var e, f, g, h, b = a.cardList, d = [];
            for (e = 0, f = b.length; f > e; ++e)g = b[e], h = {card_id: g.cardId, code: g.code}, d.push(h);
            c(o.openCard, {card_list: d}, a)
        }, chooseWXPay: function (a) {
            c(o.chooseWXPay, f(a), a)
        }
    }, b && (a.wx = a.jWeixin = C), C
});

;
(function () {

    function getQuery(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null;
    };

    window.PGNative = {
        debug: true,
        JsSDKversion: '0.0.1',
        deviceId: getQuery('deviceId'),
        locale: getQuery('locale'),
        platform: getQuery('platform'),
        channel: getQuery('channel'),
        appversion: getQuery('appversion'),
        appname: getQuery('appname'),
        geoinfo: getQuery('geoinfo')
    };
    var bridge,
        priviteKey,
        interfaces = {},
        translateShareText = null,
        webShareConfig = {
            Default: {},
            Timeline: {}
        };

    var a = interfaces;

    document.addEventListener('PGJsSDK', function (event) {
        console.log('PGJsSDK init success');
        bridge = event.bridge;
        priviteKey = event.priviteKey;
    }, false)

    PGNative.ready = function (callback) {
        try {
            bridge.init(interfaces, function (message, responseCallback) {
                if (responseCallback) {
                    responseCallback(ret);
                }
            });
        } catch (err) {
            throw new Error('PG init fail');

        } finally {
            if (callback) callback(interfaces);
        }
    };

    //检查API
    a.checkJsApi = function (data, callback) {

        if (data.jsApiList) {

            if (data.jsApiList.length <= 0) {
                throw new Error('checkJsApi list is empty!')
                    ;
            }

            var hasShareUrl = false;
            for (var i = 0; i < data.jsApiList; i++) {
                if (data.jsApiList[i] == 'shareUrl') {
                    hasShareUrl = true;
                }
                ;
            }
            if (!hasShareUrl) {
                data.jsApiList.push('shareUrl');
            }
            ;

            bridge.callHandler('checkJsApi', data, function (res) {
                callback(res);
            });
        }
        ;
    };

    a.prompt = function (data, callback) {
        console.log('callHandler prompt');
        bridge.callHandler('prompt', data, function (res) {
            callback(res);
        });
    };

    //选择图片
    a.chooseImage = function (data, callback) {
        console.log('callHandler chooseImage');
        bridge.callHandler('chooseImage', data, function (res) {
            callback(res);
        });
    };
    //选择贴纸图片  通过贴纸goto链接 进入贴纸相机  拍照后带回当前相片
    a.chooseC360Image = function (data, callback) {
        console.log('callHandler chooseC360Image');
        bridge.callHandler('chooseC360Image', data, function (res) {
            callback(res);
        });
    };

    //下载图片
    a.downloadImage = function (data, callback) {
        console.log('callHandler downloadImage');
        bridge.callHandler('downloadImage', data, function (res) {
            callback(res);
        });
    };

    //保存图片
    a.saveImage = function (data, callback) {
        console.log('callHandler saveImage');
        bridge.callHandler('saveImage', data, function (res) {
            callback(res);
        });
    };

    //上传图片
    a.uploadImage = function (data, callback) {
        console.log('callHandler uploadImage');
        bridge.callHandler('uploadImage', data, function (res) {
            callback(res);
        });
    };

    //自定义菜单显示
    a.showMenuItems = function (data, callback) {
        console.log('callHandler showMenuItems');
        bridge.callHandler('showMenuItems', data, function (res) {
            callback(res);
        });
    };

    //分享图片
    a.shareImage = function (data, callback) {
        console.log('callHandler shareImage');
        bridge.callHandler('shareImage', data, function (res) {
            callback(res);
        });
    };

    //分享图片
    a.showShareChannelsMenuActionSheet = function (data, callback) {
        console.log('callHandler showShareChannelsMenuActionSheet');
        bridge.callHandler('showShareChannelsMenuActionSheet', data, function (res) {
            callback(res);
        });
    };

    //分享
    a.shareUrl = function (data, callback) {
        console.log('callHandler shareUrl');
        bridge.callHandler('shareUrl', data, function (res) {
            callback(res);
        });
    };

    a.changeShareChanelText = function (r) {
        if (r.constructor != Object) {
            return
        }

        translateShareText = r;
    }

    //阿里支付
    a.triggerAlipay = function (data, callback) {
        console.log('callHandler triggerAlipay');
        bridge.callHandler('triggerAlipay', data, function (res) {
            callback(res);
        });
    };

    //微信支付
    a.triggerWechatPay = function (data, callback) {
        console.log('callHandler triggerWechatPay');
        bridge.callHandler('triggerWechatPay', data, function (res) {
            callback(res);
        });
    };

    //生成签名
    a.createSignature = function (data, callback) {
        console.log('callHandler createSignature');
        bridge.callHandler('createSignature', data, function (res) {
            callback(res);
        });
    };

    //获取APP公共参数
    a.getNativeInfo = function (data, callback) {
        console.log('callHandler getNativeInfo');
        bridge.callHandler('getNativeInfo', data, function (res) {
            callback(res);
        });
    };

    //返回上级页面
    a.back = function (){
        console.log('callHandler back');
        bridge.callHandler('back', {}, function (res) {

        });
    };

    a.login = function (data, callback) {
        console.log('callHandler login');
        bridge.callHandler('login', data, function (res) {
            callback(res);
        });
    };

    a.logout = function (data, callback) {
        console.log('callHandler logout');
        bridge.callHandler('logout', data, function (res) {
            callback(res);
        });
    };

    a.configToolBar = function (data, callback) {
        console.log('callHandler configToolBar');
        bridge.callHandler('configToolBar', data, function (res) {
            callback(res);
        });
    };

    a.configReturnBtn = function (data, callback) {
        console.log('callHandler configReturnBtn');
        bridge.callHandler('configReturnBtn', data, function (res) {
            callback(res);
        });
    };

    a.doWebViewEnableBounceVertical = function (data, callback) {
        console.log('callHandler doWebViewEnableBounceVertical');
        bridge.callHandler('doWebViewEnableBounceVertical', data, function (res) {
            callback(res);
        });
    };

    //配置默认分享链接
    a.onWebShareDefault = function (data) {
        console.log('call onWebShareDefault');
        if (data instanceof Object) {
            for (var key in data) {
                webShareConfig.Default[key] = data[key];
            }
        } else {
            throw new Error('onWebShareDefault: param must instanceof Object');
        }
    };

    //配置朋友圈分享链接
    a.onWebShareTimeline = function (data) {
        console.log('call onWebShareTimeline');
        if (data instanceof Object) {
            for (var key in data) {
                webShareConfig.Timeline[key] = data[key];
            }
        } else {
            throw new Error('onWebShareTimeline: param must instanceof Object');
        }
    };

    //私有方法：分享链接时候，native通过此接口获取分享配置。虽然外部可看到这个方法，但是不允许访问，会用上下文来做判断，上下文对应不上会警报。
    var transData = null;
    a._invokeWebShare = function (channelStr) {
        console.log('native call _invokeWebShare');
        var channel = "";
        if (channelStr.indexOf("channel") >= 0) { //安卓返回为json字符串  key 为channel ，iOS 直接返回字符串
            channel = JSON.parse(decodeURIComponent(channelStr)).channel; //channel为当前用户点击分享的渠道
        } else {
            channel = channelStr;
        }
        if (this === priviteKey) {
            if (typeof window.triggerChannel != "undefined") {
                window.triggerChannel(channel);//点击渠道后触发此方法通知H5用户选择哪种渠道
            }
            setTimeout(function () {
                var data = channelStr == 'wechatMoments' ? webShareConfig.Timeline : webShareConfig.Default;
                if (!transData) {
                    transData = JSON.parse(JSON.stringify(data));
                }
                if (channel == "wechatMoments") {
                    data.title = transData.desc;
                } else {
                    data.title = transData.title;
                }

                if (translateShareText && typeof translateShareText[channel] != "undefined") {//如果存在  则表示自定义不同渠道的文案
                    for (var i in translateShareText[channel]) {
                        data[i] = translateShareText[channel][i];
                    }
                }

                var param = {channel: channelStr, shareData: data};

                /*bridge.callHandler('shareUrl', param, function(resp){
                 if (data.callback) {
                 data.callback({status:200, message:'ok', channel:res.channel});
                 }
                 });*/
                //修改分享后的回调
                bridge.callHandler("shareUrl", param, function (resp) {
                    if (data.callback) {
                        data.callback()
                    }
                })
            }, 50);
        } else {
            throw new Error('warning: call this private method is not allowed!');
        }
    };

})();

(function () {

    var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {//移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }()
    };

    if (window.WebViewJavascriptBridge) {
        return
    }
    ;
    var messagingIframe,
        sendMessageQueue = [],
        receiveMessageQueue = [],
        messageHandlers = {};

    var CUSTOM_PROTOCOL_SCHEME = 'wvjbscheme',
        QUEUE_HAS_MESSAGE = '__WVJB_QUEUE_MESSAGE__';

    var responseCallbacks = {},
        uniqueId = 1,
        PGinterfaces = null;
    priviteKey = new Object();
    //priviteKey:bridge与window.PG的公钥，用来保护并对接一些私有属性或API

    function _createQueueReadyIframe(doc) {
        messagingIframe = doc.createElement('iframe');
        messagingIframe.style.display = 'none';
        messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE;
        doc.documentElement.appendChild(messagingIframe);
    }

    function init(interfaces, messageHandler) {
        PGinterfaces = interfaces;

        if (WebViewJavascriptBridge._messageHandler) {
            throw new Error('PGBridge.init called twice');
        }
        ;
        WebViewJavascriptBridge._messageHandler = messageHandler;
        var receivedMessages = receiveMessageQueue;
        receiveMessageQueue = null;
        for (var i = 0; i < receivedMessages.length; i++) {
            _dispatchMessageFromObjC(receivedMessages[i]);
        }
    }

    function send(data, responseCallback) {
        console.log('PGJsSDK call _send');
        _doSend({data: data}, responseCallback);
    }

    function registerHandler(handlerName, handler) {
        console.log('PGJsSDK call registerHandler');
        messageHandlers[handlerName] = handler;
    }

    function callHandler(handlerName, data, responseCallback) {
        console.log('PGJsSDK call callHandler');
        _doSend({handlerName: handlerName, data: data}, responseCallback);
    }

    function _doSend(message, responseCallback) {
        console.log('PGJsSDK call _doSend');
        if (responseCallback) {
            var callbackId = 'cb_' + (uniqueId++) + '_' + new Date().getTime();
            responseCallbacks[callbackId] = responseCallback;
            message['callbackId'] = callbackId;
        }
        sendMessageQueue.push(message);


        //向native发送信号，让其主动来获取方法队列
        if (browser.versions.android) {

            if (window.PinguoNativeAdr) {
                window.PinguoNativeAdr.sendSignalToAdr();
            } else {
                throw new Error('Can not find PinguoNativeAdr in android');
            }

        } else if (browser.versions.ios) {
            messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE;
        }
    }

    function _fetchQueue() {
        console.log('PGJsSDK call _fetchQueue');
        var messageQueueString = JSON.stringify(sendMessageQueue);
        sendMessageQueue = [];

        if (browser.versions.android) {
            //兼容安卓
            window.PinguoNativeAdr.setQueue(messageQueueString);
        } else {
            return messageQueueString;
        }
    }

    function _dispatchMessageFromObjC(messageJSON) {
        console.log('PGJsSDK call _dispatchMessageFromObjC');
        setTimeout(function _timeoutDispatchMessageFromObjC() {
            var message = JSON.parse(messageJSON);
            var messageHandler;

            if (message.responseId) {
                var responseCallback = responseCallbacks[message.responseId];
                if (!responseCallback) {
                    return
                }
                ;
                responseCallback(message.responseData);
                delete responseCallbacks[message.responseId];
            } else {
                var responseCallback;
                if (message.callbackId) {
                    var callbackResponseId = message.callbackId;
                    responseCallback = function (responseData) {
                        _doSend({responseId: callbackResponseId, responseData: responseData});
                    }
                }

                var handler = WebViewJavascriptBridge._messageHandler;
                if (message.handlerName) {
                    handler = messageHandlers[message.handlerName];
                }

                try {
                    handler(message.data, responseCallback);
                } catch (exception) {
                    if (typeof console != 'undefined') {
                        console.log("PGBridge: WARNING: javascript handler threw.", message, exception);
                    }
                }
            }
        })
    }

    function _handleMessageFromObjC(messageJSON) {
        console.log('PGJsSDK call _handleMessageFromObjC');
        if (receiveMessageQueue) {
            receiveMessageQueue.push(messageJSON);
        } else {
            _dispatchMessageFromObjC(messageJSON);
        }
    }

    window.WebViewJavascriptBridge = {
        init: init,
        send: send,
        registerHandler: registerHandler,
        callHandler: callHandler,
        _fetchQueue: _fetchQueue,
        _handleMessageFromObjC: _handleMessageFromObjC,
        _handleWebShare: function (res) {
            if (!res) {
                throw new Error('param needed in _handleWebShare');
            }
            ;
            console.log('PGJsSDK call _handleWebShare');
            if (PGinterfaces) {
                PGinterfaces._invokeWebShare.call(priviteKey, res);
            }
            ;
        }
    }

    var doc = document;
    if (browser.versions.ios) {
        _createQueueReadyIframe(doc);
    }
    ;
    var readyEvent = doc.createEvent('Events');
    readyEvent.initEvent('PGJsSDK', "", "");
    readyEvent.bridge = WebViewJavascriptBridge;
    readyEvent.priviteKey = priviteKey;
    doc.dispatchEvent(readyEvent);
})();


(function () {
    window.PG = {};

    var a = window.PG;

    a.Promise = window.PGPromise;
    a.server = window.PGServer;

    var bridge = {};

    a.config = {
        mode: 'dev',
        channel: 'wx',
        appName: '',
        WXRegisterUrl: 'http://activity.camera360.com/wechat/oauth/GetSha1Str',
        debug: false
    };

    function _consoleLogWithSocket(msg) {
        $.ajax({
            url: 'http://activity-ktv.camera360.com:3000',
            type: 'GET',
            dataType: 'json',
            data: {data: msg}
        })
            .done(function () {

            })
            .fail(function () {

            });

    }

    a.log = function (msg) {
        if (this.config.debug && this.config.mode == 'dev') {
            //_consoleLogWithSocket(msg);
        }
        ;

    };

    a.setConfig = function (params) {

        if ((params instanceof Object)) {

            for (var key in params) {
                this.config[key] = params[key];
            }

        } else {
            throw new Error('setConfig 参数必须是对象');
        }

    };

    a.getConfig = function () {
        return this.config;
    };

    function _registerWX(registerRequestUrl) {
        //a.server.getTicket(registerRequestUrl, {url: window.location.href}, function (res) {
        server(registerRequestUrl, {url: location.href.split('#')[0]}, function (res) {
            if (res.status == 200) {
                configWX(res.data);
            } else {
                a.log('获取票据失败');
            }
        });

        function configWX(data) {
            wx.config({
                debug: false,
                appId: data.appid,
                timestamp: data.timestamp,
                nonceStr: data.noncestr,
                signature: data.sha1Str,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'translateVoice',
                    'startRecord',
                    'stopRecord',
                    'onRecordEnd',
                    'playVoice',
                    'pauseVoice',
                    'stopVoice',
                    'uploadVoice',
                    'downloadVoice',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'getNetworkType',
                    'openLocation',
                    'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'closeWindow',
                    'scanQRCode',
                    'chooseWXPay',
                    'openProductSpecificView',
                    'addCard',
                    'chooseCard',
                    'openCard'
                ]
            });
        };
        wx.error(function (res) {
            if (res.errMsg == 'function not exist') {
                a.log('微信提示：请更新最新版本');
            } else {
                a.log(res);
            }
        });

    };

    function _isWX() {
        return a.config.channel.toLowerCase() == 'wx';
    }

    var b = bridge,
        PGinterfaces = null;

    a.ready = function () {
        return new a.Promise(function (callback) {
            if (_isWX()) {
                _registerWX(a.config.WXRegisterUrl);
                wx.ready(function () {
                    if (callback) callback(bridge);
                });

            } else {
                window.setTimeout(function () {
                    window.PGNative.ready(function (interfaces) {
                        PGinterfaces = interfaces;
                        if (callback) callback(bridge);
                    });
                }, 0);
            }
            //a.server.statistics({type:'visit_home'}).then(function(){});

        });
    }

    b.checkJsApi = function (params) {

        return new a.Promise(function (callback) {

            if (_isWX()) {

                wx.checkJsApi({
                    jsApiList: params.jsApiList,
                    success: function (res) {
                        if (callback) callback({status: 200, message: 'ok', checkResult: res.checkResult});
                    }
                });

            } else {
                PGinterfaces.checkJsApi(params, callback);
            }

        });

    };

    b.showMenuItems = function (params) {

        return new a.Promise(function (callback) {

            if (_isWX()) {

                wx.showMenuItems({
                    success: function (res) {
                        callback({status: 200, message: 'ok'});
                    }
                });

            } else {
                if (!params) {
                    throw new Error('需要菜单列表参数');
                    return;
                }
                ;
                PGinterfaces.showMenuItems(params, callback);
            }

        });
    };

    b.hideMenuItems = function (params) {

        return new a.Promise(function (callback) {

            if (_isWX()) {

                params.success = function (res) {
                    callback({status: 200, message: 'ok'});
                };
                wx.hideMenuItems(params);
            }
        });

    }

    b.chooseImage = function (params) {

        return new a.Promise(function (callback) {

            if (_isWX()) {
                wx.chooseImage({
                    success: function (res) {
                        if ((params instanceof Function) && arguments.length == 1) {
                            params({status: 200, message: 'ok', localIds: res.localIds});
                        } else {
                            callback({status: 200, message: 'ok', localIds: res.localIds});
                        }
                    }
                });

            } else {
                if (!params) {
                    throw new Error('需要图片参数');
                    return;
                }
                ;
                PGinterfaces.chooseImage(params, callback);
            }

        });

    }
    b.chooseC360Image = function (params) {

        return new a.Promise(function (callback) {
            if (!params) {
                throw new Error('需要图片参数');
                return;
            }
            ;
            PGinterfaces.chooseC360Image(params, callback);

        });

    }

    b.uploadImage = function (params) {

        return new a.Promise(function (callback) {

            if (_isWX()) {
                wx.uploadImage({
                    localId: params.localId,
                    isShowProgressTips: 0,
                    success: function (res) {
                        callback({status: 200, message: 'ok', serverId: res.serverId});
                    }
                });

            } else {

                PGinterfaces.uploadImage(params, callback);
            }

        });
    }

    b.downloadImage = function (params) {

        return new a.Promise(function (callback) {

            if (_isWX()) {

                wx.downloadImage({
                    serverId: params.url,
                    isShowProgressTips: 0,
                    success: function (res) {
                        callback({status: 200, message: 'ok', localId: res.localId});
                    }
                });

            } else {

                PGinterfaces.downloadImage(params, callback);
            }

        });

    }

    b.saveImage = function (params) {

        return new a.Promise(function (callback) {

            if (_isWX()) {

                throw new Error('微信不支持saveImage');

            } else {

                PGinterfaces.saveImage(params, callback);
            }

        });

    }

    b.shareImage = function (params) {

        return new a.Promise(function (callback) {

            if (_isWX()) {

                throw new Error('微信不支持shareImage');

            } else {
                PGinterfaces.shareImage(params, callback);
            }

        });

    }
    b.showShareChannelsMenuActionSheet = function (params) {

        return new a.Promise(function (callback) {

            if (_isWX()) {

                throw new Error('showShareChannelsMenuActionSheet');

            } else {

                PGinterfaces.showShareChannelsMenuActionSheet(params, callback);
            }

        });

    }

    b.shareUrl = function (params) {

        return new a.Promise(function (callback) {

            if (_isWX()) {

                throw new Error('shareUrl');

            } else {

                PGinterfaces.shareUrl(params, callback);
            }

        });

    }

    b.aliPay = function (params) {

        return new a.Promise(function (callback) {

            if (_isWX()) {
                throw new Error('微信不支持aliPay');
            } else {
                PGinterfaces.triggerAlipay(params, callback);
            }

        });
    }

    //此接口为js自定义的  和客户端无关
    b.changeShareChanelText = function (params) {

        return new a.Promise(function (callback) {

            if (_isWX()) {
                throw new Error('微信不支持changeShareChanelText');
            } else {
                PGinterfaces.changeShareChanelText(params, callback);
            }

        });
    }

    b.wechatPay = function (params) {

        return new a.Promise(function (callback) {

            if (_isWX()) {
                throw new Error('微信不支持wechatPay');
            } else {
                PGinterfaces.triggerWechatPay(params, callback);
            }

        });
    }

    b.createSignature = function (params) {

        return new a.Promise(function (callback) {

            if (_isWX()) {
                throw new Error('微信不支持createSignature');
            } else {
                PGinterfaces.createSignature(params, callback);
            }

        });
    }

    b.back = function (){
        return new a.Promise(function (callback) {
            if (_isWX()) {
                throw new Error('微信不支持back');
            } else {
                PGinterfaces.back({},callback);
            }
        });
    };

    b.getNativeInfo = function (params) {
        return new a.Promise(function (callback) {

            if (_isWX()) {
                throw new Error('微信不支持getNativeInfo');
            } else {
                PGinterfaces.getNativeInfo(params ? params : {}, callback);
            }

        });
    };

    b.login = function (params) {

        return new a.Promise(function (callback) {

            if (_isWX()) {
                throw new Error('微信不支持login');
            } else {
                PGinterfaces.login(params ? params : {}, callback);
            }
        });
    };

    b.logout = function (params) {

        return new a.Promise(function (callback) {

            if (_isWX()) {
                throw new Error('logout');
            } else {
                PGinterfaces.logout(params ? params : {}, callback);
            }
        });
    };

    b.configToolBar = function (params) {

        return new a.Promise(function (callback) {

            if (_isWX()) {
                throw new Error('configToolBar');
            } else {
                PGinterfaces.configToolBar(params ? params : {}, callback);
            }
        });
    };

    b.configReturnBtn = function (params) {

        return new a.Promise(function (callback) {

            if (_isWX()) {
                throw new Error('configReturnBtn');
            } else {
                PGinterfaces.configReturnBtn(params ? params : {}, callback);
            }
        });
    };

    //iOS 禁止（开启）页面回弹  参数为 0（禁止） 1（开启）
    b.doWebViewEnableBounceVertical = function (params) {

        return new a.Promise(function (callback) {

            if (_isWX()) {
                throw new Error('doWebViewEnableBounceVertical');
            } else {
                PGinterfaces.doWebViewEnableBounceVertical(params ? params : {}, callback);
            }
        });
    };

    b.onWebShareDefault = function (params) {

        return new a.Promise(function (callback) {

            if (_isWX()) {

                var originCallback = null;
                if (params.success) {
                    originCallback = params.success;
                }

                params.success = function (res) {
                    if (originCallback) originCallback(res);
                    //a.server.statistics({type:'share_friend'}).then(function(){});
                };

                wx.onMenuShareAppMessage(params);

            } else {

                var originCallback = null;
                if (params.success) {
                    originCallback = params.success;
                }
                var tmpCallback = function (res) {
                    if (originCallback) originCallback(res);
                    //a.server.statistics({type:'share_friend'}).then(function(){});
                }
                params.callback = tmpCallback;
                PGinterfaces.onWebShareDefault(params);
            }

        });

    }

    b.onWebShareTimeline = function (params) {

        return new a.Promise(function (callback) {

            if (_isWX()) {

                var originCallback = null;
                if (params.success) {
                    originCallback = params.success;
                }

                params.success = function (res) {
                    if (originCallback) originCallback(res);
                    //a.server.statistics({type:'share_circle'}).then(function(){});
                };

                wx.onMenuShareTimeline(params);

            } else {
                var originCallback = null;
                if (params.success) {
                    originCallback = params.success;
                }
                var tmpCallback = function (res) {
                    if (originCallback) originCallback(res);
                    //a.server.statistics({type:'share_circle'}).then(function(){});
                }
                params.callback = tmpCallback;

                PGinterfaces.onWebShareTimeline(params);

            }
        });
    }

    b.prompt = function (params) {

        return new a.Promise(function (callback) {
            if (_isWX()) {
                throw new Error('微信不支持prompt');

            } else {
                PGinterfaces.prompt(params, callback);
            }
        });
    };

})();