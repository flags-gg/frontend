import {SxProps, alpha, useTheme} from "@mui/material/styles";
import {FC} from "react";
import {Card, CardContent, styled, Typography} from "@mui/material";
import ApexChart from "react-apexcharts";
import {ApexOptions} from "apexcharts";

export interface RequestsProps {
  chartSeries: {
    name: string;
    data: number[];
  }[]
  sx?: SxProps;
}

function useChartOptions(categories: string[]): ApexOptions {
  const theme = useTheme()

  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false,
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
        borderRadius: 8,
        columnWidth: '50%',
      },
    },
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2,
    },
    theme: {
      mode: theme.palette.mode,
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
        formatter: (value) => (value > 0 ? `${value}K` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  }
}

const Requests: FC<RequestsProps> = ({chartSeries, sx}) => {
  const chartOptions = useChartOptions(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
  const Chart = styled(ApexChart)``

  return (
    <Card sx={sx}>
      <CardContent>
        <Typography variant={"h6"}>Requests</Typography>
        <Chart options={chartOptions} series={chartSeries} type={"bar"} height={350}/>
      </CardContent>
    </Card>
  )
}

export default Requests;
