import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import Index from '../../Containers/Index/Index'


import { configure_index_store } from '../../Store/configure_index_store'

import k_logging from 'k-logging'
import k_report from 'k-report'

const store = configure_index_store()

singleKLogging.setOptions(
  {
    app_key: 'demo',
    open_level : ['info','warn','error'],
    method: ['console','display', ''],
  }
)

 render(
    <Provider store={store}>
        <Index />    
    </Provider>
    ,document.getElementById('root')
)


