import {FC, useEffect, useState} from "react";
import {Card, CardContent, styled, Typography} from "@mui/material";
import ApexChart from "react-apexcharts";

import useAuthFetch from "@DL/fetcher";
import {Agent} from "../types";

export const Requests: FC = () => {
  const authFetch = useAuthFetch();
  const Chart = styled(ApexChart)``;
  const [agentsData, setAgentsData] = useState<Agent[]>([]);

  const fetchDataForAgent = async (agentId: string) => {
    try {
      const response = await authFetch(`/stats/agent/environment/${agentId}`);
      const data = await response.json();
      if (data.stats) {
        data.stats.sort((a: any, b: any) => a.label.localeCompare(b.label));
      }
      if (data.environments) {
        data.environments.forEach((env: any) => {
          if (env.stats) {
            env.stats.sort((a: any, b: any) => a.label.localeCompare(b.label));
          }
        });
      }
      return data
    } catch (error) {
      console.error("Failed to fetch data for agent:", agentId, error);
      return null;
    }
  };

  const fetchAllAgentsData = async () => {
    try {
      const response = await authFetch('/agents');
      const { agents } = await response.json();
      const statsPromises = agents.map((agent: { id: string; }) => fetchDataForAgent(agent.id));
      const results = await Promise.all(statsPromises);
      setAgentsData(results.filter(result => result !== null));
    } catch (error) {
      console.error("Failed to fetch agents:", error);
    }
  };

  useEffect(() => {
    fetchAllAgentsData().catch(error => console.error("Failed to fetch agents:", error));
    const interval = setInterval(fetchAllAgentsData, 1200000);
    return () => clearInterval(interval);
  }, []);

  if (agentsData.length === 0) {
    return (
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>No Agent data yet...</Card>
    );
  }

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        {agentsData.map((agent, index) => (
          <div key={index}>
            <Typography variant="h6">{`${agent.name} Stats`}</Typography>
            {agent.environments.map((env, envIndex) => (
              <div key={envIndex}>
                <Typography variant="subtitle1">{env.name}</Typography>
                <Chart
                  options={{
                    xaxis: {
                      categories: env.stats.map(stat => stat.label),
                      labels: {
                        style: {
                          colors: '#8e8da4',
                        },
                      },
                    },
                    yaxis: {
                      title: {
                        text: 'Requests',
                      },
                      labels: {
                        style: {
                          colors: '#8e8da4',
                        },
                      },
                    },
                    chart: {
                      type: 'bar',
                      height: 350,
                      toolbar: {
                        show: false,
                      },
                    },
                    tooltip: {
                      theme: 'dark',
                    },
                    legend: {
                      labels: {
                        colors: '#8e8da4',
                      },
                    },
                  }}
                  series={[
                    { name: 'Requests', data: env.stats.map(stat => stat.request) },
                    { name: 'Errors', data: env.stats.map(stat => stat.error) },
                    { name: 'Successes', data: env.stats.map(stat => stat.success) }
                  ]}
                  type="bar"
                  height={350}
                />
              </div>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Requests;
