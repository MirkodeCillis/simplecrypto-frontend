import React from "react";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import CandyTheme from "fusioncharts/themes/fusioncharts.theme.candy";
import ReactFC from "react-fusioncharts";

ReactFC.fcRoot(FusionCharts, TimeSeries, CandyTheme);

const jsonify = res => res.json();
const dataFetch = fetch(
    "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/y-axis-on-right-side-data.json"
).then(jsonify);
const schemaFetch = fetch(
    "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/y-axis-on-right-side-schema.json"
).then(jsonify);

const dataSource = {
    chart: {
        "theme": "candy"
    },
    caption: {
        text: "Sales Analysis"
    },
    subcaption: {
        text: "Grocery"
    },
    yaxis: [
        {
            plot: {
                value: "Grocery Sales Value"
            },
            format: {
                prefix: "$"
            },
            orientation: "right",
            title: "Sale Value"
        }
    ]
};

export default class ChartViewer extends React.Component {
    constructor(props) {
        super(props);
        this.onFetchData = this.onFetchData.bind(this);
        this.state = {
            timeseriesDs: {
                type: "timeseries",
                renderAt: "container",
                width: "600",
                height: "500",
                dataSource
            }
        };
    }

    componentDidMount() {
        this.onFetchData();
    }

    onFetchData() {
        Promise.all([dataFetch, schemaFetch]).then(res => {
            const data = res[0];
            const schema = res[1];
            const fusionTable = new FusionCharts.DataStore().createDataTable(
                data,
                schema
            );
            const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
            timeseriesDs.dataSource.data = fusionTable;
            this.setState({
                timeseriesDs
            });
        });
    }

    render() {
        return (
            <div>
                {this.state.timeseriesDs.dataSource.data ? (
                    <ReactFC {...this.state.timeseriesDs} />
                ) : (
                    "loading"
                )}
            </div>
        );
    }
}
