import React, {useEffect, useState} from 'react';
import '../../style/style.css';
import NewPost from "./NewPost";
import {CommunityRepo} from "../../services/community";
import Cookies from "js-cookie";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

export default function Community() {
    const {REACT_APP_COOKIENAME} = process.env;
    const [listPosts, setListPosts] = useState([]);
    const [postParams, setPostParams] = useState({
        page: 0
    });

    useEffect(() => {
        CommunityRepo.getLatestPosts(postParams,
            Cookies.get(REACT_APP_COOKIENAME)).then(res => {
            setListPosts(res.data.content);
        });
    }, [REACT_APP_COOKIENAME, postParams]);

    const printPosts = () => {
        console.log(listPosts);
        return listPosts.map((post, i) => {

            return (
            <div key={i} className="column is-four-fifths-desktop is-four-fifths-mobile is-centered listposts">
                <div>
                    <div style={{
                        margin: "0.5em 1em",
                        textAlign: "left"
                    }}>
                        <span className="userpost">
                            <FontAwesomeIcon icon={faUser} size="1x"/>
                            &nbsp; {post.user.username}
                        </span>
                        &nbsp;<span style={{fontSize: "0.6em"}}>{post.publishedAt}</span>
                    </div>
                    <div className="messagecontent">
                        {post.message}
                    </div>
                    <div style={{fontSize: "0.8em", fontWeight: "bold"}}>
                        <Link to={`/community/post/${post.id}`}>
                            {(post.comments.length > 0) ? `${post.comments.length} commenti...` : "Ancora nessun commento..."}
                        </Link>
                    </div>
                </div>
            </div>);
        });
    }

    return (
        <div>
            <NewPost />
            {printPosts()}

        </div>
    );
}
