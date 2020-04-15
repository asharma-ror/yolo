import { makeStyles } from "@material-ui/core/styles"
import PropType from "prop-types"
import React from "react"
import { Bar } from "react-chartjs-2"

const useStyles = makeStyles(() => ({
  chartContainer: {},
}))

const getOptions = data => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: true,
  legend: {
    position: "bottom",
  },
  cornerRadius: 20,
  tooltips: {
    enabled: true,
    mode: "index",
    intersect: false,
    // borderWidth: 1,
    //   borderColor: palette.divider,
    //   backgroundColor: palette.white,
    //   titleFontColor: palette.text.primary,
    //   bodyFontColor: palette.text.secondary,
    //   footerFontColor: palette.text.secondary
  },
  layout: { padding: 0 },
  scales: {
    xAxes: [
      {
        // barThickness: 12,
        // maxBarThickness: 10,
        // barPercentage: 0.5,
        // categoryPercentage: 0.5,
        // ticks: {
        //   fontColor: palette.text.secondary
        // },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          // fontColor: palette.text.secondary,
          beginAtZero: true,
          min: Math.max(
            data.actualPrice.value * 0.7,
            data.lastYear.value * 0.7
          ),
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          // color: palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          // zeroLineColor: palette.divider
        },
      },
    ],
  },
})

const convertData = data => {
  const chartData = {
    datasets: [
      {
        label: "Actual Price",
        backgroundColor: "rgba(255,99,132,1)",
        hoverBackgroundColor: "rgba(255,99,132,0.2)",
        data: [data.actualPrice.value],
      },
      {
        label: "Last Year",
        backgroundColor: "rgba(255,99,132,0.2)",
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        data: [data.lastYear.value],
      },
    ],
  }
  if (data.optimalPrice) {
    chartData.datasets.push({
      label: "Optimal Price",
      backgroundColor: "rgba(132,99,255,1)",
      hoverBackgroundColor: "rgba(132,99,255,0.2)",
      data: [data.optimalPrice.value],
    })
  }
  return chartData
}

export default function BarChart({ data }) {
  const classes = useStyles()
  const barData = convertData(data)
  const barOptions = getOptions(data)
  return (
    <div className={classes.chartContainer}>
      <Bar data={barData} options={barOptions} />
    </div>
  )
}

BarChart.defaultProp = {}

BarChart.propTypes = {
  data: PropType.object,
}
