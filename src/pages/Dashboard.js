import React from 'react';
import '../style/style.css';

export default function Dashboard() {
    return (
        <div style={{
            userSelect: "none",
            textAlign: "center",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)"
        }}>
            <h2 style={{fontSize: "5em"}}>Dove credi di andare? <br/><a href="/rooms">Il divertimento non è qui.</a>
            </h2>
        </div>
    );
}
