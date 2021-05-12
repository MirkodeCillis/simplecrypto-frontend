import React from 'react';
import '../../style/style.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faKey, faUser} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";

export default function Login(props) {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const submit = (data) => {
        document.getElementById('submitLogin').disabled = true;
        props.auth.signin(data?.username || '', data?.password || '').then(r => {
            document.getElementById('submitLogin').disabled = false;
        });
    }

    return (
        <div className="columns is-centered m-2" style={{paddingTop: "2em"}}>
            <div className="column is-5-desktop is-12-mobile">
                <form id="signinForm" name="signinForm" onSubmit={handleSubmit(submit)}>
                    <div className="field">
                        <label className="is-one-third labelform" htmlFor="username"> Username </label>
                        <div className="control has-icons-left">
                            <input className="input is-7" name="username" id="username"
                                   defaultValue="" {...register("username", {
                                required: {value: true, message: "Username richiesto"}
                            })}
                            />
                            <span className="iconField is-left">
                                <FontAwesomeIcon icon={faUser} size="2x"/>
                            </span>
                        </div>
                        {errors?.username && <p className="help is-danger">{errors?.username?.message}</p>}
                    </div>
                    <div className="field">
                        <label className="is-one-third labelform" htmlFor="password"> Password </label>
                        <div className="control has-icons-left">
                            <input className="input" name="password" id="password" type="password"
                                   defaultValue=""
                                   {...register("password", {
                                       required: {value: true, message: "Password richiesta"},
                                   })}/>
                            <span className="iconField is-left">
                                    <FontAwesomeIcon icon={faKey} size="2x"/>
                                </span>
                            {errors?.password && <p className="help is-danger">{errors?.password?.message}</p>}
                        </div>
                    </div>
                    <div className="field">
                        <p className="control" style={{textAlign: "center"}}>
                            <input className="button is-primary"
                                   type="submit" value="Login" id="submitLogin"/>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control" style={{textAlign: "right"}}>
                            Non ti sei ancora registratə? <Link to={"/public/signup"}>Rimedia subito</Link>.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}
