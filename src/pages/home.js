import React from 'react';

export default function Home() {

    return (
        <div>
            <div className="columns">
                <section className="column is-half-desktop is-full-mobile home-section sect1">
                    <div className="home-container centered">
                        <span className="pretitle sect1">
                            it's just a
                        </span>
                        <div>
                            <img className="title" src="/icons/logo_white.svg" alt="Simplecrypto"/>
                        </div>
                    </div>
                    <div className="img sect1">
                        <img className="title" src="/img/home1.svg" alt="nothing important"/>
                    </div>
                </section>
                <section className="column is-half-desktop is-full-mobile home-section sect2">
                    <div className="home-container centered">
                        <div className="has-text-right caption sect2" style={{marginBottom: "0"}}>
                            Compra criptovalute
                        </div>
                        <div className="has-text-right caption sect2" style={{marginTop: "0"}}>
                            e simula investimenti...
                        </div>
                        <img className="caption" src="/img/home2.svg" alt="nothing interesing"/>
                        <div className="has-text-left caption sect2">
                            ... non dovrai spendere nemmeno un centesimo!
                        </div>
                    </div>
                </section>
            </div>
            <div className="columns">
                <section className="column is-half-desktop is-full-mobile home-section sect3">
                    <div className="home-container centered">
                        <div className="has-text-right caption sect2">
                            Investi e metti in atto le tue strategie
                        </div>
                        <img className="caption" src="/img/home3.svg" alt="nothing interesing"/>
                        <div className="has-text-left caption sect2">
                            senza rischiare i tuoi soldi.
                        </div>
                    </div>
                </section>
                <section className="column is-half-desktop is-full-mobile home-section sect4">
                    <div className="home-container centered">
                        <div className="has-text-right caption sect2" style={{marginBottom: "0"}}>
                            Parla delle tue idee
                        </div>
                        <div className="has-text-right caption sect2" style={{marginTop: "0",marginBottom: "0"}}>
                            o di come sta andando
                        </div>
                        <div className="has-text-right caption sect2" style={{marginTop: "0"}}>
                            il tuo investimento
                        </div>
                        <img className="caption" src="/img/home4.svg" alt="nothing interesing"/>
                        <div className="has-text-left caption sect2">
                            in una community di migliaia di utenti!
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
