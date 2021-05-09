import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faKey, faUser} from "@fortawesome/free-solid-svg-icons";
import '../../style/style.css';
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";

export default function Signup(props) {
    const {register, handleSubmit, formState: {errors}, reset, watch} = useForm();

    const onSubmit = data => {
        document.getElementById('submitSignup').disabled = true;
        props.auth.signup(data.username, data.email, data.password, data.color);
        document.getElementById('submitSignup').disabled = false;
    }

    return (
        <div className="columns is-centered m-2" style={{paddingTop: "2em"}}>
            <div className="column is-5-desktop is-12-mobile">
                <form id="signupForm" name="signupForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                        <label className="is-one-third labelform" htmlFor="username"> Username </label>
                        <div className="control has-icons-left">
                            <input className="input is-7" name="username" id="username"
                                   defaultValue="" {...register("username", {
                                required: {value: true, message: "Username richiesto"},
                                maxLength: {value: 60, message: "Username più lungo di 60 caratteri!"},
                                minLength: {value: 1, message: "Username più corto di 1 carattere"},
                                pattern: {
                                    value: /^\s*(?:[A-Z0-9\-_]\s*){1,60}$/i,
                                    message: "L'username può contenere solo lettere dell'alfabeto, spazi, - e _"
                                }
                            })}
                            />
                            <span className="iconField is-left">
                                <FontAwesomeIcon icon={faUser} size="2x"/>
                            </span>
                        </div>
                        {errors?.username && <p className="help is-danger">{errors?.username?.message}</p>}
                    </div>
                    <div className="field">
                        <label className="is-one-third labelform" htmlFor="email"> Email </label>
                        <div className="control has-icons-left">
                            <input className="input" name="email" id="email" type="email"
                                   defaultValue="" {...register("email", {
                                required: {value: true, message: "Email richiesta"},
                                maxLength: {value: 255, message: "Email più lunga di 255 caratteri!"},
                                minLength: {value: 3, message: "Email più corto di 3 caratteri"}
                            })}/>
                            <span className="iconField is-left">
                                <FontAwesomeIcon icon={faEnvelope} size="2x"/>
                            </span>
                        </div>
                        {errors?.email && <p className="help is-danger">{errors?.email?.message}</p>}
                    </div>
                    <div className="field">
                        <label className="is-one-third labelform" htmlFor="password"> Password </label>
                        <div className="control has-icons-left">
                            <input className="input" name="password" id="password" type="password"
                                   defaultValue=""
                                   {...register("password", {
                                       required: {value: true, message: "Password richiesta"},
                                       minLength: {value: 8, message: "Password troppo corta (minimo 8 caratteri)"},
                                       maxLength: {value: 16, message: "Password troppo lunga (massimo 16 caratteri)"}
                                   })}/>
                            <span className="iconField is-left">
                                <FontAwesomeIcon icon={faKey} size="2x"/>
                            </span>
                        </div>
                        {errors?.password && <p className="help is-danger">{errors?.password?.message}</p>}
                    </div>
                    <div className="columns field is-grouped is-grouped-centered mt-3">
                        <label htmlFor="color" className="column labelform">
                            Scegli il tuo colore!
                            <div style={{
                                marginLeft: "0",
                                width: "2em",
                                height: "2em",
                                borderRadius: "50%",
                                border: "1px lightgray solid",
                                backgroundColor: watch("color"),
                            }}/>
                        </label>
                    </div>
                    <div className="field is-grouped is-grouped-centered">
                        <p className="control">
                            <input className="button is-primary" style={{margin: "auto"}}
                                   type="submit" value="Registrati!" id="submitSignup"
                            />
                        </p>
                        <p className="control">
                            <input type="button" value="Reset" className="button is-light"
                                   onClick={() => reset()}/>
                        </p>

                    </div>
                    <div className="field">
                        <p className="control" style={{textAlign: "right"}}>
                            Già registratə? <Link to={"/login"}>Non perdere altro tempo</Link>.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

