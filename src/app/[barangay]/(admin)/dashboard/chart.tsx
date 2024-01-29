'use client'

import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import dynamic from "next/dynamic";
// import Chart from "react-apexcharts";

// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
// import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


export default function DashboardChart({ data }: { data: Array<number> }) {

  const chartConfig = {
    type: "pie",
    width: 280,
    height: 280,
    series: data,
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#81c784", "#ffb74d", "#ffa726", "#90caf9", "#5c6bc0"],
      legend: {
        show: false,
      },
    },
  };

  return (
    <>
      <Card className="p-10">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
        >
          <div>
            <Typography variant="h6" color="blue-gray">
              Residents Chart
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="mt-4 grid place-items-center px-2">
          <Chart {...chartConfig} />
        </CardBody>
      </Card>
    </>
  );
}