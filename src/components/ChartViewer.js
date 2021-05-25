import { timeParse } from "d3-time-format";
import {useCallback, useEffect, useState} from "react";
import {Line} from "react-chartjs-2";

var parseDate = timeParse("%d/%m/%Y %H:%M");

export default function ChartViewer(props) {
    const [data, setData] = useState([]);
    const [options, setOptions] = useState({
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
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
    }, [props.data]);

    useEffect(() => {
        let data = parseData();
        setData(data);
    }, [setData, parseData]);

    return (
        <Line data={data} optioins={options}/>
    );
}