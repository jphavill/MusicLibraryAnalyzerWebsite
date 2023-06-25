import { ChartOptions, ChartScales } from "chart.js";

export const scales: ChartScales = {
    xAxes: [
      {
          position: 'top',
          ticks: {
              maxRotation: 90,
              minRotation: 70,
              beginAtZero: true,
              fontColor: 'white'
          }
      }
  ],
  yAxes: [
    {
        ticks: {
            callback: function(value) {
              let valueS = (value as string)
              if (valueS.length <= 23) {
                return valueS
              }
              return valueS.substring(0, 20) + '...'
            },
            maxRotation: 90,
            minRotation: 0,
            fontColor: 'white'
        }

    }
  ]
  }

export const scalesPercent: ChartScales = {
  xAxes: [
    {
        position: 'top',
        ticks: {
              callback: function(value) {
                return value + '%';
            },
            maxRotation: 90,
            minRotation: 70,
            beginAtZero: true,
            fontColor: 'white'
        }
    }
],
yAxes: [
  {
      ticks: {
          callback: function(value) {
            let valueS = (value as string)
            if (valueS.length <= 23) {
              return valueS
            }
            return valueS.substring(0, 20) + '...'
          },
          maxRotation: 90,
          minRotation: 0,
          fontColor: 'white'
      }

  }
]
}

export const chartOptions: ChartOptions = {
  responsive: true,
  scales: scales,
  maintainAspectRatio: false,
  legend: {
    display: true,
    labels: {
      fontColor: 'white'
    }
   },
};

export const chartOptionsPercent: ChartOptions = {
  responsive: true,
  scales: scalesPercent,
  maintainAspectRatio: false,
  legend: {
    display: true,
    labels: {
      fontColor: 'white'
    }
   },
};

export interface ChartElement {
  _index: number
}

