import {FC, useCallback, useEffect, useState} from "react";
import {Box, Typography} from "@mui/material";
import useAuthFetch from "@DL/fetcher";

export const Flags: FC = () => {
  const [lastData, setLastData] = useState<string>(""); // to store the last fetched data
  const authFetch = useAuthFetch();
  const fetchData = useCallback(() => {
    authFetch('/flags')
      .then((response: { json: () => any; }) => response.json())
      .then((data: { flags: any; }) => {
        if (JSON.stringify(data) !== lastData) {
          setLastData(JSON.stringify(data));
        }
        console.info("Flags data", data);
      }).catch((error: any) => {
        console.error("Failed to fetch data:", error);
      });
  }, [authFetch, lastData]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 60000);
    fetchData();

    return () => clearInterval(interval);
  }, [fetchData]);


  console.info("flags", fetchData)

  return (
    <Box>
      <Typography variant={"h4"}>Flags</Typography>
      <Typography>
        Flags are a way to enable or disable features in the application.
      </Typography>
      <Typography>
        You can enable or disable features by clicking on the toggle button.
      </Typography>
    </Box>
  )
}
