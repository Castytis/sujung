import React from 'react';
import { Card, Accordion, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteMeeting } from '../../../store/actions/meeting-action';
import { downloadReport } from '../../../store/actions/meeting-action';

const OrganisedMeetings = (props) => {
  const dispatch = useDispatch();

  if (props.meeting) {
    return (
      <Card style={{ width: '26rem' }}>
        <Card.Title className='text-center' style={{ color: 'blue' }}>
          Organizuojami susitikimai
        </Card.Title>
        <Accordion defaultActiveKey='0' flush>
          {props.meeting.map((meeting, index) => (
            <Accordion.Item eventKey={index}>
              <Accordion.Header>{meeting.title}</Accordion.Header>
              <Accordion.Body>
                {' '}
                <span className='text-muted'>Tikslas: </span> {meeting.subject}
              </Accordion.Body>
              <Accordion.Body>
                <span className='text-muted'>Data ir laikas: </span>{' '}
                {meeting.date} {meeting.time}
              </Accordion.Body>
              <Accordion.Body>
                <span className='text-muted'>Vieta: </span> {meeting.location}
              </Accordion.Body>

              <Accordion.Body>
                <Button
                  variant='info'
                  style={{ color: 'white' }}
                  onClick={() => {
                    dispatch(downloadReport(meeting));
                  }}
                >
                  Atsisiųsti ataskaitą
                </Button>
                <Button
                  variant='danger'
                  className='float-end'
                  onClick={() => {
                    dispatch(deleteMeeting(meeting._id));
                  }}
                >
                  Ištrinti
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Card>
    );
  }
};

export default OrganisedMeetings;
