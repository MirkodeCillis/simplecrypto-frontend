import React, {useEffect, useState} from "react";
import {CryptoRepo} from "../services/CryptoRepo";

export default function BuynSell(props) {
    const [cryptos, setCryptos] = useState([]);
    const [colors] = useState([
        '',
        '#FF8829',
        '#6063E2',
        '#C3A734',
        '#A800E6',
        '#004BDB',
        '#000000'
    ]);

    useEffect(() => {
        CryptoRepo.getAll().then(res => {
            setCryptos(res.data);
        });
    }, [setCryptos]);

    const printAssets = () => {
        return cryptos.map((crypto, i) => {
            if (crypto.id === 7) return;

            return (
                <div key={i} className="column is-one-fifths-desktop is-four-fifths-mobile is-centered">
                    <div className="asset-tile-buy">
                        <div className="crypto-title">
                            <img src={`/img/${crypto.nome}-logo.png`} alt={`${crypto.nome} Logo`}/>
                            <span className="crypto-name" style={{color: colors[crypto.id]}}>{crypto.nome}</span>
                        </div>
                        <span className="crypto-value">@ {crypto.valore}€</span>
                        <button className="button is-primary" onClick={() => { modalBuy(crypto.id) }}>Compra</button>
                        <button className="button is-success" onClick={() => { modalSell(crypto.id) }}>Vendi</button>
                    </div>
                </div>
            );
        });
    };

    const modalBuy = (id) => {

    };

    const modalSell = (id) => {

    };

    const buyAsset = (id) => {

    };

    const sellAsset = (id) => {

    };

    return (
        <div>
            <span className="titlepage">Compra o vendi asset</span>
            {printAssets()}
        </div>
    );
}