import React, {useEffect, useState} from 'react';
import '../../style/style.css';
import NewPost from "./NewPost";
import {CommunityRepo} from "../../services/CommunityRepo";
import Cookies from "js-cookie";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faFire, faUser} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

export default function Community() {
    const {REACT_APP_COOKIENAME} = process.env;
    const [loaded, isLoaded] = useState(false);
    const [listPosts, setListPosts] = useState([]);
    const [totalPages, settotalPages] = useState(0);
    const [postParams, setPostParams] = useState({
        page: 0
    });

    useEffect(() => {
        if (loaded) return;
        CommunityRepo.getLatestPosts({page: 0},
            Cookies.get(REACT_APP_COOKIENAME)).then(res => {
            setListPosts(res.data.content);
            settotalPages(res.data.totalPages);
        });
        isLoaded(true);
    }, [REACT_APP_COOKIENAME, postParams]);

    const orderByComments = () => {
        if (document.getElementById("btncomments").classList.contains("is-active")) return;
        document.getElementById("btncomments").classList.toggle("is-active");
        document.getElementById("btnnewer").classList.toggle("is-active");
        CommunityRepo.getHotPosts({page: 0},
            Cookies.get(REACT_APP_COOKIENAME)).then(res => {
            setListPosts(res.data.content);
        });
        setPostParams({
            page: 0
        });
    };

    const orderByNewer = () => {
        if (document.getElementById("btnnewer").classList.contains("is-active")) return;
        document.getElementById("btncomments").classList.toggle("is-active");
        document.getElementById("btnnewer").classList.toggle("is-active");
        CommunityRepo.getLatestPosts({page: 0},
            Cookies.get(REACT_APP_COOKIENAME)).then(res => {
            setListPosts(res.data.content);
        });
        setPostParams({
            page: 0
        });
    };

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

    const loadPosts = (increment) => {
        if (increment === 1 && postParams.page === totalPages-1) return;
        if (increment === -1 && postParams.page === 0) return;

        if (document.getElementById("btnnewer").classList.contains("is-active")) {
            CommunityRepo.getLatestPosts({page: postParams.page + increment},
                Cookies.get(REACT_APP_COOKIENAME)).then(res => {
                setListPosts(res.data.content);
            });
        } else if (document.getElementById("btncomments").classList.contains("is-active")) {
            CommunityRepo.getHotPosts({page: postParams.page + increment},
                Cookies.get(REACT_APP_COOKIENAME)).then(res => {
                setListPosts(res.data.content);
            });
        }
        setPostParams({
            page: postParams.page + increment
        });
    };

    return (
        <div>
            <NewPost />

            <div className="columns column is-centered">
                <div className="column is-one-third is-centered has-text-centered">
                    <button className="button is-success is-active" onClick={orderByNewer}
                            id="btnnewer" style={{borderRadius: "0.3em 0 0 0.3em"}}>
                        <FontAwesomeIcon icon={faClock}/>&nbsp;&nbsp;Più Recenti
                    </button>
                    <button className="button is-success" onClick={orderByComments}
                            id="btncomments" style={{borderRadius: "0 0.3em 0.3em 0"}}>
                        <FontAwesomeIcon icon={faFire}/>&nbsp;&nbsp;Hot Posts
                    </button>
                </div>
            </div>

            {printPosts()}

            <nav className="pagination" role="navigation" aria-label="pagination">
                <button className="button is-success"
                    onClick={() => loadPosts(-1)}
                    disabled={postParams.page === 0}>Previous</button>
                <button className="button is-success"
                    onClick={() => loadPosts(1)}
                    disabled={postParams.page === totalPages-1}>Next page</button>
            </nav>
        </div>
    );
}
