import {alpha, useTheme} from "@mui/material/styles";
import {FC} from "react";
import {Card, CardContent, styled, Typography} from "@mui/material";
import ApexChart from "react-apexcharts";
import {ApexOptions} from "apexcharts";

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
        borderRadius: 5,
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

interface Agent {
  name: string
  requests: number[]
  errors: number[]
}

export const Requests: FC = () => {
  const agents: Agent[] = [{
    name: 'bob',
    requests: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    errors: [10, 20, 15, 25, 20, 30, 25, 35, 30],
  }, {
    name: 'alice',
    requests: [1, 401, 53, 51, 49, 62, 69, 91, 148],
    errors: [10, 20, 15, 25, 20, 30, 25, 35, 30],
  }]

  const chartOptions = useChartOptions(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'])
  const Chart = styled(ApexChart)``

  return (
    <Card sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <CardContent>
        {agents.map((agent, index) => (
          <div key={index}>
            <Typography
              key={`${index}_name`}
              variant={"h6"}>{agent.name} Requests</Typography>
            <Chart
              key={`${index}_chart`}
              options={chartOptions}
              series={[{
                name: 'Requests',
                data: agent.requests,
              }, {
                name: 'Errors',
                data: agent.errors,
              }]}
              type={"bar"}
              height={350} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
