import React, {useEffect, useState} from 'react';
import ChartViewer from "../components/ChartViewer";
import '../style/style.css';
import {CryptoRepo} from "../services/CryptoRepo";

export default function Currencies() {
    const [cryptos, setCryptos] = useState([]);

    useEffect(() => {
        CryptoRepo.getAll().then(res => {
            setCryptos(res.data);
        });
    }, [setCryptos]);

    const printCharts = () => {
        return cryptos.map((crypto, i) => {

            return (
                <div key={i} className="column is-four-fifths-desktop is-four-fifths-mobile is-centered">
                    <ChartViewer title={crypto.name} data={crypto.history}/>
                </div>);
        });
    };

    return (
        <div>
            {printCharts()}
        </div>
    );
}
