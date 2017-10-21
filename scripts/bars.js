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
        bar1: function (data) {
            var config = {
                sharpOrient: 'y',
                width: '100%',
                height: '100%',
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
                                y: -37 / 2 + 34 / 2   // -37/2 为自身高度的一半，34/2为柱状条size的一半
                            },
                            sort: 1
                        }
                    },
                    gradient: {
                        id: 'gra-t-l',
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
                            'stroke-width': 0
                        }
                    },
                    gridLine: {
                        show: false
                    },
                    tickPadding: 100
                }
            }
            bar.render('bar1', data, config)
        },

        /**
         * bar-v
         *
         * @param {Object} data 列表数据
         *
         */
        bar2: function (data) {
            var config = {
                sharpOrient: 'y',
                width: '100%',
                height: '100%',
                animation: {
                    ease: 'out'
                },
                padding: {
                    top: 50,
                    right: 70,
                    bottom: 100,
                    left: 150
                },
                itemStyle: {
                    size: 12,
                    textStyle: {
                        show: true,
                        spacing: 10,
                        color: '#10dec3',
                        fontSize: 16
                    },
                    gradient: {
                        id: 'gra-t-r',
                        color: {
                            start: '#b4e5df',
                            end: '#10dec3'
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
                    innerTickSize: 0,
                    outerTickSize: 0,
                    scale: 'sqrt',
                    ticks: 5,
                    axisLine: {
                        style: {
                            'fill': 'none',
                            'stroke': '#4b4f89',
                            'stroke-width': 1
                        },
                        textStyle: {
                            'font-size': 16,
                            'fill': '#7d96de',
                            'font-family': '微软雅黑',
                            'stroke': 'none',
                            'stroke-width': 0
                        }
                    },
                    gridLine: {
                        style: {
                            'stroke': '#181c3a',
                            'stroke-width': 2
                        }
                    },
                    tickPadding: 15,
                    domainStart: true,
                    bufferAxis: true
                },
                yAxis: {
                    zero: 0.5,
                    end: 0.5,
                    innerTickSize: 0,
                    outerTickSize: 0,
                    axisLine: {
                        style: {
                            fill: 'none',
                            stroke: '#363963',
                            'stroke-width': 1
                        },
                        textStyle: {
                            'font-size': 18,
                            fill: '#8a9bd4',
                            'font-family': '微软雅黑',
                            stroke: 'none',
                            'stroke-width': 0
                        }
                    },
                    gridLine: {
                        style: {
                            'stroke-dasharray': '4 4 8 4',
                            'stroke-width': 1,
                            'stroke': '#3a4674'
                        }
                    },
                    tickPadding: 20
                }
            }
            bar.render('bar2', data, config)
        },

        /**
         * bar-v
         *
         * @param {Object} data 列表数据
         *
         */
        bar3: function (data) {
            var config = {
                sharpOrient: 'x',
                width: '100%',
                height: '100%',
                animation: {
                    ease: 'out-in'
                },
                padding: {
                    top: 50,
                    right: 20,
                    bottom: 100,
                    left: 70
                },
                itemStyle: {
                    size: 24,
                    textStyle: {
                        show: true,
                        spacing: 10,
                        color: '#7e954d',
                        fontSize: 16
                    },
                    gradient: {
                        id: 'gra-b-l',
                        color: {
                            start: '#8b9478',
                            end: '#7e954d'
                        },
                        opacity: {
                            start: 1,
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
                            'font-size': 16,
                            'fill': '#7d96de',
                            'font-family': '微软雅黑',
                            'stroke': 'none',
                            'stroke-width': 0
                        }
                    },
                    gridLine: {
                        style: {
                            'stroke': '#181c3a',
                            'stroke-width': 2
                        }
                    },
                    tickPadding: 16
                },
                yAxis: {
                    innerTickSize: 6,
                    outerTickSize: 6,
                    scale: 'pow',
                    axisLine: {
                        style: {
                            fill: 'none',
                            stroke: '#363963',
                            'stroke-width': 2
                        },
                        textStyle: {
                            'font-size': 16,
                            fill: '#8a9bd4',
                            'font-family': '微软雅黑',
                            stroke: 'none',
                            'stroke-width': 0
                        }
                    },
                    gridLine: {
                        style: {
                            'stroke-dasharray': '4 4 8 4',
                            'stroke-width': 1,
                            'stroke': '#3a4674'
                        }
                    },
                    tickPadding: 20,
                    ticks: 6
                }
            }
            bar.render('bar3', data, config)
        },

        /**
         * bar-v
         *
         * @param {Object} data 列表数据
         *
         */
        bar4: function (data) {
            var config = {
                sharpOrient: 'x',
                width: '100%',
                height: '100%',
                animation: {
                    ease: 'out-in'
                },
                padding: {
                    top: 50,
                    right: 20,
                    bottom: 100,
                    left: 150
                },
                itemStyle: {
                    size: 45,
                    textStyle: {
                        show: true,
                        spacing: 10,
                        color: '#291ecc',
                        fontSize: 16
                    },
                    gradient: {
                        id: 'gra-b-r',
                        color: {
                            start: '#291ecc',
                            end: '#31c3dd'
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
                            'font-size': 16,
                            'fill': '#7d96de',
                            'font-family': '微软雅黑',
                            'stroke': 'none',
                            'stroke-width': 0
                        }
                    },
                    gridLine: {
                        style: {
                            'stroke': '#181c3a',
                            'stroke-width': 2
                        }
                    },
                    tickPadding: 20
                },
                yAxis: {
                    zero: 0.5,
                    end: 0.5,
                    innerTickSize: 6,
                    outerTickSize: 6,
                    scale: 'sqrt',
                    axisLine: {
                        style: {
                            fill: 'none',
                            stroke: '#363963',
                            'stroke-width': 2
                        },
                        textStyle: {
                            'font-size': 18,
                            fill: '#8a9bd4',
                            'font-family': '微软雅黑',
                            stroke: 'none',
                            'stroke-width': 0
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
            bar.render('bar4', data, config)
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

            request.sendAjax(baseConfig.data + 'bar1', function (data) {
                if (data && data.bar) {
                    self.bar1(data.bar)
                }
            })

            request.sendAjax(baseConfig.data + 'bar2', function (data) {
                if (data && data.bar) {
                    self.bar2(data.bar)
                }
            })

            request.sendAjax(baseConfig.data + 'bar3', function (data) {
                if (data && data.bar) {
                    self.bar3(data.bar)
                }
            })

            request.sendAjax(baseConfig.data + 'bar4', function (data) {
                if (data && data.bar) {
                    self.bar4(data.bar)
                }
            })
        }
    }
})