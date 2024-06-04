import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import {Form,Button} from "react-bootstrap";
import toast from "react-hot-toast";
import {LoginAxios} from "../axios";



const Login = ({setUser}) =>{
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username:"",
        password:""
    })


    const handleLogin = async (e) => {
        e.preventDefault();  // Es blockiert das Standardverhalten des Formulars, d. h. verhindert, dass die Seite neu geladen wird. Auf diese Weise wird das Formular asynchron verarbeitet.
        try {
            const res = await LoginAxios(formData);
            localStorage.setItem('user', JSON.stringify(res.data.user));                                                // Speichern des Benutzers im lokalen Speicher
            setUser(res.data.user);                                                                                     // Setzen des Benutzerzustands
            navigate('/home');
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };


    return (
        <div>
            <div className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header ">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/#">Login Screen</a>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <br/>

            <div className="container-fluid text-center">
                <div className="row content">
                    <div className="col-sm-4 w-100 sidenav">


                    </div>
                    <div className="map-area col-sm-4 text-left">
                        <div className="align-items-center">
                            <img src="/Brunnen.jpeg" alt="Cinque Terre" width="350" height="445"/>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <div className="login-form-container">

                            <Form onSubmit={handleLogin}>
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                    <input
                                        id="username"
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        placeholder="Username"
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    />
                                </div>
                                <br/><br/>
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                                    <input
                                        id="password"
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Password"
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                                <br/><br/><br/>
                                <Form.Group className="d-grid">
                                    <Button type="submit" className="btn btn-info btn-lg btn-block" variant="primary">
                                        Login
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

export default Login;