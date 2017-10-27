/**
 * @Author XieYang
 * @DateTime 2017/08/08 14:26
 * @Description 线图/区域图组件
 */

define(function (require) {
  require('d3')
  
  /**
   * 构造函数
   * @param options 参数列表
   * @constructor
   */
  function LineChart(options) {
    if (!options || !(options instanceof Object)) {
      options = {}
    }
    
    /**
     * 数据
     * @type {*|Array}
     */
    this.data = options.data || this.getData()
    
    /**
     * 容器
     * @type {*|string|string|string|string}
     */
    this.container = options.container
    
    /**
     * 容器宽度
     * @type {string} width 默认
     */
    this.width = options.width
    
    /**
     * 容器高度
     * @type {string} height
     */
    this.height = options.height
    
    /**
     * 边距
     *
     * @type {{
         *      top: number,
         *      right: number,
         *      bottom: number,
         *      left: number
         * }}
     */
    this.margin = {
      top: 30,
      right: 30,
      bottom: 30,
      left: 30
    }
    
    if (options.margin && options.margin.length > 0) {
      for (var i in options.margin) {
        if (options.margin.hasOwnProperty(i)) {
          this.margin[i] = options.margin[i]
        }
      }
    }
    
    /**
     * x轴
     */
    this.x = options.x || d3.scale.linear().domain([0, 100])
    
    /**
     * 定义像素值转换成x轴坐标值的插值器
     */
    this.xV = d3.scale.linear().range([0, 100])
    
    /**
     * x轴刻度数，但d3会根据图表的数据，以这个值为基础自动调整刻度数
     * @type {number}
     */
    this.xTicks = options.xTicks || 100
    
    /**
     * y轴
     */
    this.y = options.y || d3.scale.linear().domain([0, 10])
    
    /**
     * SVG容器
     * @private
     */
    this.svg = null
    
    /**
     * 组件主体元素
     * @private
     */
    this.chart = null
    
    /**
     * 颜色尺度
     *
     * @type {Array}
     */
    this.colors = !options.colors || !options.colors.length
      ? d3.scale.category10()
      : options.colors
    
    /**
     * 缓动
     * "linear", "cubic", "cubic-in-out", "sin", "sin-out", "exp", "circle", "back", "bounce",
     * @type {string}
     */
    this.ease = 'linear'
  }
  
  /**
   * 原型
   */
  LineChart.prototype = {
    /**
     * 构造函数修复
     */
    constructor: LineChart,
    /**
     * 设置x轴域
     * @param start 开始值
     * @param end 结束值
     * @returns {LineChart}
     */
    setX: function (start, end) {
      this.x.domain([start, end])
      this.xV.range([start, end])
      this.xTicks = end - start
      
      this.renderAxes(true)
      
      return this
    },
    /**
     * 设置外容器大小
     * 缺省高度时，高度值等于宽度值
     *
     * @param {number || string} width 容器宽度
     * @param {number || string=} height 容器高度
     * @returns {LineChart}
     */
    setSize: function (width, height) {
      if (arguments.length > 1) {
        this.width = width
        this.height = height
      } else if (arguments.length > 0) {
        this.height = this.width = arguments[0]
      }
      
      if (this.svg) {
        this.svg
          .attr('width', this.width)
          .attr('height', this.height)
      }
      
      return this
    },
    /**
     * 设置容器
     * @param {string} con 容器选择器
     * @returns {LineChart}
     */
    setContainer: function (con) {
      if (!con) {
        this.container = 'body'
      } else {
        this.container = con
      }
      
      return this
    },
    /**
     * 渲染组件
     */
    render: function () {
      if (!this.svg) {
        this.svg = d3.select(this.container)
          .append('svg')
        
        this.setSize(this.width, this.height)
        
        this.renderAxes()
        this.defineChartClip()
      }
      
      this.renderChart()
    },
    /**
     * 渲染坐标轴
     * @param {boolean=} resetX 重绘x轴 默认false
     * @param {boolean=} resetY 重绘y轴 默认false
     */
    renderAxes: function (resetX, resetY) {
      var axesG
      
      if (resetX || resetY) {
        axesG = this.svg
          .select('.axes')
        
        if (resetX) {
          d3.select('svg g.x').remove()
          this.renderXAxis(axesG)
        }
        if (resetY) {
          d3.select('svg g.y').remove()
          this.renderYAxis(axesG)
        }
      } else {
        axesG = this.svg
          .append("g")
          .attr("class", "axes")
        
        this.renderXAxis(axesG)
        this.renderYAxis(axesG)
      }
    },
    /**
     * 渲染X轴
     * @param axesG X轴容器
     */
    renderXAxis: function (axesG) {
      var self = this
      var xAxis = d3.svg.axis()
        .scale(this.x.range([0, this.getQuadrantWidth()]))
        .orient("bottom")
        .ticks(this.xTicks)
      
      this.xV.domain([this.xStart(), this.xEnd()])
      
      axesG.append('g')
        .attr("class", "x axis")
        .attr("transform", function () {
          return "translate(" + self.xStart() + "," + self.yStart() + ")"
        })
        .call(xAxis)
        .selectAll('text')
        .attr("transform", "translate(-10, 10) rotate(-45)")
        .style("text-anchor", "middle")
      
      this.svg
        .selectAll("g.x g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", -this.getQuadrantHeight())
    },
    /**
     * 渲染Y轴
     * @param axesG Y轴容器
     */
    renderYAxis: function (axesG) {
      var self = this
      var yAxis = d3.svg.axis()
        .scale(this.y.range([this.getQuadrantHeight(), 0]))
        .orient("left")
      
      axesG.append("g")
        .attr("class", "y axis")
        .attr("transform", function () {
          return "translate(" + self.xStart() + "," + self.yEnd() + ")"
        })
        .call(yAxis)
      
      this.svg
        .selectAll("g.y g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", this.getQuadrantWidth())
        .attr("y2", 0)
    },
    /**
     * 定义裁剪
     */
    defineChartClip: function () {
      var padding = 5
      
      this.svg
        .append("defs")
        .append("clipPath")
        .attr("id", "body-clip")
        .append("rect")
        .attr("x", 0 - padding)
        .attr("y", 0)
        .attr("width", this.getQuadrantWidth() + 2 * padding)
        .attr("height", this.getQuadrantHeight())
    },
    /**
     * 渲染图表主体
     */
    renderChart: function () {
      if (!this.chart) {
        this.chart = this.svg
          .append("g")
          .attr("class", "chartBody")
          .attr("transform", "translate("
            + this.xStart() + ","
            + this.yEnd() + ")")
          .attr("clip-path", "url(#body-clip)")
      }
      
      this.renderLines()
      
      this.renderAreas()
      
      this.renderDots()
    },
    /**
     * 渲染线图
     */
    renderLines: function () {
      var self = this
      var line = d3.svg.line()
        .x(function (d) {
          return self.x(d.x)
        })
        .y(function (d) {
          return self.y(d.y)
        })
      
      self.chart
        .selectAll("path.line")
        .data(self.data)
        .enter()
        .append("path")
        .style("stroke", function (d, i) {
          return self.colors(i)
        })
        .style('stroke-width', 1)
        .attr("class", "line")
      
      self.chart
        .selectAll("path.line")
        .data(self.data)
        .transition().ease(self.ease)
        .attr("d", function (d) {
          return line(d)
        })
    },
    /**
     * 渲染线图上的圆圈
     */
    renderDots: function () {
      var self = this
      
      this.data.forEach(function (list, i) {
        self.chart.selectAll("circle._" + i)
          .data(list)
          .enter().append("circle")
          .attr("class", "dot _" + i)
        
        self.chart.selectAll("circle._" + i)
          .data(list)
          .style("stroke", function () {
            return self.colors(i)
          })
          .transition().ease(self.ease)
          .attr("cx", function (d) {
            return self.x(d.x)
          })
          .attr("cy", function (d) {
            return self.y(d.y)
          })
          .attr("r", 1)
      })
    },
    /**
     * 渲染选框
     * @param {Array} list 数据
     */
    renderRect: function (list) {
      var self = this
      
      this.svg.selectAll('.tag')
        .data(list)
        .enter()
        .append('g')
        .attr('class', 'tag')
        .each(function (d) {
          d3.select(this)
            .attr('id', 'n' + d.time)
            .append('rect')
          
          d3.select(this)
            .append('text')
          
          d3.select(this)
            .append('image')
          
        })
      
      this.svg.selectAll('.tag')
        .data(list)
        .exit()
        .remove()
      
      this.svg.selectAll('.tag')
        .data(list)
        .each(function (d) {
          d3.select(this)
            .select('rect')
            .attr('y', self.margin.top)
            .attr('height', self.getQuadrantHeight())
            .attr('stroke', d.color)
            .attr('fill', 'none')
            .attr('stroke-width', 1)
            .attr('opacity', 1)
          
          d3.select(this)
            .select('text')
            .attr('y', 20)
            .attr('fill', d.color)
            .style("text-anchor", "middle")
            .style('font-size', '16px')
            .text(d.tagName)
          
          d3.select(this)
            .select('image')
            .attr('width', 24)
            .attr('height', 24)
            .attr('y', 3)
            .attr('href', d.delIcon)
        })
        .transition().ease(this.ease)
        .each(function () {
          d3.select(this)
            .select('rect')
            .attr('x', function (d) {
              return self.x(d.x1) + self.margin.left
            })
            .attr('width', function (d) {
              return self.x(d.x2) - self.x(d.x1)
            })
          
          d3.select(this)
            .select('text')
            .attr('x', function (d) {
              return self.x(d.x1 + (d.x2 - d.x1) / 2) + self.margin.left
            })
          
          d3.select(this)
            .select('image')
            .attr('x', function (d) {
              return self.x(d.x2) + self.margin.left - 20
            })
        })
    },
    /**
     * 渲染面积图
     */
    renderAreas: function () {
      var self = this
      var area = d3.svg.area()
        .x(function (d) {
          return self.x(d.x)
        })
        .y0(self.yStart())
        .y1(function (d) {
          return self.y(d.y)
        })
      
      self.chart.selectAll("path.area")
        .data(self.data)
        .enter()
        .append("path")
        .style("fill", function (d, i) {
          return self.colors(i)
        })
        .attr("class", "area")
      
      self.chart.selectAll("path.area")
        .data(self.data)
        .transition().ease(self.ease)
        .attr("d", function (d) {
          return area(d)
        })
    },
    /**
     * 获取象限宽度
     * @returns {number}
     */
    getQuadrantWidth: function () {
      return $(this.container).find('svg').width() - this.margin.left - this.margin.right
    },
    /**
     * 获取象限高度
     * @returns {number}
     */
    getQuadrantHeight: function () {
      return $(this.container).find('svg').height() - this.margin.top - this.margin.bottom
    },
    /**
     * 获取x轴起点相对位置
     * @returns {number}
     */
    xStart: function () {
      return this.margin.left
    },
    /**
     * 获取y轴起点相对位置
     * @returns {number}
     */
    yStart: function () {
      return $(this.container).find('svg').height() - this.margin.bottom
    },
    /**
     * 获取x轴终点相对位置
     * @returns {number}
     */
    xEnd: function () {
      return $(this.container).find('svg').width() - this.margin.right
    },
    /**
     * 获取y轴终点相对位置
     * @returns {number}
     */
    yEnd: function () {
      return this.margin.top
    },
    /**
     * 获取默认数据
     * @param {boolean=} isNew 是否立即生成新数据 false：返回上一次成功生成的旧数据
     * @param {number=} numberOfSeries 线条数
     * @param {number=} numberOfDataPoint 每条线条的刻度数
     * @returns {Array}
     */
    getData: function (isNew, numberOfSeries, numberOfDataPoint) {
      var DEFAULT_VALUE = {
        isNew: true,
        numberOfSeries: 3,
        numberOfDataPoint: 101
      }
      
      if (arguments.length === 0) {
        isNew = DEFAULT_VALUE.isNew
        numberOfSeries = DEFAULT_VALUE.numberOfSeries
        numberOfDataPoint = DEFAULT_VALUE.numberOfDataPoint
      } else if (arguments.length === 1) {
        if (typeof arguments[0] === 'boolean') {
          isNew = arguments[0]
          numberOfSeries = DEFAULT_VALUE.numberOfSeries
        } else {
          isNew = DEFAULT_VALUE.isNew
          numberOfSeries = arguments[0]
        }
        numberOfDataPoint = DEFAULT_VALUE.numberOfDataPoint
      } else if (arguments.length === 2) {
        if (typeof arguments[0] === 'boolean') {
          isNew = arguments[0]
          numberOfSeries = arguments[1]
          numberOfDataPoint = DEFAULT_VALUE.numberOfDataPoint
        } else {
          isNew = DEFAULT_VALUE.isNew
          numberOfSeries = arguments[0]
          numberOfDataPoint = arguments[1]
        }
      }
      
      var data = []
      
      if (isNew) {
        for (var i = 0; i < numberOfSeries; ++i) {
          data.push(
            d3
              .range(numberOfDataPoint)
              .map(function (i) {
                  return {
                    x: i,
                    y: Math.random() * 10
                  }
                }
              )
          )
        }
      } else {
        for (var k = 0; k < this.data.length; k++) {
          data.push(
            _.slice(this.data[k], numberOfSeries, numberOfDataPoint)
          )
        }
      }
      
      return data
    },
    /**
     * 设置数据
     * @param {Array=} data
     * @returns {LineChart}
     */
    setData: function (data) {
      if (!data) {
        this.data = this.getData()
      } else {
        this.data = data
      }
      
      return this
    }
  }
  
  return LineChart
})
