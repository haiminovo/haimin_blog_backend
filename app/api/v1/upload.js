const qiniu = require('qiniu');
const ACCESS_KEY = 'KJBgmhQI93lcpS1ufOe1t6OwZYpI4TPsUNPPqtdf';
const SECRET_KEY = '22suR-U00kSHzu-OkHxcfZF8pXGkZY-LZz5Tq_Qw';
const mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);
const { Resolve } = require('@lib/helper');
const res = new Resolve();

const Router = require('koa-router');

const router = new Router({
    prefix: '/api/v1',
});

// 获取七牛云上传token
router.get('/oss/token', async (ctx) => {
    const options = {
        scope: 'haiminovo',
        expires: 7200,
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    ctx.response.status = 200;
    const data = {
        upload_token: putPolicy.uploadToken(mac),
    };
    ctx.body = res.json(data);
});

module.exports = router;
