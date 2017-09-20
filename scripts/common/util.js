/**
 * @Author:      baizn
 * @DateTime:    2017-01-17 09:24:27
 * @Description: 通用工具方法
 * @Last Modified By:   baizn
 * @Last Modified Time:    2017-01-17 09:24:27
 */

define(function(require) {
  var baseConfig = require('./base.config')
  var Util = {
    /**
     * 按照比例缩放页面
     */
    zoom: function(){
      var x=window.innerWidth / baseConfig.PAGE_WIDTH
      var y=window.innerHeight / baseConfig.PAGE_HEIGHT

      $('body').css('webkitTransform','scale(' + x + ',' + y + ')')   /* for Chrome || Safari */
      $('body').css('msTransform','scale(' + x + ',' + y + ')')       /* for Firefox */
      $('body').css('mozTransform','scale(' + x + ',' + y + ')')      /* for IE */
      $('body').css('oTransform','scale(' + x + ',' + y + ')')        /* for Opera */  
    },
    /**
     *  @describe [错误提示]
     *  @param    {[type]}   data [提示内容]
     */
    errorTooltip: function(data){
      var errorTpl = require('../../templates/errorDialog.tpl')
      var template = Handlebars.compile(errorTpl)
      var html = template({
        data: data
      }) 
      $('.error-dialog').html(html)
      $('#errorDialog').fadeIn(50)
      //关闭错误提示
      $('#errorDialog').on('click', '.close-model', function(evt){
         evt.stopPropagation()
         evt.preventDefault()
        $('#errorDialog').fadeOut(50)
        $('.error-dialog').html('')
      })
      return
    },
    /**
     * 生成用于匹配URL的正则表达式
     * 
     * @param {string} name 接口名称，特定的关键词
     * 
     * @return 匹配URL的正则表达式
     */
    urlReg: function(name) {
      var protocols = '((https?|s?ftp|irc[6s]?|git|afp|telnet|smb):\\/\\/)?'
      var userInfo = '([a-z0-9]\\w*(\\:[\\S]+)?\\@)?'
      var domain = '([a-z0-9]([\\w]*[a-z0-9])*\\.)?[a-z0-9]\\w*\\.[a-z]{2,}(\\.[a-z]{2,})?'
      var port = '(:\\d{1,5})?'
      var ip = '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}'
      var address = '(\\/\\S*)?'
      var domainType = [protocols, userInfo, domain, port, address, name, address]
      var ipType = [protocols, userInfo, ip, port, address, name, address]

      return new RegExp('^' + domainType.join('') + '$', 'i')
        || new RegExp('^' + ipType.join('') + '$', 'i')
    }
  }

  return Util
})
