import React, { useState, useEffect } from 'react'
import Chart from 'react-apexcharts'
import { cryptoService } from '../services/crypto.service.js'
import AtomLoader from './AtomLoader.jsx'
export const AdvancedCharting = () => {

  const [chartData, setChartData] = useState([])

  useEffect(() => {
    fetchChartData()
  }, [])

  const fetchChartData = async () => {
  try {
    const chartData = await cryptoService.getAdvancedChartData()
    setChartData(chartData)
  } catch (error) {
    console.error('Error fetching chart data:', error)
  }
}


  const chartOptions = {
  chart: {
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true,
      },
    },
  },
  xaxis: {
    type: 'datetime',
    labels: {
      style: {
        colors: '#E0E0E0',
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: '#E0E0E0',
      },
      formatter: function (value) {
        return Math.floor(value)
      },
    },
  },
  tooltip: {
    theme: 'dark',
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  grid: {
    borderColor: 'gray',
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    labels: {
      colors: '#E0E0E0',
    },
  },
};

  if (!chartData.length) return (<AtomLoader />)
  return (
    <div className="advanced-charting">
      <h2>Bitcoin and Ethereum price comparison</h2>
      <Chart
        options={chartOptions}
        series={chartData}
        type="line"
        width="100%"
        height="500"
      />
    </div>
  )
}