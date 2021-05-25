import { timeParse } from "d3-time-format";
import {useCallback, useEffect, useState} from "react";
import {Line} from "react-chartjs-2";
import {Chart} from "chart.js";
const defaults = Chart.defaults;
defaults.plugins.legend.display = false;

let parseDate = timeParse("%d/%m/%Y %H:%M");

export default function ChartViewer(props) {
    const [data, setData] = useState([]);
    const [options] = useState({
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
        plugins: {
            legend: {
                display: false,
            },
        }
    });

    const parseData = useCallback(() => {
        let parsedData = {labels: [], datasets: [{
                label: props.title,
                data: [],
                fill: false,
                backgroundColor: props.color,
                borderColor: props.color,
            }]};

        props.data.forEach((d, i) => {

            let value = {};
            if ( d.date instanceof Date)
                value.x = new Date(d.date.getTime());
            else
                value.x = new Date(parseDate(d.date).getTime());
            value.y = +d.valore;

            parsedData.labels.push(d.date);
            parsedData.datasets[0].data.push(value.y);
        });
        return parsedData;
    }, [props.data, props.color, props.title]);

    useEffect(() => {
        let data = parseData();
        setData(data);
    }, [setData, parseData]);

    return (
        <Line data={data} optioins={options}/>
    );
}