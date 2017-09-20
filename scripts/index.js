/**
 * @Author:      baizn
 * @DateTime:    2017-01-17 09:24:27
 * @Description: 测试主JS文件
 * @Last Modified By:   baizn
 * @Last Modified Time:    2017-01-17 09:24:27
 */
define(function(require) {
    require('jquery')
    var test = require('test')
    var util = require('util')
    var Index = {
        init: function() {
            /**
             * 当缩放页面后，进行相应的缩放
             */
            window.addEventListener('resize', function(){
                util.zoom()
            })

            util.zoom()
            
            test.init()
            console.log('dom', $('body'))
        }
    }
    return Index
})