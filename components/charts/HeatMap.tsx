'use client'
import { ResponsiveHeatMap } from '@nivo/heatmap'

const HeatMap = ({ data /* see data tab */ }) => (
  <ResponsiveHeatMap
    data={data}
    margin={{ top: 100, right: 90, bottom: 30, left: 170 }}
    valueFormat=">-.2s"
    axisTop={{ tickRotation: -45 }}
    axisLeft={{
      legend: 'Benchmark',
      legendOffset: -130,
    }}
    colors={{
      type: 'diverging',
      scheme: 'red_yellow_blue',
      divergeAt: 0.5,
      minValue: 0,
      maxValue: 100,
    }}
    emptyColor="#555555"
    theme={{
      axis: {
        ticks: {
          text: {
            fill: '#ffffff', // axis tick text color
          },
        },
        legend: {
          text: {
            fill: '#ffffff', // axis legend text color
          },
        },
      },
      legends: {
        text: {
          fill: '#ffffff', // legend text color
        },
      },
      labels: {
        text: {
          fill: '#ffffff', // cell label text color
        },
      },
    }}
    tooltip={() => <></>}
  />
)

export default HeatMap
