/**
 * @Author XieYang
 * @DateTime 2017/08/11 13:00
 * @Description 拖拽条组件
 */

define(function () {
    $.dragBar = function (options) {
        var o = $.extend(
            {},
            $.dragBar.options,
            options || {}
        )

        /**
         * 检查边界值合法性
         */
        if (o.startVal >= o.endVal
            || isNaN(o.startVal)
            || isNaN(o.endVal)
            || o.startVal < 0
            || o.endVal <= 0
        ) {
            return
        }

        /**
         * 检查拖动条游标值合法性
         */
        if (isNaN(o.lVal)
            || o.lVal >= o.endVal
            || o.lVal >= o.rVal
            || o.lVal < o.startVal
        ) {
            o.lVal = o.startVal
        }

        if (isNaN(o.rVal)
            || o.rVal > o.endVal
            || o.rVal <= o.lVal
            || o.rVal <= o.startVal
        ) {
            o.rVal = o.endVal
        }

        /**
         * DOM对象变量
         */
        var dragBar = $(o.dragBar)
        var dragStart = dragBar.find('.drag-start')
        var dragEnd = dragBar.find('.drag-end')
        var dragShape = dragBar.find('.drag-shape')
        var process = dragBar.find('.drag-bar-process')

        /**
         * 边界值文本标签赋值
         */
        dragStart.text(o.startVal)
        dragEnd.text(o.endVal)

        /**
         * 计算组件最小宽度
         * @type {number}
         */
        var minWidth = Math.ceil(dragStart.width()) + Math.ceil(dragEnd.width()) + 68

        /**
         * 初始化组件宽度
         */
        if (typeof o.width === 'undefined') {
            dragBar.width(minWidth)
            dragShape.width(15)
        } else {
            if (o.width - minWidth < 0) {
                dragBar
                    .width('100%')
                    .html('您设置的控件总宽度过小（当前可设最小值：' + minWidth + 'px）')

                return
            } else {
                dragBar.width(o.width)
                dragShape.width(o.width - minWidth)
            }
        }

        /**
         * 总刻度数
         * @type {number}
         */
        var totalDis = o.endVal - o.startVal

        /**
         * 左游标距离起始刻度的刻度数
         * @type {number}
         */
        var lCurVal = o.lVal - o.startVal

        /**
         * 右游标距离起始刻度的刻度数
         * @type {number}
         */
        var rCurVal = o.rVal - o.startVal

        /**
         * 拖动区域宽度
         * @type {number}
         */
        var shapeWidth = dragShape.width() - 15

        /**
         * 左游标的位置 单位（px）
         * @type {number}
         */
        var lCurPos = shapeWidth / totalDis * lCurVal

        /**
         * 右游标的位置 单位（px）
         * @type {number}
         */
        var rCurPos = shapeWidth / totalDis * rCurVal

        /**
         * 左游标值
         * @type {number}
         */
        var lCurText = Math.ceil(lCurVal + o.startVal)

        /**
         * 右游标值
         * @type {number}
         */
        var rCurText = Math.ceil(rCurVal + o.startVal)

        /**
         * 初始化组件
         */
        process.width(shapeWidth)

        process
            .siblings('.s')
            .css('left', lCurPos)
            .find('.drag-cur')
            .text(lCurText)

        process
            .siblings('.e')
            .css('left', rCurPos)
            .find('.drag-cur')
            .text(rCurText)

        var target = 0
        var tempL
        var tempR

        process.siblings('.s').on('mousedown', function (ev) {
            if (o.drag) {
                var self = $(this)
                var start = self.position().left
                var delta = ev.pageX - start
                var endLeft = process.siblings('.e').position().left

                dragBar.parents().on('mousemove', function (e) {
                    var e = e || window.event
                    var startLeft = self.position().left

                    target = e.pageX - delta
                    target = ( target < 0 ) ? 0 : target
                    target = ( target > endLeft ) ? endLeft : target

                    lCurText = Math.ceil(target / shapeWidth * (o.endVal - o.startVal) + o.startVal)

                    self.css('left', target)
                    process.css({
                        width: endLeft - startLeft,
                        left: startLeft
                    })

                    process
                        .siblings('.s')
                        .find('.drag-cur')
                        .text(lCurText)

                    /**
                     * 防止相同的值多次调用回调函数，造成浏览器负担
                     */
                    if (lCurText !== tempL || rCurText !== tempR) {
                        tempL = lCurText
                        tempR = rCurText

                        o.fun({
                            start: lCurText,
                            end: rCurText
                        }, o.chart)
                    }
                })
            }
        })

        process.siblings('.e').on('mousedown', function (ev) {
            if (o.drag) {
                var self = $(this)
                var start = self.position().left
                var delta = ev.pageX - start
                var startLeft = process.siblings('.s').position().left

                dragBar.parents().on('mousemove', function (e) {
                    var e = e || window.event
                    var endLeft = self.position().left

                    target = e.pageX - delta
                    target = ( target < startLeft ) ? startLeft : target
                    target = ( target > shapeWidth ) ? shapeWidth : target

                    rCurText = Math.ceil(target / shapeWidth * (o.endVal - o.startVal) + o.startVal)

                    self.css('left', target)
                    process.css({
                        width: endLeft - startLeft,
                        left: startLeft
                    })

                    process
                        .siblings('.e')
                        .find('.drag-cur')
                        .text(Math.ceil(rCurText))

                    if (lCurText !== tempL || rCurText !== tempR) {
                        tempL = lCurText
                        tempR = rCurText

                        o.fun({
                            start: lCurText,
                            end: rCurText
                        }, o.chart)
                    }

                })
            }
        })


        dragBar.parents().on('mouseup', function () {
            if (o.drag) {
                dragBar.parents().off('mousemove')
            }
        })

    }

    $.dragBar.options = {
        dragBar: '.drag-bar', //消息框容器
        drag: true, //是否可拖动
        width: undefined, //宽度 （缺省时使用默认宽度：根据控件的内部元素结构及内部元素各自的占位大小算出的最小值）
        startVal: 0, //起始值
        endVal: 100, //终止值
        lVal: 0, //左初始值
        rVal: 0 //右初始值
    }
})