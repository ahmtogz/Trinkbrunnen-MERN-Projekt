import React, {useState} from 'react'
import {AddAxios} from "../axios";
import {Button, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";

const Add = () => {
    const navigate = useNavigate() // useNavigate-Hook für die programmatische Navigation
    const [formData, setFormData] = useState({
        titel: "",
        address: "",
        postCode: "",
        city: ""
    }); // useState-Hook zum Verwalten der Formulardaten

    return (
        <div>
            <div className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header ">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/#">Add Screen</a>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                    </div>
                </div>
            </div>q
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

                            <Form onSubmit={(e) =>{
                                e.preventDefault()                                                                        // Verhindert das Standardverhalten des Formulars
                                AddAxios(formData).then((res) => {                              // Macht die API-Anfrage mit formDat
                                    console.log(res.data)
                                    navigate("/home");
                                }).catch((err) => console.log(err))
                            }}>

                                <div className="input-group">
                                    <span className="input-group-addon"><i
                                        className=""></i></span>
                                    <input id="name" type="titel" className="form-control" name="tiel" placeholder="Titel"
                                           onChange={(e) =>
                                               setFormData({...formData, titel: e.target.value})}
                                    />
                                </div>
                                <br/>
                                <br/>
                                <div className="input-group">
                                    <span className="input-group-addon"><i
                                        className=""></i></span>
                                    <input id="Strasse" type="address" className="form-control" name="Strasse" placeholder="Strasse"
                                           onChange={(e) =>
                                               setFormData({...formData, address: e.target.value})}
                                    />
                                </div>
                                <br/>
                                <br/>
                                <div className="input-group">
                                    <span className="input-group-addon"><i
                                        className=""></i></span>
                                    <input id="plz" type="postCode" className="form-control" name="plz" placeholder="PLZ"
                                           onChange={(e) =>
                                               setFormData({...formData, postCode: e.target.value})}
                                    />
                                </div>
                                <br/>
                                <br/>
                                <div className="input-group">
                                    <span className="input-group-addon"><i
                                        className=""></i></span>
                                    <input id="Stadt" type="city" className="form-control " name="Stadt" placeholder="Stadt"
                                           onChange={(e) =>
                                               setFormData({...formData, city: e.target.value})}
                                    />
                                </div>
                                <br/>
                                <br/>
                                <br/>
                                <Form.Group className = "d-grid" >
                                    <Button type="submit" className="btn btn-info btn-lg btn-block" variant="primary">
                                        Save
                                    </Button>
                                </Form.Group>
                                <br/>
                                <br/>
                                <Form.Group className = "d-grid" >
                                    <Button  className="btn btn-info btn-lg btn-block" variant="primary">
                                        <Link to='/home'> Cancel </Link>
                                    </Button>
                                </Form.Group>

                                <br/><br/><br/><br/><br/><br/><br/><br/><br/>

                            </Form>
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

export default Add;