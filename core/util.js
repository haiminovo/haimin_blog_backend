const jwt = require('jsonwebtoken');
/***
 *
 */
const findMembers = function (instance, { prefix, specifiedType, filter }) {
    // 递归函数
    function _find(instance) {
        //基线条件（跳出递归）
        if (instance.__proto__ === null) return [];

        let names = Reflect.ownKeys(instance);
        names = names.filter((name) => {
            // 过滤掉不满足条件的属性或方法名
            return _shouldKeep(name);
        });

        return [...names, ..._find(instance.__proto__)];
    }

    function _shouldKeep(value) {
        if (filter) {
            if (filter(value)) {
                return true;
            }
        }
        if (prefix) if (value.startsWith(prefix)) return true;
        if (specifiedType) if (instance[value] instanceof specifiedType) return true;
    }

    return _find(instance);
};

// 颁布令牌
const generateToken = function (uid, scope) {
    const secretKey = global.config.security.secretKey;
    const expiresIn = global.config.security.expiresIn;
    const token = jwt.sign(
        {
            uid,
            scope,
        },
        secretKey,
        {
            expiresIn: expiresIn,
        }
    );
    return token;
};

// 刷新令牌
const refreshToken = function (uid, scope, token) {
    const secretKey = global.config.security.secretKey;
    if (!token || !token.name) {
        throw new global.errs.ParameterException('需要携带token值');
    }
    try {
        jwt.verify(token.name, secretKey);
        return [null, token.name];
    } catch (error) {
        // token 不合法 过期
        if (error.name === 'TokenExpiredError') {
            const newToken = generateToken(uid, scope);
            return [null, newToken];
        } else {
            throw new global.errs.ParameterException(error.message);
        }
    }
};

module.exports = {
    findMembers,
    generateToken,
    refreshToken,
};
