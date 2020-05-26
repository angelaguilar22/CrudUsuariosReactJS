import React from 'react';
import './App.css';
// import of navigation
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";

// import of components 
import MainMenu from './components/MainMenu';
import UsersMain from './components/UsersMain';
import UserDetails from './components/UserDetails';

function DetalleUsuario() {
  let { id } = useParams();

  return (
    <MainMenu>
      <UserDetails usuario={id} />
    </MainMenu>
  );
}

function App() {
  return (
    <Router>
      <Switch>

        <Route exact path="/usuarioDetalle/:id" children={<DetalleUsuario />} />

        <Route exact path="/">
          <MainMenu>
            <UsersMain />
          </MainMenu>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
