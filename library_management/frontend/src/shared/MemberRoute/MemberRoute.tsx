
import React, { FC, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

const MemberRoute:FC<any> = ({ component: Component, ...rest }) => {
    const [token, setToken] = useState('');
    const [userId, setUserId] =  useState<number>();
    const [isUnauthorized, setIsUnauthorized] = useState(false);

    useEffect(() => {
        const tkn = localStorage.getItem('token') || '';
        const uid = parseInt(localStorage.getItem('userId') || '0')

        setToken(tkn);
        setUserId(uid)
        setIsUnauthorized( !!(!tkn || !tkn.split('Bearer ')[1]))
         
    }, [token])

    return (
        <Route
            {...rest}
            token={token}
            userId={userId}

            render={props => {
                if (isUnauthorized) {
                    return <Redirect to="/login" />;
                }

                return <Component {...props} userId={userId}/>;
            }}
        />
    );
};

export default MemberRoute;
