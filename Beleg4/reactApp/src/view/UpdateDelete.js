import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";


const UpdateDelete = ({user}) => {

    const params = useParams();                                                                    // useParams-Hook zum Abrufen der ID aus der URL
    const [state, setState] = useState({});                                                               // Zustand zum Speichern der aktuellen Daten des Elements
    const [updatedState, setUpdatedState] = useState({});                                                 // Zustand zum Speichern der aktualisierten Daten

    const handleChange = async (e) =>{
        setUpdatedState({...updatedState, [e.target.name]: e.target.value})                                       // Aktualisieren des Zustands bei Änderungen im Formular
    }

    const handleDelete= async () => {
        await fetch(`http://localhost:5000/delete/${params.id}`, {
            method: 'DELETE'
        })
    }

    const handleUpdate= async () => {
        await fetch(`http://localhost:5000/update/${params.id}`, {
            method: 'PUT',                                                                                              // API-Aufruf zum Aktualisieren des Elements
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(updatedState)                                                                           // Senden der aktualisierten Daten im Anfragekörper
        })
    }

    useEffect(() => {
        const getSelectedElementById = async () => {
            await fetch(`http://localhost:5000/updateDelete/${params.id}`)
                .then(res => res.json())
                .then(res => {
                    setState(res);                                                                                      // Speichern der aktuellen Daten im Zustand
                    setUpdatedState(res);                                                                               // Initialisieren des aktualisierten Zustands mit den aktuellen Daten
                });
        };

        getSelectedElementById();
    }, [params.id]);                                                                                              // Effekt wird ausgeführt, wenn die ID in den URL-Parametern sich ändert

    return (
        <div>
            <div className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header ">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/#">UpdateDelete Screen</a>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className="container-fluid text-center">
                <div className="row content">
                    <div className="col-sm-4 sidenav">


                    </div>
                    <div className="map-area col-sm-4 text-left">

                        <div className="login-form-container">
                            <form method="post">
                                <div className="input-group">
                                    <span className="input-group-addon"><i
                                        className=""></i></span>
                                    <input id="titel" type="text" className="form-control" name="titel"
                                           onChange={handleChange} defaultValue={state.titel} placeholder="Titel"/>
                                </div>
                                <br/>
                                <br/>
                                <div className="input-group">
                                    <span className="input-group-addon"><i
                                        className=""></i></span>
                                    <input id="address" type="text" className="form-control" name="address"
                                           onChange={handleChange} defaultValue={state.address} placeholder="Strasse"/>
                                </div>
                                <br/>
                                <br/>
                                <div className="input-group">
                                    <span className="input-group-addon"><i
                                        className=""></i></span>
                                    <input id="postCode" type="text" className="form-control" name="postCode"
                                           onChange={handleChange} defaultValue={state.postCode} placeholder="PLZ"/>
                                </div>
                                <br/>
                                <br/>
                                <div className="input-group">
                                    <span className="input-group-addon"><i
                                        className=""></i></span>
                                    <input id="city" type="text" className="form-control " name="city"
                                           onChange={handleChange} defaultValue={state.city} placeholder="Stadt"/>
                                </div>
                                <br/>
                                <br/>
                                <br/>
                                {
                                    user?.isAdmin === 'true' ?
                                        <div className="updateDelete-button">
                                            <div id="login-buttonId" className="login-button-container"><a
                                                className="btn btn-info btn-lg btn-block"
                                                href="/home" onClick={handleUpdate}>Update</a>
                                            </div>
                                            <br/>
                                            <br/>
                                            <div id="login-buttonId" className="login-button-container">
                                                <a className="btn btn-info btn-lg btn-block"
                                                   href="/home" onClick={handleDelete}> Delete</a>

                                            </div>
                                            <br/>
                                            <br/>
                                            <div id="login-buttonId" className="login-button-container">
                                                <a className="btn btn-info btn-lg btn-block"
                                                   href="/home">Cancel</a>
                                            </div>
                                        </div>:
                                        <div id="login-buttonId" className="login-button-container">
                                            <a className="btn btn-info btn-lg btn-block"
                                               href="/home">Cancel</a>
                                        </div>
                                }



                                <br/><br/><br/><br/><br/><br/><br/><br/><br/>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <br/>

            <footer className="container-fluid text-center">
                <div className="navbar navbar-inverse">

                </div>
            </footer>
        </div>

    );
}

export default UpdateDelete;