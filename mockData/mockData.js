define(function (require) {
    require('mock')
    var util = require('common/util')

    Mock.mock(util.urlReg('bar1'), {
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

    Mock.mock(util.urlReg('bar2'), {
        'code': 1,
        'msg': 'success',
        'result': {
            "bar|15": [
                {
                    "name": '@province',
                    "value|1000-3000": 1347
                }
            ]
        }
    })

    Mock.mock(util.urlReg('bar3'), {
        'code': 1,
        'msg': 'success',
        'result': {
            "bar|15": [
                {
                    "name": '@province',
                    "value|1000-3000": 1347
                }
            ]
        }
    })

    Mock.mock(util.urlReg('bar4'), {
        'code': 1,
        'msg': 'success',
        'result': {
            "bar|15": [
                {
                    "name": '@province',
                    "value|1000-3000": 1347
                }
            ]
        }
    })
})