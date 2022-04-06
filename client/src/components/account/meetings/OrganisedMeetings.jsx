import React from 'react';
import { Card, Accordion } from 'react-bootstrap';

const OrganisedMeetings = (props) => {
  return (
    <Card style={{ width: '26rem' }}>
      <Card.Title className='text-center'>Organizuojami susitikimai</Card.Title>
      <Accordion defaultActiveKey='0' flush>
        {props.meeting.map((meeting, index) => (
          <Accordion.Item eventKey={index}>
            <Accordion.Header>{meeting.title}</Accordion.Header>
            <Accordion.Body>Data ir laikas: {meeting.date}</Accordion.Body>
            <Accordion.Body>Vieta: {meeting.location}</Accordion.Body>
            <Accordion.Body>Tema: {meeting.subject}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Card>
  );
};

export default OrganisedMeetings;
