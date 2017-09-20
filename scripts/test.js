/**
 * @Author:      baizn
 * @DateTime:    2017-01-17 09:24:27
 * @Description: 测试主JS文件
 * @Last Modified By:   baizn
 * @Last Modified Time:    2017-01-17 09:24:27
 */
define(function(require) {
    require('handlebars')
    require('lodash')
    require('d3')
    var request = require('request')
    var baseConfig = require('baseConfig')
    var pie = require('pie')
    require('pieData')

    var Test = {
        /**
         * 渲染饼图
         * 
         * @param {string} contianer 图表容器
         */
        renderPie: function(container, data) {
            pie.drawCharts(container, data)
        },
        /**
         * 使用模板渲染列表
         * 
         * @param {array} data 列表数据
         * 
         */
        renderList: function(data) {
            var tpl = require('../templates/list.tpl')
            var myTemplate = Handlebars.compile(tpl)
            $('.template').html(myTemplate(data))
        },
        
        init: function() {
            var self = this

            var start = '20171005'
            var end = '20171008'

            var url = baseConfig.list + start + '/' + end
            request.sendAjax(url, function(data) {
                console.log(
                    JSON.stringify(data)
                )
                self.renderList(data)
            })

            
            request.sendAjax(baseConfig.zhifa , function(data) {
                self.renderPie('.pie', data)
            })
        }
    }
    return Test
})