import { FC, useCallback, useEffect, useState } from "react";
import { Card, CardContent, styled, Typography } from "@mui/material";
import ApexChart from "react-apexcharts";
import useAuthFetch from "@DL/fetcher";
import { useChartOptions } from "../index";

export const Requests: FC = () => {
  const authFetch = useAuthFetch();
  const Chart = styled(ApexChart)``;
  const [agentsData, setAgentsData] = useState(null);
  const [lastData, setLastData] = useState(null);
  const initialOptions = useChartOptions([]); // Initialize with empty categories
  const [chartOptions, setChartOptions] = useState(initialOptions);

  const fetchData = useCallback(() => {
    authFetch('/stats/agents')
      .then(response => response.json())
      .then(data => {
        if (JSON.stringify(data) !== lastData) {
          setLastData(JSON.stringify(data));
          setAgentsData(data.agents);
          const categories = data.agents.flatMap(agent => agent.stats.map(stat => stat.month));
          const uniqueCategories = Array.from(new Set(categories));
          setChartOptions(useChartOptions(uniqueCategories)); // Update chart options when data is fetched
        }
      })
      .catch(error => console.error("Failed to fetch data:", error));
  }, [authFetch, lastData]);

  useEffect(() => {
    const interval = setInterval(fetchData, 60000); // Fetch data every minute
    fetchData(); // Also call fetchData initially
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [fetchData]);

  const chartSeries = agentsData ? agentsData.map(agent => ({
    name: agent.name,
    data: agent.stats.map(stat => ({
      x: stat.month,
      y: stat.request,
      error: stat.error
    }))
  })) : [];

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        {chartSeries.length > 0 && chartSeries.map((series, index) => (
          <div key={index}>
            <Typography variant="h6">{series.name} Requests</Typography>
            <Chart
              options={chartOptions}
              series={[{
                name: 'Requests',
                data: series.data.map(data => data.y),
              }, {
                name: 'Errors',
                data: series.data.map(data => data.error),
              }]}
              type="bar"
              height={350}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
