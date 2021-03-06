module.exports =  {
    LOADTIME: {
      key: 'LOADTIME',
      data: [
        {
          key: 'dom_content_loaded',
          name: 'DOM加载完成',
          style: {width:'100px'}
        },
        {
          key: 'atf',
          name: '首屏时间',
          style: {width:'100px'}
        },
        {
          key: 'window_loaded',
          name: 'window加载完成',
          style: {width:'100px'}
        },
        {
          key: 'referer',
          name: 'Referer',
          style: {}
        },
        {
          key: 'updated_at',
          name: '更新时间',
          style: {width:'140px'}
        },
        {
          key: 'user_agent',
          name: 'UserAgent',
          style: {}
        },
      ]
    },
    NETWORK: {
      key: 'NETWORK',
      data: [
        {
          key: 'duration',
          name: 'Duration',
          style: {width:'100px'}
        },
        {
          key: 'url',
          name: 'url',
          style: {},
          type: 'url'
        },
        {
          key: 'referer',
          name: 'Referer',
          style: {}
        },
        {
          key: 'updated_at',
          name: '更新时间',
          style: {width:'140px'}
        }
      ]
    },
    ERROR: {
      key: 'ERROR',
      data: [
        {
          key: 'message',
          name: 'Message',
          style: {width:'50px'}
        },
        {
          key: 'line',
          name: 'Line',
          style: {width:'50px'}
        },
        {
          key: 'column',
          name: 'Column',
          style:  {}
        },
        {
          key: 'object',
          name: 'Object',
          style: {}
        },
        {
          key: 'url',
          name: 'URL',
          style:  {}
        },
        {
          key: 'referer',
          name: 'Referer',
          style: {}
        },
        {
          key: 'updated_at',
          name: '更新时间',
          style: {width: '140px'}
        },
        {
          key: 'user_agent',
          name: 'UserAgent',
          style: {}
        }
      ]
    },
    LOG: {
      key: 'LOG',
      data: [
        {
          key: 'identifying',
          name: '标识',
          style:  {}
        },
       {
          key: 'message',
          name: 'Message',
          
          style:  {}
        },
        {
          key: 'type',
          name: '类型',
          
          style:  {}
        },
        {
          key: 'referer',
          name: 'referer',
          style:  {}
        },
        {
          key: 'updated_at',
          name: '更新时间',
          style: {width:'140px'}
        },
      ]
    },
    SITE: {
      key: 'SITE',
      data: [
        {
          key: 'host',
          name: '根域名'
        }
      ]
    }    
}