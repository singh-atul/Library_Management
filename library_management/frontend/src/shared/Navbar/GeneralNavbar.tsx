import React from 'react'
import { Button, Form, FormControl, Row } from 'react-bootstrap'
import Nav from 'react-bootstrap/esm/Nav'
import Navbar from 'react-bootstrap/esm/Navbar'
import { Link } from 'react-router-dom'
import Notifications from '../Notifications/Notifications';

export function GeneralNavbar() {
    return (
      <Navbar fixed="top" bg="primary" className="text mb-2" expand="lg">
        <Navbar.Brand href="#home">
            <span className="text-light text-bold">LLS</span>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
              <Nav.Link as={Link} to="admin">
                 <span className="text-light">Admin</span>
              </Nav.Link>
              <Nav.Link as={Link} to="member">
                 <span className="text-light">Member Portal</span>
              </Nav.Link>
              <Notifications />
          </Nav>

          <Row>
          <Form className="col-sm-12 col-md-7">
            <Row>
              <FormControl  type="text" placeholder="Search" className="col-sm-12 col-md-7" />
              <div className="col-sm-12 col-md-3">
                <Button  variant="outline-light" >Search</Button>
              </div>

           </Row>
          </Form>
            <Button
              className="col-sm-12 col-md-3" 
              variant="secondary"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >Logout</Button>
          </Row>
        </Navbar.Collapse>
      </Navbar>
    )
}
