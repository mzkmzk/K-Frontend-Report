import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import App from '../../Containers/App/App'
import Table from '../../Components/Table/Table'

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
         <Router history={browserHistory}>
              <Route path="/" component={App}>
              <Route path="/table" component={Table}>
                  
                  <Route path="/table/:type" component={Table}/>
              </Route>
              
            </Route>
          </Router>  
      </MuiThemeProvider>
    </Provider>
    ,document.getElementById('root')
)


