
import React, { FC, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute:FC<any> = ({  component: Component, ...rest }) => {
    const [token, setToken] = useState('');
    const [isAdmin, setIsAdmin] = useState(true);
    const [userId, setUserId] =  useState<number>();
    const [isUnauthorized, setIsUnauthorized] = useState(true);

    useEffect(() => {
        const tkn = localStorage.getItem('token') || '';
        const strAdmin = localStorage.getItem('isAdmin') || ''
        const adm = !strAdmin? false : !!JSON.parse(strAdmin)
        const uid = JSON.parse(localStorage.getItem('userId') || '0')

        setToken(tkn);
        setIsAdmin(adm);
        setUserId(uid)
        setIsUnauthorized( !tkn || !tkn.split('Bearer ')[1]);
    }, [token])


    return (
        <Route
            {...rest}
            isAdmin={isAdmin}
            token={token}
            userId={userId}

            render={props => {
                if (isUnauthorized && !isAdmin) {
                    return <Redirect to="/login" />;
                }

                if(!isUnauthorized && !isAdmin) {
                    return <Redirect to="/member" />
                }

                return <Component {...props} isAdmin={isAdmin} userId={userId}/>;
            }}
        />
    );
};

export default AdminRoute;
