import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import App from '../../Containers/App/App'
import All_Charts from '../../Components/All_Charts/All_Charts'
import Network from '../../Components/Network/Network'
import Loadtime from '../../Components/Loadtime/Loadtime'
import Error from '../../Components/Error/Error'


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
                <IndexRoute component={All_Charts} />
                 <Route path="/all_charts" component={All_Charts}/>
                <Route path="/loadtime" component={Loadtime}/>
                <Route path="/network" component={Network}/>
                <Route path="/error" component={Error}/>
                
              
            </Route>
          </Router>  
      </MuiThemeProvider>
    </Provider>
    ,document.getElementById('root')
)


