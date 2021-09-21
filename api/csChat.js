import rq from '@/utils/request'

export function getCsChatList(data) {
    return rq.request({
        url: '/csChat/list',
        params: {
          lastUpdated: data
        },
        method: 'GET'
      })
}

export function postMessage(data) {
    return rq.request({
        url: '/csChat/post',
        params: {
          text: data,
        },
        method: 'POST'
      })
}