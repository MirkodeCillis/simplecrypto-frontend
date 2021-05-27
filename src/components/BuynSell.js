import React, {useEffect, useState} from "react";
import {CryptoRepo} from "../services/CryptoRepo";
import swal from "sweetalert2";
import Cookies from "js-cookie";
import {useAuth} from "../app/auth";
import _ from "underscore";

export default function BuynSell(props) {
    const auth = useAuth();
    const {REACT_APP_COOKIENAME} = process.env;
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
            if (crypto.id === 7) return (<div style={{display: "none"}} />);

            return (
                <div key={i} className="column is-one-fifths-desktop is-four-fifths-mobile is-centered">
                    <div className="asset-tile-buy">
                        <div className="crypto-title">
                            <img src={`/img/${crypto.nome}-logo.png`} alt={`${crypto.nome} Logo`}/>
                            <span className="crypto-name" style={{color: colors[crypto.id]}}>{crypto.nome}</span>
                        </div>
                        <span className="crypto-value">@ {crypto.valore}€</span>
                        <button className="button is-primary" onClick={() => { modalBuy(crypto) }}>Compra</button>
                        <button className="button is-success" onClick={() => { modalSell(crypto) }}>Vendi</button>
                    </div>
                </div>
            );
        });
    };

    const modalBuy = async (crypto) => {
        const swalval = await swal.fire({
            title: `Quanto desideri investire in ${crypto.nome}?`,
            focusConfirm: false,
            html: ' <input class="swal2-input" id="newvalue" type="number" step="0.01" min="0" placeholder="Importo in Euro" /> €',
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: "Annulla",
            cancelButtonColor: 'grey',
            confirmButtonText: 'Investi!',
            background: "#f2f6fa",
            confirmButtonColor: '#0F6FFF',
            preConfirm: () => ({
                importo: document.getElementById('newvalue').value
            })
        });
        let val = swalval && (swalval.value || swalval.dismiss);
        if (val && val.importo ) {
            buyAsset(crypto, val.importo);
        }
    };

    const modalSell = async (crypto) => {
        const userInvestment = _.filter(props.user.investments, (elem) => {
            return elem.cryptocurrency.id === crypto.id
        })[0];

        const swalval = await swal.fire({
            title: `Quanto desideri vendere da ${crypto.nome}?<br>Max: ${(userInvestment.importo * crypto.valore).toFixed(2)}€`,
            focusConfirm: false,
            html: ` <input class="swal2-input" id="sell" type="number" step="0.01" min="0" max="${userInvestment.importo * crypto.valore}" placeholder="Importo in Euro" /> €`,
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: "Annulla",
            cancelButtonColor: 'grey',
            confirmButtonText: 'Vendi!',
            background: "#f2f6fa",
            confirmButtonColor: '#0F6FFF',
            preConfirm: () => ({
                importo: document.getElementById('sell').value
            })
        });
        let val = swalval && (swalval.value || swalval.dismiss);
        if (val && val.importo ) {
            sellAsset(crypto, val.importo);
        }
    };

    const buyAsset = (crypto, importo) => {
        const value = importo / crypto.valore;
        const data = {
            crypto_id: crypto.id,
            user_id: auth.user.id,
            importo: value
        };
        CryptoRepo.buy(data,
            Cookies.get(REACT_APP_COOKIENAME)).then( res => {
                swal.fire({
                    titleText: "Acquisto effettuato!",
                    text: "Aggiorna la pagina per aggiornare gli asset attuali.\nIn seguito verrà conteggiato anche nell'investimento.",
                    icon: "success",
                    background: "#f2f6fa",
                    confirmButtonColor: '#0F6FFF'
                });
            }).catch(err => {
                swal.fire({
                    titleText: "Qualcosa è andato storto :-/",
                    text: "Aggiorna la pagina e riprova.",
                    icon: "error",
                    background: "#f2f6fa",
                    confirmButtonColor: '#0F6FFF'
                });
            });
    };

    const sellAsset = (crypto, importo) => {
        const value = importo / crypto.valore;
        const data = {
            crypto_id: crypto.id,
            user_id: auth.user.id,
            importo: value
        };
        CryptoRepo.sell(data,
            Cookies.get(REACT_APP_COOKIENAME)).then( res => {
            swal.fire({
                titleText: "Vendita effettuata!",
                text: "Aggiorna la pagina per aggiornare gli asset attuali.\nIn seguito verrà conteggiato anche nell'investimento.",
                icon: "success",
                background: "#f2f6fa",
                confirmButtonColor: '#0F6FFF'
            });
        }).catch(err => {
            swal.fire({
                titleText: "Qualcosa è andato storto :-/",
                text: "Aggiorna la pagina e riprova.",
                icon: "error",
                background: "#f2f6fa",
                confirmButtonColor: '#0F6FFF'
            });
        });
    };

    return (
        <div>
            <span className="titlepage">Compra/Vendi Asset</span>
            {printAssets()}
        </div>
    );
}