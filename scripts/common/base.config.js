/**
 * @Author:      baizn
 * @DateTime:    2017-01-17 09:24:27
 * @Description: 公用常量
 * @Last Modified By:   baizn
 * @Last Modified Time:    2017-01-17 09:24:27
 */

define(function (require) {
    var isOnline = false

    // http host
    var onlineApiHost = isOnline
        ? 'http://10.154.16.227:8081/'
        : 'http://cqHyCommonTestUrl.com/'

    // websokcet host
    var onlineWsHost = isOnline
        ? 'ws://10.154.16.227:8081/'
        : 'ws://cqHyCommonTestUrl.com/'

    return {
        PAGE_WIDTH: 1920,
        PAGE_HEIGHT: 1080,

        // mock 接口
        data: onlineApiHost + 'mockData/'

    }

})
