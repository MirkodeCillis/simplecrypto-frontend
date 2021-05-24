import React, {useState} from "react";
import '../../style/style.css';
import {useAuth} from "../../app/auth";
import {CommunityRepo} from "../../services/CommunityRepo";
import swal from "sweetalert2";
import Cookies from 'js-cookie';

export default function NewComment(props) {
    const {REACT_APP_COOKIENAME} = process.env;
    const auth = useAuth();
    const [comment, setComment] = useState("");
    const [remainingchars, setRemainingChars] = useState(255);

    const writeComment = (event) => {
        setComment(event.target.value);
        setRemainingChars(255 - event.target.value.length);
    };

    const submitComment = () => {
        CommunityRepo.submitComment({
                postId: props.postId,
                message: comment,
                userId: auth.user.id
            },
            Cookies.get(REACT_APP_COOKIENAME)).then(res => {
            swal.fire({
                titleText: "Commento pubblicato!",
                text: "Aggiorna la pagina per vedere il tuo commento sotto il post.",
                icon: "success",
                background: "#f2f6fa",
                confirmButtonColor: '#0F6FFF'
            }).then((res) => {
                setComment("");
            });
        }).catch(err => {
            if (err.response && err.response.status === 400)
                swal.fire({
                    titleText: "Messaggio troppo lungo",
                    text: "Il messaggio è troppo lungo. Ricorda che non deve superare i 255 caratteri!",
                    icon: "error",
                    background: "#f2f6fa",
                    confirmButtonColor: '#0F6FFF'
                });
            else swal.fire({
                titleText: "Qualcosa è andato storto :-/",
                text: "Aggiorna la pagina e riprova.",
                icon: "error",
                background: "#f2f6fa",
                confirmButtonColor: '#0F6FFF'
            });
        });
    };

    return (
        <div className="new-comment">
            <div/>
            <div>
                <textarea className="new-comment-message"
                          placeholder="Lascia un commento..."
                          rows="1" maxLength="255" value={comment} onChange={writeComment}/>
                <div style={{
                    textAlign: "right",
                    fontSize: "0.7em"
                }}>{remainingchars} caratteri rimanenti.</div>
            </div>

            <div style={{
                margin: "1em",
                marginBottom: "0",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end"
            }}>
                <input className="button is-success" onClick={submitComment}
                       type="button" value="Pubblica" id="submitComment"/>
            </div>
        </div>
    );
}
