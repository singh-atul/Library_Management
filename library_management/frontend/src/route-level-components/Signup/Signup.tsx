import React, { FC, useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { IUser } from '../../../../models';
import api from '../../api';
import { Section } from '../../shared/Section/Section'


interface Props {
    history: any
}
export const Signup:FC<Props> = ({history}) => {
    const initialState:Partial<IUser> = {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
    };

    const [user, setUser] = useState(initialState);
    const [token, setToken] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
            localStorage.setItem('token', `Bearer ${token}`);


            localStorage.setItem('isAdmin', `${user.roles === 'admin'}`);
            localStorage.setItem('userId', `${user.id}`);
    },[token, user])



    if(token && user.roles ==='admin') {
        history.push('admin')
    } else if(token) {
        history.push('member')
    }
    const  handleSubmit = async (
        e: React.SyntheticEvent<Element, Event>,
        userData: Partial<IUser>,
    ) => {
        e.preventDefault();

        api.signup(userData)
            .then(({data}) => {
                setUser(() => data.user);
                setToken(() => data.token)
            })
            .catch(error => {
                setError(() => error.message)
            });

    };

   const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setUser(prevUser => {
            return {
                ...prevUser,
                [e.target.id]: e.target.value,
            }
        })
    }

    return (
        <Section title="Signup" dimensions={{xs: 11}}>
        <Row>
            <Col xs={12} sm={12} lg={6} className="m-auto p-1 border border-grey">
                <Form onSubmit={e => handleSubmit(e, user)}>
                { error? <Form.Text className="text-warning">{error}</Form.Text>: null}
                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required onChange={e => handleOnChange(e)}/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="First Name" required onChange={e => handleOnChange(e)}/>
                    </Form.Group>
                    <Form.Group controlId="lastName" >
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" onChange={e => handleOnChange(e)} />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={e => handleOnChange(e)}/>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="d-block w-100">
                        Sign Up
                    </Button>
                    </Form>
                    <Link to="/login">Already Have An Account</Link>
            </Col>
        </Row>
     
    </Section>
    )
}
