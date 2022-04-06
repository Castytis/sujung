import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getMeetingById } from '../../store/actions/meeting-action';
import { Card, ListGroup, ListGroupItem, Col, Button } from 'react-bootstrap';
import MeetingParticipants from './MeetingParticipants';

const MeetingInfo = () => {
  let meetingId = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const meeting = useSelector((state) => state.meetings.meeting);

  useEffect(() => {
    dispatch(getMeetingById(meetingId.id));
  }, [getMeetingById]);

  if (meeting !== null) {
    const teacherParticipants = meeting.participants.teachers;
    const parentParticipants = meeting.participants.parents;

    return (
      <Col className='d-flex justify-content-center mt-5'>
        <Card style={{ width: '22rem' }}>
          <Card.Header>{meeting.title}</Card.Header>
          <Card.Body>
            <Card.Title>{meeting.subject}</Card.Title>
            <Card.Text>
              <span className='text-muted'>Organizatorius:</span>{' '}
              {meeting.organiser.name}
            </Card.Text>
          </Card.Body>
          <ListGroup className='list-group-flush'>
            <ListGroupItem>{meeting.location}</ListGroupItem>
            <ListGroupItem>{meeting.date}</ListGroupItem>
          </ListGroup>
          <Card.Header>Mokytojai dalyviai</Card.Header>
          <ListGroup className='list-group-flush'>
            {teacherParticipants.map((participant) => (
              <MeetingParticipants
                key={participant.teacher._id}
                name={participant.teacher.name}
                surname={participant.teacher.surname}
              />
            ))}
          </ListGroup>
          <Card.Header>Globėjai dalyviai</Card.Header>
          <ListGroup className='list-group-flush'>
            {parentParticipants.map((participant) => (
              <MeetingParticipants
                key={participant.parent._id}
                name={participant.parent.name}
                surname={participant.parent.surname}
              />
            ))}
          </ListGroup>
        </Card>
      </Col>
    );
  }
};

export default MeetingInfo;
