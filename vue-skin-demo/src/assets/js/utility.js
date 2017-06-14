// 验证空对象{}
function isEmptyObject(o) {
    var t;
    for (t in o)
        return !1;
    return !0;
}

// 过滤变速器档位数显示
function filterCarmodelVal(str) {
    if (isNaN(str - 0)) {
        // 转字符串为数字
        return str;
    } else {
        // 拼接中文字符
        return str + '档';
    }
}

// 监听页面滚动设置hellaBg
function hellaBgScroll() {
    let timeout;
    window.onscroll = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            scrollHandle();
        }, 10);
    };

    function scrollHandle() {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let hellaBg = document.querySelector('.hella-bg');
        if (scrollTop <= 20) {
            hellaBg.style.top = 1.7 + 'rem';
            hellaBg.style.borderRadius = 0.1 + 'rem';
        }

        if (scrollTop > 20) {
            hellaBg.style.top = 0;
            hellaBg.style.borderRadius = 0 + 'px';
        }
    }
}


export default {
    isEmptyObject: isEmptyObject,
    filterCarmodelVal: filterCarmodelVal,
    hellaBgScroll: hellaBgScroll
};

