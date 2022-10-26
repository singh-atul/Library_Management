import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { Section } from '../../shared/Section/Section';
import { IUser } from '../../../../models';
import Api from '../../api'
import { Link, Redirect } from 'react-router-dom';

export default function Login() {
    const initialState:Partial<IUser> = {
        email: '',
        password: '',
    };

    const [user, setUser] = useState(initialState);
    const [token, setToken] = useState('');
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {   

        localStorage.setItem('token', `Bearer ${token}`);
        localStorage.setItem('isAdmin', JSON.stringify(user.roles === 'admin'));
        localStorage.setItem('userId', `${user.id}`);
    },[token, user])

    useEffect(() => {

        if(submitted) {
            Api.login(user)
            .then(({data}) => {
                
                setUser(() => data.user);
                setToken(() => data.token)
            })
            .catch(() => {
                setError('Wrong username or password');
            })
        }
  
    }, [submitted, user])

    const  handleSubmit = async (
        e: React.SyntheticEvent<Element, Event>
    ) => {
        e.preventDefault();
        setSubmitted(true)
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setSubmitted(false);
        setError('');
        setUser(prevUser => {
            return {
                ...prevUser,
                [e.target.id]: e.target.value,
            }
        })
    }

    if(token && user.roles ==='admin') {
        return <Redirect to="/admin" />
    }
    
    if(token) {
        return <Redirect to="/member" />
    }

    return (
        <Section title="Login" dimensions={{xs: 11}}>
            {error? <Alert variant="danger">{error}</Alert> : null}: 
            <Row>
                <Col  xs={12} sm={12} lg={6} className="m-auto p-2 border border-grey">
                    <Form onSubmit={e => handleSubmit(e)}>
                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={e => handleOnChange(e)} />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={e => handleOnChange(e)} />
                        </Form.Group>
                   
                        <Button variant="primary" type="submit" className="d-block w-100">
                        Login
                    </Button>
                    </Form>
                    <Link to="/signup">Or Signup</Link>
                </Col>
            </Row>
         
        </Section>
    )
}
