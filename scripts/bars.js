/**
 * @Author XieYang
 * @DateTime 2017/9/20 13:26
 * @Description 柱状图入口
 */

define(function (require) {
    require('jquery')
    require('handlebars')

    var request = require('request')
    var baseConfig = require('baseConfig')
    var util = require('util')

    //引入图表
    var bar = require('barChart')

    //引入Mock数据
    require('mockData')

    return {
        /**
         * 渲染模版
         */
        render: function () {

        },

        /**
         * bar-h
         *
         * @param {Object} data 列表数据
         *
         */
        barH: function (data) {
            var config = {
                sharpOrient: 'y',
                width: 1820,
                height: 570,
                padding: {
                    top: 30,
                    right: 100,
                    bottom: 80,
                    left: 260
                },
                itemStyle: {
                    size: 34,
                    components: {
                        image: {
                            attr: {
                                href: '../images/bar-img1.png',
                                width: 80,
                                height: 37,
                                x: -80 - 13, // 80为自身宽度， 13为图片与y轴之间的间距
                                y: -37 / 2 + 6   // -37/2 为自身高度的一半，6为柱状条size的一半
                            },
                            sort: 1
                        }
                    },
                    gradient: {
                        id: 'gra-ADB',
                        color: {
                            start: '#a60a54',
                            end: '#3c31ed'
                        },
                        opacity: {
                            start: 1,
                            end: 1
                        }
                    },
                    textStyle: {
                        show: true,
                        spacing: 10,
                        color: '#a60a54',
                        fontSize: 30
                    }
                },
                xAxis: {
                    zero: 0.5,
                    end: 0.5,
                    innerTickSize: 6,
                    outerTickSize: 6,
                    scale: 'linear',
                    axisLine: {
                        style: {
                            'fill': 'none',
                            'stroke': '#898e9b',
                            'stroke-width': 2
                        },
                        textStyle: {
                            'font-size': 24,
                            'text-anchor': 'middle',
                            'fill': '#5391ff',
                            'stroke': 'none',
                            'font-family': 'digifacewide'
                        }
                    },
                    gridLine: {
                        style: {
                            fill: 'none',
                            stroke: '#898e9b',
                            'stroke-width': 1,
                            'stroke-dasharray': '10 6'
                        }
                    },
                    ticks: 4,
                    tickPadding: 30
                },
                yAxis: {
                    zero: 0.5,
                    end: 0.5,
                    innerTickSize: 6,
                    outerTickSize: 6,
                    axisLine: {
                        show: true,
                        style: {
                            fill: 'none',
                            stroke: '#898e9b',
                            'stroke-width': 1,
                            'stroke-dasharray': '10 6'
                        },
                        textStyle: {
                            'font-size': 24,
                            fill: '#e3e8ec',
                            stroke: 'none',
                            'stroke-width': 0,
                            'text-anchor': 'end'
                        }
                    },
                    gridLine: {
                        show: false
                    },
                    tickPadding: 100
                }
            }
            bar.render('bar-h', data, config)
        },

        /**
         * bar-v
         *
         * @param {Object} data 列表数据
         *
         */
        barV: function (data) {
            var config = {
                sharpOrient: 'x',
                width: 1820,
                height: 530,
                animation: {
                    ease: 'out-in'
                },
                padding: {
                    top: 50,
                    right: 70,
                    bottom: 100,
                    left: 200
                },
                itemStyle: {
                    size: 48,
                    textStyle: {
                        show: true,
                        spacing: 10,
                        color: '#a60a54',
                        fontSize: 30
                    },
                    gradient: {
                        id: 'gra-CNT',
                        color: {
                            start: '#a60a54',
                            end: '#3c31ed'
                        },
                        opacity: {
                            start: 0,
                            end: 1
                        }
                    }
                },
                xAxis: {
                    zero: 0.5,
                    end: 0.5,
                    innerTickSize: 6,
                    outerTickSize: 6,
                    axisLine: {
                        style: {
                            'fill': 'none',
                            'stroke': '#4b4f89',
                            'stroke-width': 2
                        },
                        textStyle: {
                            'font-size': 24,
                            'fill': '#7d96de',
                            'font-family': '微软雅黑',
                            'stroke': 'none',
                            'stroke-width': 0,
                            'text-anchor': 'middle'
                        }
                    },
                    gridLine: {
                        style: {
                            'stroke': '#181c3a',
                            'stroke-width': 2
                        }
                    },
                    tickPadding: 30
                },
                yAxis: {
                    zero: 0.5,
                    end: 0.5,
                    innerTickSize: 6,
                    outerTickSize: 6,
                    axisLine: {
                        style: {
                            fill: 'none',
                            stroke: '#363963',
                            'stroke-width': 2
                        },
                        textStyle: {
                            'font-size': 28,
                            fill: '#8a9bd4',
                            'font-family': '微软雅黑',
                            stroke: 'none',
                            'stroke-width': 0,
                            'text-anchor': 'end'
                        }
                    },
                    gridLine: {
                        style: {
                            'stroke-dasharray': '4 4 8 4',
                            'stroke-width': 1,
                            'stroke': '#3a4674'
                        }
                    },
                    tickPadding: 40,
                    ticks: 6
                }
            }
            bar.render('bar-v', data, config)
        },

        init: function () {
            /**
             * 当缩放页面后，进行相应的缩放
             */
            window.addEventListener('resize', function () {
                util.zoom()
            })

            util.zoom()

            this.getApi()
        },
        /**
         * 调取接口数据
         */
        getApi: function () {
            var self = this

            self.render()

            request.sendAjax(baseConfig.barV, function (data) {
                if (data && data.bar) {
                    self.barV(data.bar)
                }
            })

            request.sendAjax(baseConfig.barH, function (data) {
                if (data && data.bar) {
                    self.barH(data.bar)
                }
            })
        }
    }
})