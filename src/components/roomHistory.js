import React from "react";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useForm} from "react-hook-form";


export default function RoomHistory({roomKeyword, onChange, onClick, prevRooms}) {

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            word: roomKeyword,
        }
    });

    const printPrevRooms = () => {
        return prevRooms.map((room, i) => {
            return <div key={i} onClick={(word) => {
                word = room;
                onClick(word);
            }} className="prevroom-row">
                <span>{room}</span>
            </div>;
        });
    }


    const joinRoom = (data) => {
        onClick(data.word);
    }

    return (
        <div className="column is-one-third prevroom-side" id="prevroom-side">
            <div style={{
                padding: "1em",
                position: "sticky",
                left: 0, right: 0, top: 0,
                backgroundColor: "#202225"
            }}>
                <div style={{textAlign: "right"}}>
                    <form className="field columns" style={{padding: "0 0.5em"}} onSubmit={handleSubmit(joinRoom)}>
                        <div className="column is-four-fifths">
                            <input className="input" name="newroom" id="newroom" type="text"
                                   {...register("word", {
                                       required: {
                                           value: true,
                                           message: "Nome room richiesto"
                                       },
                                       minLength: {
                                           value: 1,
                                           message: 'Lunghezza minima: 1 carattere'
                                       },
                                       maxLength: {
                                           value: 60,
                                           message: 'Lunghezza massima: 60 caratteri'
                                       },
                                       pattern: {
                                           value: /^([A-Z0-9\-_]){1,60}$/i,
                                           message: 'Nome room non valido, solo caratteri alfabeto, - e _',
                                       }
                                   })}
                                   placeholder="NuovaRoom"
                                   onChange={onChange}/>
                            {errors?.word && <p className="help is-danger">{errors?.word?.message}</p>}
                        </div>
                        <div className="column is-one-fifth">
                            <div className="control has-icons-left">
                                <input className="input button is-primary" id="sendMessage"
                                       type="submit" value="Room"/>
                                <span className="iconField is-left"
                                      style={{paddingTop: "0.25em", marginLeft: "-0.5em"}}>
                                <FontAwesomeIcon icon={faPlus}/>
                            </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div style={{
                paddingTop: "1em"
            }}>
                {printPrevRooms()}
            </div>
        </div>);
}
