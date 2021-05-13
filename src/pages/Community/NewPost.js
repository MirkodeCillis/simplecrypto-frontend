import React, {useState} from "react";
import '../../style/style.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "../../app/auth";

export default function NewPost() {
    const auth = useAuth();
    const [post, setPost] = useState("");

    const writePost = (event) => {
        setPost(event.target.value);
    }

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
            <textarea className="new-post-message" placeholder="Che ne pensi del mercato in questo momento? Come sta andando il tuo investimento?"
                rows="3" maxLength="255" value={post} onChange={writePost}/>
        </div>
    );
}
