import React, {useEffect, useState} from 'react';
import '../style/style.css';
import {useParams} from "react-router-dom";
import {UserRepo} from "../services/UserRepo";
import ChartViewer from "../components/ChartViewer";
import {useAuth} from "../app/auth";

export default function Dashboard() {
    const auth = useAuth();
    const { id } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [history, setHistory] = useState([]);
    const [user, setUser] = useState({});
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
        UserRepo.get(id).then(res => {
            setHistory(res.data.historyWallet);
            setUser(res.data);
            setLoading(false);
        });
    }, [setHistory, setUser, id]);

    if (isLoading)
        return (
            <div>
                <span className="titlepage">Caricamento in corso...</span>
            </div>
        );

    const printAssets = () => {
        return user.investments.map((crypto, i) => {

            return (
                <div key={i} className="column is-one-fifths-desktop is-four-fifths-mobile is-centered">
                    <div className="asset-tile">
                        <div className="crypto-title">
                            <img src={`/img/${crypto.cryptocurrency.nome}-logo.png`} alt={`${crypto.cryptocurrency.nome} Logo`}/>
                            <span className="crypto-name" style={{color: colors[crypto.cryptocurrency.id]}}>{crypto.cryptocurrency.nome}</span>
                        </div>
                        <span className="crypto-value">Quantità: {crypto.importo}</span>
                    </div>
                </div>);
        });
    };

    const buyAssets = () => {
        if (auth.user.id === parseInt(id))
            return (<div>diocaasdsad</div>);
        else
            return (<div>No buono</div>);
    };

    return (
        <div>
            <div>
                <span className="titlepage">Investimento di {user.username} negli ultimi 3 giorni</span>
                <div className="charts-container">
                    <div className="column is-three-fifths-desktop is-four-fifths-mobile is-centered">
                        <div className="crypto-title">
                        <span className="crypto-value">Valore attuale: {history.map(value => {
                            return (
                                <span>{value.valore}</span>
                            );
                        })[ history.length -1 ]}€</span>
                        </div>
                        <ChartViewer title={user.username} data={history.map(value => {
                            return {
                                valore: value.valore,
                                date: value.date
                            };
                        })} color={'#0F6FFF'}/>
                    </div>
                </div>
            </div>
            <div className="assets-container">
                <span className="titlepage">Asset attuali</span>
                {printAssets()}
                {buyAssets()}
            </div>
        </div>
    );
}
