import moment from "moment";
export const options = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'My chart'
    },
    series: [
      {
        data: [1, 2, 1, 4, 3, 6]
      }
    ]
  };

export const lineChart = (startDate, endDate, measurementsValues) =>  {
    return({ 
    chart: {
        type: 'spline',
        scrollablePlotArea: {
            minWidth: 600,
            scrollPositionX: 1
        }
    },

    time: {
        timezone: 'America/Recife'
    },

    title: {
      text: `Gicemia`
    },
  
    yAxis: {
      title: {
        text: 'mg/dl'
      },
      min: 0,
      plotBands: [{
        color: '#10B364', // Color value
        from: 70, // Start of the plot band
        to: 180 // End of the plot band
      }],
    },
  
    xAxis: {
        
      accessibility: {
        rangeDescription: 'Range: 00:00 to 23:99'
      },
      type: 'datetime',
      min: +moment(startDate).startOf('day').format('x'),
      max: +moment(endDate).startOf('day').format('x'),
    },

    tooltip: {
        valueSuffix: ' mg/dl'
    },
  
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
  
    plotOptions: {
        spline: {
            lineWidth: 4,
            states: {
                hover: {
                    lineWidth: 5
                }
            },
            marker: {
                enabled: false
            },
            pointInterval: 3600000, // one hour
        }
    },
  
    series: [{
      name: 'medicao',
      data: measurementsValues,
      color: 'red'
    }],
  
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
    
})
  
}