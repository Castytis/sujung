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
        <Alert
          className='m-2'
          style={{ width: '560px' }}
          variant={notification.msgType}
        >
          <Alert.Heading>{notification.msg}</Alert.Heading>
        </Alert>
      );
    });

  return notificationAlert;
};

export default Notification;
