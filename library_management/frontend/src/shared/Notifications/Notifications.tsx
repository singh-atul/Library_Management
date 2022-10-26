import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { INotification } from '../../../../models';
import Api from '../../api';
import withEllipsis from '../HOCs/withElipsis';


const Notifications: FC  = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

    useEffect(() => {
      setInterval(() => {
        Api.fetchNotifications()
        .then(({data}) => {
          setNotifications(() => [...data.notifications]);
        });
      }, 60000);
    },[])

    useEffect(() => {
        Api.fetchNotifications()
        .then(({data}) => {
          setNotifications(() => [...data.notifications]);
        });
    },[])

  
    const deleteNotification = (notification:INotification) => {
        Api.deleteNotification(notification.id)
          .then()


        setNotifications(nots => {
          return nots.filter(not => not.id !== notification.id);
        });
  
    }
      
    return <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">🔔</Dropdown.Toggle>
            <Dropdown.Menu  style={{width: '20rem'}}>
            {notifications
              .map(notification => 
                <Dropdown.Item  key={notification.id}>
                    <div style={{width: '90%', display: 'inline-block', verticalAlign: 'middle'}}>
                      {withEllipsis(<h6 style={{fontSize: '.9rem'}}>{notification.title}</h6>, {marginBottom: '-1rem'})}
                      <br  />
                      {withEllipsis(<p style={{fontSize: '.8rem'}}>{notification.details}</p>, {marginBottom: '-1rem'})}
                    </div>
                    <div style={{
                        width: '10%',
                        height: 'fit-content',
                        display: 'inline-block',
                        marginLeft: '.5rem',
                        verticalAlign: 'middle'}}>
                      <FontAwesomeIcon style={{fontSize: '1rem', color: 'red'}} icon={faTrash} onClick={(event) => {
                          event.stopPropagation();
                          deleteNotification(notification);
                      }}/>
                    </div>
    
                  
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
        </Dropdown>
}

export default Notifications;
