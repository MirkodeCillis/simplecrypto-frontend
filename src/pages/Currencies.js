import React, {useEffect, useState} from 'react';
import ChartViewer from "../components/ChartViewer";
import '../style/style.css';
import {CryptoRepo} from "../services/CryptoRepo";

export default function Currencies() {
    const [cryptos, setCryptos] = useState([]);
    const [colors, setColors] = useState([
        '#FF8829',
        '#6063E2',
        '#C3A734',
        '#004BDB',
        '#000000'
    ])

    useEffect(() => {
        CryptoRepo.getAll().then(res => {
            setCryptos(res.data);
        });
    }, [setCryptos]);

    const printCharts = () => {
        return cryptos.map((crypto, i) => {

            return (
                <div key={i} className="column is-four-fifths-desktop is-four-fifths-mobile is-centered">
                    <ChartViewer title={crypto.nome} data={crypto.history} color={colors[i]}/>
                </div>);
        });
    };

    return (
        <div>
            <span className="titlepage">Il mercato negli ultimi 3 gironi</span>
            {printCharts()}
        </div>
    );
}
