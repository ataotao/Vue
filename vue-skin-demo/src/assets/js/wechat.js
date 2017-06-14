/* eslint-disable no-unused-vars */
var wx = require('weixin-js-sdk');

// 微信登录标识
var wxLogin = /MicroMessenger/i.test(navigator.userAgent),
    appleLogin = /iPhone/i.test(navigator.userAgent);

var wxSdkController = {
    enableAlbum: wxLogin, // 启用相册(1.是否微信登录；2.是否初始化成功)
    enableCamera: wxLogin && appleLogin // 启用拍照(1.是否微信登录；2.是否在黑名单)
};

// 初始化微信接口
function initWechatApi(wxConfig) {
    if (!wxConfig) return;

    wx.config({
        debug: false,
        appId: wxConfig.appid,
        timestamp: wxConfig.timestamp,
        nonceStr: wxConfig.nonceStr,
        signature: wxConfig.signature,
        jsApiList: [
            'checkJsApi',
            'previewImage',
            'chooseImage',
            'uploadImage',
            'onMenuShareTimeline',  //分享到朋友圈
            'onMenuShareAppMessage' //发送给朋友
        ]
    });

    // 初始化功能可放此处
    wx.ready(function () {
        // 检测 API
        wx.checkJsApi({
            jsApiList: [
                'chooseImage',
                'onMenuShareTimeline',
                'onMenuShareAppMessage'
            ],
            success: function (res) {
                // 微信接口控制
                if (wxSdkController.enableAlbum) {
                    wxSdkController.enableAlbum = res.checkResult.chooseImage;
                }
                if (wxSdkController.enableCamera) {
                    wxSdkController.enableCamera = res.checkResult.chooseImage;
                }
                if (!res.checkResult.onMenuShareTimeline || !res.checkResult.onMenuShareAppMessage) {
                    alert('微信版本太低，请升级后再尝试分享功能');
                }
            }
        });
    });

    // 初始化结果
    wx.error(function (res) {
        wxSdkController.enableAlbum = false;
        wxSdkController.enableCamera = false;
    });
}

// 微信预览图片接口
function wxPreviewImage(curSrc, arrSrc) {
    wx.previewImage({
        current: curSrc,
        urls: arrSrc
    });
}

// 微信选择图片接口
function wxChooseImage(selectCount, callback, cancelCallback) {
    var sourceType = ['album'];
    // 控制拍照功能 <暂时开启苹果>
    if (wxSdkController.enableCamera) {
        sourceType.push('camera');
    }
    wx.chooseImage({
        count: selectCount, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: sourceType, // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            callback(res.localIds);
        },

        cancel: function (res) {
            if (cancelCallback) {
                cancelCallback('cancel');
            }
        }
    });
}

// 微信上传图片接口
function wxUploadImage(localIds, callback) {
    var upload = localIds.shift();
    wx.uploadImage({
        localId: upload.localId, // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 0, // 默认为1，显示进度提示
        success: function (res) {
            callback(upload.key, res.serverId);
            // 继续上传
            if (localIds.length > 0) {
                wxUploadImage(localIds, callback);
            }
        }
    });
}

//VIN查询页面分享接口
function wxShareVinPage(siteUrl) {
    //分享到朋友圈
    wx.onMenuShareTimeline({
        title: '我一般不告诉别人~~这可能是最全、最准的VIN查询神器', // 分享标题
        link: siteUrl + '#/home?share=wxShare', // 分享链接
        imgUrl: siteUrl + 'resource/img/share_200.gif', // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
    //分享给朋友
    wx.onMenuShareAppMessage({
        title: '可能是最全、最准的VIN查询神器', // 分享标题
        desc: '汽配店必备VIN码查询神器！覆盖99%的乘用车车架信息，免费查询...', // 分享描述
        link: siteUrl + '#/home?share=wxShare', // 分享链接
        imgUrl: siteUrl + 'resource/img/share_200.gif', // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
}

// 分享
/**
 *  siteUrl 站点路径
 *  shareTitle 分享标题
 *  shareLink 分享链接
 *  shareImgUrl 分享图标
 *  shareDesc 分享描述
 */
function wxSharePage(siteUrl, shareTitle, shareLink, shareImgUrl, shareDesc) {
    //分享到朋友圈
    wx.onMenuShareTimeline({
        title: shareTitle, // 分享标题
        link: siteUrl + shareLink, // 分享链接
        imgUrl: siteUrl + shareImgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
    //分享给微信好友
    wx.onMenuShareAppMessage({
        title: shareTitle, // 分享标题
        desc: shareDesc, // 分享描述
        link: siteUrl + shareLink, // 分享链接
        imgUrl: siteUrl + shareImgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
    // 分享给QQ好友
    wx.onMenuShareQQ({
        title: shareTitle, // 分享标题
        desc: shareDesc, // 分享描述
        link: siteUrl + shareLink, // 分享链接
        imgUrl: siteUrl + shareImgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
}

var wechat = {
    wxLogin: wxLogin,
    initWechatApi: initWechatApi,
    wxPreviewImage: wxPreviewImage,
    wxChooseImage: wxChooseImage,
    wxUploadImage: wxUploadImage,
    wxShareVinPage: wxShareVinPage,
    wxSharePage: wxSharePage
};

module.exports = wechat;
