import React from 'react';
import { Card, Accordion } from 'react-bootstrap';

const ParticipatingMeetings = (props) => {
  return (
    <Card style={{ width: '26rem' }}>
      <Card.Title className='text-center'>
        Susitikimai, kuriuose dalyvaujate
      </Card.Title>
      <Accordion defaultActiveKey='0' flush>
        {props.meeting.map((meeting, index) => (
          <Accordion.Item eventKey={index}>
            <Accordion.Header>{meeting.title}</Accordion.Header>
            <Accordion.Body>
              <span className='text-muted'>Tema: </span> {meeting.subject}
            </Accordion.Body>
            <Accordion.Body>
              <span className='text-muted'>Data ir laikas: </span>
              {meeting.date} {meeting.time}
            </Accordion.Body>
            <Accordion.Body>
              <span className='text-muted'>Vieta: </span> {meeting.location}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Card>
  );
};

export default ParticipatingMeetings;
