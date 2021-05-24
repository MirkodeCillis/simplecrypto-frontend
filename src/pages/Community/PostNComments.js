import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import '../../style/style.css';
import {CommunityRepo} from "../../services/CommunityRepo";
import Cookies from "js-cookie";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import NewComment from "./NewComment";

export default function PostNComments() {
    let { id } = useParams();
    const {REACT_APP_COOKIENAME} = process.env;
    const [post, setPost] = useState({
        comments: [],
        user: {
            username: null
        },
        message: "",
        publishedAt: null
    });

    useEffect(() => {
        CommunityRepo.getPost(id,
            Cookies.get(REACT_APP_COOKIENAME)).then(res => {
                console.log(res);
            setPost(res.data);
        });
    }, [REACT_APP_COOKIENAME, id]);

    const printComments = () => {
        console.log(post);
        return post.comments.map((comment, i) => {

            return (
                <div key={i} className="column listcomments">
                    <div>
                        <div style={{
                            margin: "0.5em 1em",
                            textAlign: "left"
                        }}>
                        <span className="userpost">
                            <FontAwesomeIcon icon={faUser} size="1x"/>
                            &nbsp; {comment.user.username}
                        </span>
                            &nbsp;<span style={{fontSize: "0.6em"}}>{comment.publishedAt}</span>
                        </div>
                        <div className="messagecontent">
                            {comment.message}
                        </div>
                    </div>
                </div>);
        });
    }


    return (
        <div>
            <div className="column is-four-fifths-desktop is-four-fifths-mobile is-centered listposts">
                <div>
                    <div style={{
                        margin: "0.5em 1em",
                        textAlign: "left"
                    }}>
                        <span className="userpost2">
                            <FontAwesomeIcon icon={faUser} size="1x"/>
                            &nbsp; {post.user.username}
                        </span>
                        &nbsp;<span style={{fontSize: "0.6em"}}>{post.publishedAt}</span>
                    </div>
                    <div className="messagecontent">
                        {post.message}
                    </div>
                </div>
                <div>
                    <NewComment postId={id}/>
                </div>
                <div style={{fontSize: "0.8em", fontWeight: "bold", marginTop: "1em"}}>
                    Commenti
                </div>
                {printComments()}
            </div>
        </div>
    );
}
