class Resolve {
  fail(err = {}, msg = '操作失败', code,errorCode = 10001) {
    return {
      code,
      msg,
      err,
      errorCode,
    }
  }

  success(msg = 'success', errorCode = 0, code = 200) {
    return {
      code,
      msg,
      errorCode,
    }
  }

  json(data, msg = 'success', errorCode = 0, code = 200) {
    return {
      code,
      msg,
      data,
      errorCode,
    }
  }
}

module.exports = {
  Resolve
}
