import React, {useEffect, useState} from 'react'
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

const Home = ({user, setUser}) => {

    useEffect(() => {
        if (localStorage.getItem("user") && !user) {
            setUser(JSON.parse(localStorage.getItem("user")));                                                      // Setzt den Benutzerzustand, wenn der Benutzer im lokalen Speicher vorhanden ist
        }
    }, [user, setUser]);

    const [locations, setLocations] = useState(null)

    //Die useEffect-Funktion wird ausgeführt, wenn die Komponente geladen wird oder der Benutzer wechselt.
    //Dieser Effekt ermöglicht es der Komponente, Daten von einer bestimmten API abzurufen, sobald sie geladen wird.
    useEffect(()=>{
        const fetchLocations = async ()=>{
            const response = await fetch('http://localhost:5000/home');                                 // Abholen der Standorte von der API
            const json = await response.json();                                                                         // Konvertieren der Antwort in JSON

            console.log(json);

            //Die setLocations(json)-Anweisung ordnet die von der API empfangenen Standortdaten dem Status der Komponente (Standort state) zu.
            //Dadurch wird die Komponente neu gerendert und dem Benutzer werden Standortinformationen angezeigt.
            if (response.ok) {
                setLocations(json);
            }
        };
        fetchLocations();                                                                                               // Aufrufen der Funktion zum Abholen der Standorte

    },[])                                                                                                         // Abhängigkeiten: leeres Array, um die Funktion nur einmal auszuführen

    return (
        <div>
            <div className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header ">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/#">Main Screen</a>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">

                        <ul className="nav navbar-nav navbar-right">
                            {
                                user?.isAdmin === 'true' ?
                                    <li>
                                        <a href="/add"><span className="glyphicon"></span> Add new station</a>
                                        <a href="/" onClick={(e) => {
                                            localStorage.removeItem("user");                                       // Entfernen des Benutzers aus dem lokalen Speicher
                                            setUser(null);                                                              // Zurücksetzen des Benutzerzustands
                                        }}><span className="glyphicon glyphicon-log-in"></span> Logout</a>
                                    </li> :
                                    <li>
                                        <a href="/" onClick={(e) => {
                                            localStorage.removeItem("user")
                                            setUser(null);
                                        }}><span className="glyphicon glyphicon-log-in"></span> Logout</a>
                                    </li>
                            }

                        </ul>

                    </div>
                </div>
            </div>
            <Form>
                <div className="container-fluid text-center">
                    <div className="row content">
                        <div className="col-sm-2 sidenav">
                            <div className="loc">
                                <Form.Group className="d-grid">
                                    {locations && locations.map((loc) => (
                                        <Button key={loc._id} className="btn btn-info btn-lg btn-block"
                                                variant="primary">
                                            <Link to={`/updateDelete/${loc._id}`}> {loc.titel}</Link>
                                        </Button>
                                    ))}
                                </Form.Group>
                            </div>

                        </div>
                        <div className="map-area col-sm-8 text-left">
                            <iframe title="This is a unique title"
                                    src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d19422.697559315864!2d13.402629544629976!3d52.51828534535644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1strinkbrunnen%20%C3%B6ffentlicher%20raum!5e0!3m2!1sde!2sde!4v1673306679637!5m2!1sde!2sde"
                                    width="920" height="790" allowFullScreen="" loading="lazy"></iframe>
                        </div>
                    </div>
                </div>
            </Form>
            <br/>

            <footer className="container-fluid text-center">
                <div className="navbar navbar-inverse">

                </div>
            </footer>

        </div>

    );
}

export default Home;