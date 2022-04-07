import React from 'react';
import { Card, Accordion, Button } from 'react-bootstrap';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteMeeting } from '../../../store/actions/meeting-action';

const OrganisedMeetings = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (props.meeting) {
    return (
      <Card style={{ width: '26rem' }}>
        <Card.Title className='text-center'>
          Organizuojami susitikimai
        </Card.Title>
        <Accordion defaultActiveKey='0' flush>
          {props.meeting.map((meeting, index) => (
            <Accordion.Item eventKey={index}>
              <Accordion.Header>{meeting.title}</Accordion.Header>
              <Accordion.Body>
                {' '}
                <span className='text-muted'>Tema:</span> {meeting.subject}
              </Accordion.Body>
              <Accordion.Body>
                <span className='text-muted'>Data ir laikas: </span>{' '}
                {meeting.date} {meeting.time}
              </Accordion.Body>
              <Accordion.Body>
                <span className='text-muted'>Vieta: </span> {meeting.location}
              </Accordion.Body>

              <AccordionBody>
                <Button
                  variant='danger'
                  onClick={() => {
                    dispatch(deleteMeeting(meeting._id));
                    navigate('../../teachers/me');
                  }}
                >
                  Ištrinti
                </Button>
              </AccordionBody>
            </Accordion.Item>
          ))}
        </Accordion>
      </Card>
    );
  }
};

export default OrganisedMeetings;
