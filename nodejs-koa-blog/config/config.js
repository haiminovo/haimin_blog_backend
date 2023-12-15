module.exports = {
  environment: 'dev',
  database: {
    dbName: 'haimin_blog',
    host: 'haiminovo.cn',
    port: 3306,
    user: 'haimin',
    password: 'haimin'
  },
  security: {
    secretKey: "secretKey",
    // 过期时间 1小时
    expiresIn: 60 * 60
  }
}
