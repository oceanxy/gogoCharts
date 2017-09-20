/**
 * @Author: xieyang
 * @DateTime: 2017-01-17 09:24:27
 * @Description: seajs配置文件
 * @LastModifiedBy: xieyang
 * @LastModifiedTime: 2017-09-20
 */

seajs.config({
    paths: {
        //modules: 'sea-modules',
        app: '../scripts',
        common: '../scripts/common',
        charts: '../charts',
        data: '../mockData'
    },
    alias: {
        //util文件
        request: 'common/request.js',
        util: 'common/util.js',

        //基本配置项
        baseConfig: 'common/base.config.js',

        //第三方库文件
        handlebars: 'handlebars.js',
        jquery: 'jquery.min.js',
        d3: 'd3.v3.min.js',
        echarts: 'echarts.js',

        //图表文件
        barChart: 'charts/bars',

        //mock数据支持文件
        mockData: 'data/mockData'
    }
})