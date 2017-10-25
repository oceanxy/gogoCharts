/**
 * @Author XieYang
 * @DateTime 2017-08-08 14:26
 * @Description 入口文件
 */
define(function (require) {
    require('jquery')

    var line = require('../charts/lines.js')
    require('./dragBar.js')

    var lineChart
    /**
     * xc 拖动选框时，保存x轴临时差值的变量
     * xm 拖动选框时，x轴实时的差值
     * x1 拖动起始点的x坐标
     * x2 拖动终止点的x坐标
     */
    var xc, xm, x1, x2
    var tagData = []
    var image = '../images/lineChart/del.png'
    /** 选框状态
     * @type {boolean}
     */
    var status = true

    return {
        /**
         * 初始化组件
         */
        init: function () {
            lineChart = new line()

            /**
             * 初始化图表
             */
            lineChart
                .setContainer('.chart')
                .setSize(1366, 500)

            /**
             * 重载图表数据
             */
            $('#switch').on('click', function () {
                lineChart
                    .setData()
                    .render()
            })

            var i = 0, k
            var btnTxt = ['clear auto switch', 'auto switch data']
            var intv
            /**
             * 自动连续重载数据
             */
            $('#autoSwitch').on('click', function () {
                if ((k = i++ % 2) !== 0) {
                    clearInterval(intv)
                } else {
                    intv = setInterval(function () {
                        lineChart
                            .setData()
                            .render()
                    }, 250)
                }
                $(this).text(btnTxt[k])
            })

            /**
             * 渲染图表
             */
            lineChart.render()

            this.dragToSelect()

            this.event()
            this.loadTag()
            this.saveTag()
            this.clearTag()

            $.dragBar({
                dragBar: ".drag-bar",
                width: 1366,
                startVal: 0,
                endVal: 100,
                lVal: 0,
                rVal: 100,
                chart: lineChart,
                status: status,
                fun: function (curValue) {
                    console.log(curValue)
                    lineChart
                        .setX(curValue.start, curValue.end)
                        .render()

                    if(status){
                        lineChart.renderRect(tagData)
                    }
                }
            });
        },
        /**
         * 加载tag
         */
        loadTag: function () {
            $('#loadTag').on('click', function () {
                status = true
                var saved = true
                $('svg .tag').each(function (i, e) {
                    if (!$(e).is('.saved')) {
                        saved = false
                        return false
                    }
                })

                if (tagData.length > 0) {
                    if (!saved && !confirm('当前图表上有未保存的tag，是否继续加载？')) {
                        return
                    }
                    load()
                } else {
                    alert('无数据可加载')
                }
            })

            function load() {
                //TODO 获取数据

                //假如这里获取到数据了
                //使用变量tagData
                lineChart.renderRect(tagData)
            }
        },
        /**
         * 保存tag
         */
        saveTag: function () {
            $('#saveTag').on('click', function () {
                if (tagData.length > 0) {
                    d3
                        .select('svg')
                        .selectAll('.tag')
                        .classed('saved', true)

                    alert('保存成功')
                } else {
                    alert('无数据可保存')
                }


                //TODO 保存tag数据到数据库
            })
        },
        /**
         * 清除全部tag
         */
        clearTag: function () {
            $('#clearTag').on('click', function () {
                status = false
                if ($('svg .tag').length > 0) {
                    if ($('svg .tag:not(.saved)').length > 0) {
                        if (confirm('当前图表上有未保存的tag，是否清除全部tag？')) {
                            clear()
                        }
                    } else {
                        clear()
                    }
                } else {
                    alert('当前没有可清除的tag')
                }
            })

            function clear() {
                $('svg .tag').remove()
            }
        },
        /**
         * 事件
         */
        event: function () {
            /**
             * 输入tag后的按键处理
             */
            $('#guide input').on('keydown', function (e) {
                var theEvent = e || window.event;
                var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
                if (code === 13) {
                    $(this).blur()
                    return false
                } else if (code === 27) {
                    $('#guide input')
                        .val('').hide()
                        .parent().hide()
                }
                return true
            })

            /**
             * 删除tag
             */
            $('svg').on('click', "image", function () {
                $(this).parent().remove()
                tagData = _.dropWhile(
                    tagData,
                    {id: $(this).parent().attr('id')}
                )
            })
            /**
             * tag框失去焦点后的处理
             */
            $('#guide input').blur(function () {
                if (!$(this).val()) {
                    $(this).focus()
                } else {
                    var time = new Date().getTime()
                    var color = $('#rectColor').val()
                    var temp

                    temp = xc < 0 ? x2 : x1
                    x2 = xc < 0 ? x1 : x2
                    x1 = temp
                    xc = Math.abs(xc)

                    x1 = lineChart.xV(x1)
                    x2 = lineChart.xV(x2)
                    xc = lineChart.xV(xc)

                    $(this).parent().css({
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    }).hide()

                    tagData.push({
                        id: 'n' + time,
                        x1: x1,
                        x2: x2,
                        tagName: $(this).val(),
                        color: color,
                        time: time,
                        delIcon: image
                    })

                    lineChart.renderRect(tagData)

                    $(this).val('').hide()
                }
            })
        },
        /**
         * 执行选框
         */
        dragToSelect: function () {
            $(document).on('mouseover', function (e) {
                e = e || window.event
                if (e.ctrlKey) {
                    $('svg').css('cursor', 'move')
                } else {
                    $('svg').css('cursor', 'crosshair')
                }
            })
            $(document).on('mousedown', function (e) {
                e = e || window.event
                var target = e.target || e.srcElement;

                if ((target.tagName === 'svg' || $(target).closest('svg').length)
                    && !$('#guide input').val()
                ) {
                    x1 = e.offsetX

                    $('#guide').hide()
                    $('#guide input').hide()

                    $('#guide').css({
                        top: $('svg').offset().top + lineChart.xStart(),
                        left: x1 - $('.chart')[0].scrollLeft,
                        width: 0,
                        height: lineChart.getQuadrantHeight()
                    }).show()

                    $(document).on('mousemove', function (ev) {
                        ev = ev || window.event

                        ev.offsetX === 0
                            ? xm = ev.pageX - $('svg').offset().left
                            : xm = ev.offsetX

                        xc = xm - x1

                        if (xc > 0) {
                            $('#guide').css({
                                width: xc,
                                left: x1
                            })
                        } else if (xc < 0) {
                            $('#guide').css({
                                width: -xc,
                                left: xm
                            })
                        }
                    })

                    $(document).on('mouseup', function (eu) {
                        eu = eu || window.event
                        x2 = eu.offsetX

                        if (!isNaN(xm) && Math.abs(x2 - x1) > 20) {
                            xm = null
                            $(document).off('mousemove')
                            $(document).off('mouseup')

                            $('#guide input')
                                .css('box-shadow', '0 0 3px 1px' + $('#rectColor').val())
                                .show()
                                .focus()
                        } else {
                            $('#guide input').hide()
                            $('#guide').hide()
                        }

                    })
                }
            })
        }
    }
})
