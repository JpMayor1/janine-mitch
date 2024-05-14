"use client";

import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

// Dynamic import for Chart
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DashboardChart({ data }: { data: Array<number> }) {
    const chartConfig: ApexOptions = {
        chart: {
            type: "pie",
            width: 280,
            height: 280,
            toolbar: {
                show: false,
            },
        },
        labels: ["Residents", "Voters", "PWD", "Non-Voters", "Officials"],
        colors: ["#81c784", "#90caf9", "#5c6bc0", "#ef5350", "#fdd835"],
        legend: {
            show: true,
            position: "bottom",
        },
        dataLabels: {
            enabled: true,
        },
        title: {
            text: "Population Breakdown",
            align: "center",
        },
    };

    return (
        <Card className="p-10">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            >
                <div>
                    <Typography variant="h6" color="blue-gray">
                        Population Chart
                    </Typography>
                </div>
            </CardHeader>
            <CardBody className="mt-4 grid place-items-center px-2">
                <Chart
                    options={chartConfig}
                    series={data}
                    type="pie"
                    width={chartConfig.chart?.width}
                    height={chartConfig.chart?.height}
                />
            </CardBody>
        </Card>
    );
}
