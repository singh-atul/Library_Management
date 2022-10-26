import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MemberPortal from './route-level-components/MemberPortal';
import AdminPortal from './route-level-components/AdminPortal';
import Login from './route-level-components/Login';
import Signup from './route-level-components/Signup';
import { GeneralNavbar } from './shared';
import { Container } from 'react-bootstrap';
import AdminRoute from './shared/AdminRoute/AdminRoute';
import MemberRoute from './shared/MemberRoute/MemberRoute';

function App() {
  return (
      <Router>
          <Container className="App">
              <GeneralNavbar />
                <Switch>
                  <Route path="/" exact><Redirect to="member" /></Route>
                  <MemberRoute path="/member" component={MemberPortal} />
                  <AdminRoute path="/admin" component={AdminPortal} />
                  <Route path="/login" component={Login}/>
                  <Route path="/signup" component={Signup}/>
                  <Route path="*" render={() => <h1>Page Not found</h1>} />
                </Switch>
          </Container>
      </Router>
  );
}

export default App;
