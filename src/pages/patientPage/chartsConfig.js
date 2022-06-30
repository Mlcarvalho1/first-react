import moment from "moment";

export const columnChart = (measurementsValues) => {

    const getMeasurementGroup = date => {
        const hour = moment(date).format('HH');

        if (hour >= 0 && hour <= 3) {
            return '00-03hr';
        }
        
        if (hour > 3 && hour <= 6) {
            return '03-06hr';
        }
        
        if (hour > 6 && hour <= 9) {
            return '06-09hr';
        }
        
        if (hour > 9 && hour <= 12) {
            return '09-12hr';
        }
        
        if (hour > 12 && hour <= 15) {
            return '12-15hr';
        }

        if (hour > 15 && hour <= 18) {
            return '15-18hr';
        }

        if (hour > 18 && hour <= 21) {
            return '18-21hr';
        }

        return '21-24hr';
    }

    const getArrayAvg = (array) => Math.round(array.reduce((acc, value) => acc + value, 0)/array.length);

    const groupedMeasrumentByHour = measurementsValues.reduce((acc, measurement) => {
        const measurementGroupHour = getMeasurementGroup(measurement[0]);

        return {
            ...acc,
            [measurementGroupHour]: [
                ...acc[measurementGroupHour],
                measurement[1]
            ]
        }
      }, {
        '00-03hr': [],
        '03-06hr': [],
        '06-09hr': [],
        '09-12hr': [],
        '12-15hr': [],
        '15-18hr': [],
        '18-21hr': [],
        '21-24hr': [],
      });

      const measurementsAvg = []
      Object.values(groupedMeasrumentByHour).forEach(arr => {measurementsAvg.push(getArrayAvg(arr))})


    return({
        chart: {
        type: 'column'
    },
    title: {
        text: 'Media glicemica'
    },
    xAxis: {
        
        categories: Object.keys(groupedMeasrumentByHour),
        crosshair: true,
        plotLines: [
            {
                color: 'red',
                dashStyle: 'longdashdot',
                value: 180,
            }
        ],
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Media glicemica: mg/dl'
        },
        plotLines: [{
            color: 'orange',
            value: 180, 
            width: 2 
          },
          {
            color: 'red',
            value: 70,
            width: 2
          }
        ]
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        },
        overflow: 'scroll'
    },
    
    series: [{
        name: 'glicemia mg/dl',
        data: measurementsAvg,
        color: '#00406C'
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
      text: `Glicemia`
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
      min: +moment.utc(startDate).startOf('day').format('x'),
      max: +moment.utc(endDate).startOf('day').format('x'),
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