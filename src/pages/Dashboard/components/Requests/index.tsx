import {Requests as PerAgent} from './PerAgent'
import {Requests as TotalRequests} from './TotalRequests'
import {alpha, useTheme} from "@mui/material/styles";
import {ApexOptions} from "apexcharts";

// eslint-disable-next-line react-refresh/only-export-components
export function useChartOptions(categories: string[], legend?: boolean): ApexOptions {
  const theme = useTheme()

  const options = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: true,
      },
    },
    colors: [
      theme.palette.primary.main,
      alpha(theme.palette.primary.main, 0.5)
    ],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: 'solid'
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: '50%',
      },
    },
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2,
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true,
      },
      categories: categories,
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value: number) => (value > 0 ? `${value}K` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  }
  if (legend) {
    options.legend = {
      show: true,
    }
  }

  return options
}

export {
  PerAgent,
  TotalRequests
}
