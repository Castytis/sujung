import { Alert } from 'react-bootstrap';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ErrorAlert = () => {
  const [show, setShow] = useState(true);
  const errorMessage = useSelector((state) => state.errorReducer);

  if (errorMessage.message !== null) {
    if (show) {
      return (
        <Alert
          variant='danger'
          className='m-5'
          onClose={() => setShow(false)}
          dismissible
        >
          <Alert.Heading>Neteisingai įvesta informacija</Alert.Heading>
        </Alert>
      );
    }
  }
};

export default ErrorAlert;
