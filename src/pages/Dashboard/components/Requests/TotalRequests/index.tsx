import {FC} from "react";


export const Requests: FC = () => {
  // const authFetch = useAuthFetch();
  // const Chart = styled(ApexChart)``
  // const [chartOptions, setChartOptions] = useState<string[]>([])
  // const [chartSeries, setChartSeries] = useState<{ name: string, data: number[] }[]>([])
  // const [lastData, setLastData] = useState<string>("");

  // const fetchData = useCallback(() => {
  //   authFetch('/stats/agents')
  //     .then((response: { json: () => any; }) => response.json())
  //     .then((data: { agents: any; }) => {
  //       if (JSON.stringify(data) !== lastData) {
  //         setLastData(JSON.stringify(data));
  //         const agents = data.agents;
  //         const labels = new Set<string>();
  //         agents.forEach((agent: { stats: any[]; }) => {
  //           agent.stats.forEach(stat => {
  //             labels.add(stat.label);
  //           });
  //         });
  //         setChartOptions(Array.from(labels));
  //
  //         const series = agents.map((agent: { name: any; stats: any[]; }) => ({
  //           name: agent.name,
  //           data: agent.stats.map(stat => stat.request),
  //         }));
  //         setChartSeries(series);
  //       }
  //     })
  //     .catch((error: any) => {
  //       console.error("Failed to fetch data:", error);
  //     });
  // }, [authFetch, lastData]);
  //
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchData();
  //   }, 60000);
  //   fetchData();
  //
  //   return () => clearInterval(interval);
  // }, [fetchData]);


  // const processedOptions = useChartOptions(chartOptions)
  //
  // return (
  //   <Card sx={{
  //     height: '100%',
  //     display: 'flex',
  //     flexDirection: 'column',
  //   }}>
  //     <CardContent>
  //       <Typography variant={"h6"}>Total Requests</Typography>
  //       <Chart options={processedOptions} series={chartSeries} type={"bar"} height={350}/>
  //     </CardContent>
  //   </Card>
  // )

  return null
}
