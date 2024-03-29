class HttpException extends Error {
  constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
    super()
    this.errorCode = errorCode
    this.code = code
    this.msg = msg
  }
}

class ParameterException extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 400
    this.msg = msg || '错误请求'
    this.errorCode = errorCode || 10000
  }
}

class AuthFailed extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 401
    this.msg = msg || '未经授权'
    this.errorCode = errorCode || 10004
  }
}

class NotFound extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 404
    this.msg = msg || '请求错误'
    this.errorCode = errorCode || 10005
  }
}

class Forbidden extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 403
    this.msg = msg || '禁止访问'
    this.errorCode = errorCode || 10006
  }
}

class Existing extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 412
    this.msg = msg || '未满足前提'
    this.errorCode = errorCode || 10006
  }
}

module.exports = {
  HttpException,
  ParameterException,
  AuthFailed,
  NotFound,
  Forbidden,
  Existing
}
