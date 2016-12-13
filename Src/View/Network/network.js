import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Network from '../../Containers/Network/Network'


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
        <MuiThemeProvider>
            <Network />  
        </MuiThemeProvider>  
    </Provider>
    ,document.getElementById('root')
)


