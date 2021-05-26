import React, {useEffect, useState} from 'react';
import '../style/style.css';
import {useParams} from "react-router-dom";
import {UserRepo} from "../services/UserRepo";
import ChartViewer from "../components/ChartViewer";

export default function Dashboard() {
    const { id } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [history, setHistory] = useState([{id: 0, valore: 0, date: ""}]);
    const [user, setUser] = useState({});

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

    return (
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
    );
}
