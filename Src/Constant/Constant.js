let INNERT_URL = 'http://k-inner-report.404mzk.com/' ,
    CONSTANT = {
    //INNERT_URL: 'http://k-inner-report.404mzk.com/',
    PAGESIZE: 20,
    URL: {
        LOADTIME_QUERY: INNERT_URL + 'v1/Creator_Loadtime_Controller/query',
        NETWORK_QUERY: INNERT_URL + 'v1/Creator_Network_Controller/query',
        ERROR_QUERY: INNERT_URL + 'v1/Creator_Error_Controller/query',
        SITE_QUERY: INNERT_URL + 'v1/Creator_Site_Controller/query',
        LOAD_LOADTIME_CHART: INNERT_URL + 'v2/Chart_Controller/line',
        LOAD_NETWORK_CHART: INNERT_URL + 'v2/Chart_Controller/network_chart',
        LOAD_ERROR_CHART: INNERT_URL + 'v2/Chart_Controller/error_chart',
        AUTHENTICATION_SITE: INNERT_URL + 'v2/Site_Controller/authentication_site'
    },
    TEST_URL: 'http://mac.k-report.404mzk.com',
    PRODUCTION_URL: 'http://k-report.404mzk.com'

}

export default CONSTANT