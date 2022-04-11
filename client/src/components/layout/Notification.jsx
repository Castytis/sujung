import React from 'react';
import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notifications = useSelector((state) => state.notification);

  const notificationAlert =
    notifications !== null &&
    notifications.length > 0 &&
    notifications.map((notification) => {
      return (
        <Alert className='m-1 ' variant={notification.msgType}>
          {notification.msg}
        </Alert>
      );
    });

  return notificationAlert;
};

export default Notification;
