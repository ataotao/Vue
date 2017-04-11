// 自定义messages
const messages = {
    after: (field, [target]) => ` ${field}必须在${target}之后`,
    alpha_dash: (field) => ` ${field}能够包含字母数字字符，包括破折号、下划线`,
    alpha_num: (field) => `${field} 只能包含字母数字字符.`,
    alpha_spaces: (field) => ` ${field} 只能包含字母字符，包括空格.`,
    alpha: (field) => ` ${field} 只能包含字母字符.`,
    before: (field, [target]) => ` ${field} 必须在${target} 之前.`,
    between: (field, [min, max]) => ` ${field} 必须在${min} ${max}之间.`,
    confirmed: (field, [confirmedField]) => ` ${field} 不能和${confirmedField}匹配.`,
    date_between: (field, [min, max]) => ` ${field}必须在${min}和${max}之间.`,
    date_format: (field, [format]) => ` ${field}必须在在${format}格式中.`,
    decimal: (field, [decimals] = ['*']) => ` ${field} 必须是数字的而且能够包含${decimals === '*' ? '' : decimals} 小数点.`,
    digits: (field, [length]) => ` ${field} 必须是数字，且精确到 ${length}数`,
    dimensions: (field, [width, height]) => ` ${field}必须是 ${width} 像素到 ${height} 像素.`,
    email: (field) => ` ${field} 必须是有效的邮箱.`,
    ext: (field) => ` ${field} 必须是有效的文件.`,
    image: (field) => ` ${field} 必须是图片.`,
    in: (field) => ` ${field} 必须是一个有效值.`,
    ip: (field) => ` ${field} 必须是一个有效的地址.`,
    max: (field, [length]) => ` ${field} 不能大于${length}字符.`,
    mimes: (field) => ` ${field} 必须是有效的文件类型.`,
    min: (field, [length]) => ` ${field} 必须至少有 ${length} 字符.`,
    not_in: (field) => ` ${field}必须是一个有效值.`,
    numeric: (field) => ` ${field} 只能包含数字字符.`,
    regex: (field) => ` ${field} 格式无效.`,
    required: (field) => `${field} 是必须的.`,
    size: (field, [size]) => ` ${field} 必须小于 ${size} KB.`,
    url: (field) => ` ${field}不是有效的url.`
};

const locale = {
    name: 'zh_CN',
    messages,
    attributes: {}
};

// 自定义验证规则
const mobile = {
    messages: {
        zh_CN: (field, params, data) => {
            return (data && data.message) || '请正确输入手机号码';
        }
    },
    validate: (value) => {
        var condition = value.length == 11 && /^((13[0-9])|(15[012356789])|(17[678])|(18[0-9])|(14[57]))[0-9]{8}$/.test(value);
        var telUrl = 'http://192.168.0.118:11000/api/register/v2.0/buyer/phonenumber/';
        //模拟延迟
        return new Promise(resolve => {
            if (condition) {
                axios.get(telUrl + value)
                    .then(res => {
                        if (res.data.code !== 0) {
                            resolve({
                                valid: false,
                                data: {
                                    message: '此手机号码已经注册'
                                }
                            });
                        }
                    }).catch(err => {
                        resolve({
                            valid: false,
                            data: {
                                message: '网络错误，请刷新重试'
                            }
                        });
                    });
            } else {
                resolve({
                    valid: false,
                    data: {
                        message: '请输入11位的手机号码'
                    }
                });
            }
        });
    }
};

export {
    locale, mobile
};