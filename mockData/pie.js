define(function(require) {
    require('mock')
    var util = require('util')
    
    //mock数据
    Mock.mock(util.urlReg('zhifa'), {
        'code': 1,
        'msg': 'success',
        'result|5-10': [
            {
                'name': '@cname',   //中文名称
                'value|1-100': 100   //100以内随机整数
            }
        ]
    })

    /**
     * 什么页面 哪个模块  哪个接口
     */
    Mock.mock(util.urlReg('list'), {
        'code': 1,
        'msg': 'success',
        'result|10-15': [
            {
                'id|5-10': 100,
                 'detail|30-5': '@cname'
            }
        ]
    })
})