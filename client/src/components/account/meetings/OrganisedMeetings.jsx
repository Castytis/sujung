import React from 'react';
import { Card, Accordion } from 'react-bootstrap';

const OrganisedMeetings = () => {
  return (
    <Card style={{ width: '26rem' }}>
      <Card.Title className='text-center'>Organizuojami susitikimai</Card.Title>
      <Accordion defaultActiveKey='0' flush>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>Accordion Item #1</Accordion.Header>
          <Accordion.Body></Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Card>
  );
};

export default OrganisedMeetings;
