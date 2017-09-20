define(function (require) {
    require('mock')
    var util = require('common/util')

    Mock.mock(util.urlReg('barH'), {
        'code': 1,
        'msg': 'success',
        'result': {
            "bar|5": [
                {
                    "name": '@city',
                    "value|1000-80000": 1347
                }
            ]
        }
    })

    Mock.mock(util.urlReg('barV'), {
        'code': 1,
        'msg': 'success',
        'result': {
            "bar|15": [
                {
                    "name": '@city',
                    "value|1000-3000": 1347
                }
            ]
        }
    })
})