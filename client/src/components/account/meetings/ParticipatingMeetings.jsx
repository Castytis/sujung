import React from 'react';
import { Card, Accordion, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { removeParticipant } from '../../../store/actions/meeting-action';

const ParticipatingMeetings = (props) => {
  const dispatch = useDispatch();

  return (
    <Card style={{ width: '26rem' }}>
      <Card.Title className='text-center' style={{ color: 'blue' }}>
        Susitikimai, kuriuose dalyvaujate
      </Card.Title>
      <Accordion defaultActiveKey='0' flush>
        {props.meeting.map((meeting, index) => (
          <Accordion.Item eventKey={index}>
            <Accordion.Header>{meeting.title}</Accordion.Header>
            <Accordion.Body>
              <span className='text-muted'>Tikslas: </span> {meeting.subject}
            </Accordion.Body>
            <Accordion.Body>
              <span className='text-muted'>Data ir laikas: </span>
              {meeting.date} {meeting.time}
            </Accordion.Body>
            <Accordion.Body>
              <span className='text-muted'>Vieta: </span> {meeting.location}
            </Accordion.Body>
            <Accordion.Body>
              <Button
                variant='danger'
                onClick={() => {
                  dispatch(removeParticipant(meeting._id));
                }}
              >
                Palikti
              </Button>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Card>
  );
};

export default ParticipatingMeetings;
