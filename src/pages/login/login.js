import React from 'react';
import '../../style/style.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faKey} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";

export default function Login(props) {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const submit = (data) => {
        document.getElementById('submitLogin').disabled = true;
        props.auth.signin(data?.email || '', data?.password || '').then(r => {
            document.getElementById('submitLogin').disabled = false;
        });
    }

    return (
        <div className="columns is-centered m-2" style={{paddingTop: "2em"}}>
            <div className="column is-5-desktop is-12-mobile">
                <form id="signinForm" name="signinForm" onSubmit={handleSubmit(submit)}>
                    <div className="field">
                        <label className="is-one-third labelform" htmlFor="email"> Email </label>
                        <div className="control has-icons-left">
                            <input className="input" name="email" id="email" type="email"
                                   defaultValue="" {...register("email", {
                                required: {value: true, message: "Email richiesta"},
                                minLength: {value: 3, message: "Email più corta di 3 caratteri"}
                            })}/>
                            <span className="iconField is-left">
                                    <FontAwesomeIcon icon={faEnvelope} size="2x"/>
                                </span>
                            {errors?.email && <p className="help is-danger">{errors?.email?.message}</p>}
                        </div>
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
                            Non ti sei ancora registratə? <Link to={"/signup"}>Rimedia subito</Link>.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}
