module.exports = {
    loadtime_option: loadtime_chart_data => {
        return {
            title: {
                text: 'Loadtime'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:  ['DOM加载完成','首屏时间','window加载完成']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : loadtime_chart_data.x_axis_data /*[['周一','周二','周三','周四','周五','周六','周日']*/
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'DOM加载完成',
                    //boundaryGap : false,
                    type:'line',
                    //stack: '总量',
                    //areaStyle: {normal: {}},
                    data: loadtime_chart_data.dom_load_data/*[120, 132, 101, 134, 90, 230, 210]*/
                },
                {
                    name:'首屏时间',
                    //boundaryGap : false,
                    type:'line',
                    //stack: '总量',
                    //areaStyle: {normal: {}},
                    data: loadtime_chart_data.atf_data/*[220, 182, 191, 234, 290, 330, 310]*/
                },
                {
                    name:'window加载完成',
                    //boundaryGap : false,
                    type:'line',
                    //stack: '总量',
                    //areaStyle: {normal: {}},
                    data: loadtime_chart_data.window_loaded_data/*[150, 232, 201, 154, 190, 330, 410]*/
                }
            ]
        }
    }
}