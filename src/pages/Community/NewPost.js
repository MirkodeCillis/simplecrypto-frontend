import React, {useState} from "react";
import '../../style/style.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "../../app/auth";
import {CommunityRepo} from "../../services/community";
import swal from "sweetalert2";
import Cookies from 'js-cookie';

export default function NewPost() {
    const {REACT_APP_COOKIENAME} = process.env;
    const auth = useAuth();
    const [post, setPost] = useState("");
    const [remainingchars, setRemainingChars] = useState(255);

    const writePost = (event) => {
        setPost(event.target.value);
        setRemainingChars(255 - event.target.value.length);
    };

    const submitPost = () => {
        CommunityRepo.submitPost({
            message: post,
            userId: auth.user.id
        },
        Cookies.get(REACT_APP_COOKIENAME)).then(res => {
            swal.fire({
                titleText: "Post pubblicato!",
                text: "Aggiorna la pagina per vedere il tuo post nel feed.",
                icon: "success",
                background: "#f2f6fa",
                confirmButtonColor: '#0F6FFF'
            }).then((res) => {
                setPost("");
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
        <div className="new-post">
            <div style={{
                margin: "0.5em 1em",
                textAlign: "left",
                fontSize: "1.4em"
            }}>
                <FontAwesomeIcon icon={faUser} size="1x"/>
                &nbsp; {auth.user.username} &nbsp;
            </div>
            <div>
                <textarea className="new-post-message"
                          placeholder="Che ne pensi del mercato in questo momento? Come sta andando il tuo investimento?"
                          rows="3" maxLength="255" value={post} onChange={writePost}/>
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
                <input className="button is-primary" onClick={submitPost}
                       type="button" value="Pubblica" id="submitPost"/>
            </div>
        </div>
    );
}
