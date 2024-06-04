import React, {useState} from 'react';
import Home from "./view/Home";
import Login from "./view/Login";
import Add from "./view/Add"
import UpdateDelete from "./view/UpdateDelete";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Container} from "react-bootstrap";
import {Toaster} from "react-hot-toast";


function App() {
  const [user, setUser] = useState(null);
  return (
      <Router>
        <main className='py-3'>
          <Container>
            <Routes>
              <Route exact path='/' element={<Login setUser={setUser}/>} />
              <Route exact path='/home' element={<Home user={user} setUser={setUser}/>}/>
              <Route exact path='/add' element={<Add user={user} setUser={setUser}/>} />
              <Route exact path='/updateDelete/:id' element={<UpdateDelete user={user} setUser={setUser}/>} />
            </Routes>
          </Container>
        </main>
        <Toaster
            position="top-center"
            toastOptions={{duration:2700,}}
        />
      </Router>
  );
}

export default App;
