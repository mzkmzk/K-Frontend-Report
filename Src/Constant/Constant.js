let INNERT_URL = 'http://k-inner-report.404mzk.com/' ,
    CONSTANT = {
    //INNERT_URL: 'http://k-inner-report.404mzk.com/',
    PAGESIZE: 20,
    URL: {
        LOADTIME_QUERY: INNERT_URL + 'v1/Creator_Loadtime_Controller/query',
        NETWORK_QUERY: INNERT_URL + 'v1/Creator_Network_Controller/query',
        ERROR_QUERY: INNERT_URL + 'v1/Creator_Error_Controller/query',
        LOAD_LOADTIME_CHART: INNERT_URL + 'v2/Chart_Controller/line'
    }
}

export default CONSTANT