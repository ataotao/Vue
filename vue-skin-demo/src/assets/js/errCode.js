//code码返回错误提示
export default function (code) {
    var codeNum = parseInt(code, 10);
    switch (codeNum) {

    case 10001:
        return '系统错误';

    case 10002:
        return 'API接口不存在';

    case 10003:
        return 'API请求参数错误';

    case 10004:
        return '数据库连接错误';

    case 10005:
        return '启动事务错误';

    case 10006:
        return '提交事务错误';

    case 10007:
        return '服务调用错误';

    case 10008:
        return '增加记录失败';

    case 10009:
        return '删除数据失败';

    case 10010:
        return '更新数据失败';

    case 10011:
        return '查询数据失败';

    default:

        switch (true) {

        case codeNum > 1 && codeNum <= 3000:
            return 'Mysql sql执行错误';

        case codeNum > 20000 && codeNum <= 20200:
            return '登录失败';

        case codeNum > 20200 && codeNum <= 20400:
            return '注册失败';

        case codeNum > 20400 && codeNum <= 20600:
            return '账号认证失败';

        case codeNum > 20600 && codeNum <= 20800:
            return '厂商后台管理服务错误';

        case codeNum > 20800 && codeNum <= 21000:
            return '厂商用户端服务错误';

        case codeNum > 21000 && codeNum <= 21200:
            return '搜配管理后台服务错误';

        default:
            return '系统错误请刷新重试';

        }
    }
}
