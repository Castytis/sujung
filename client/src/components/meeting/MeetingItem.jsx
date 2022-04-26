import React from 'react';
import { Col, ListGroup, ListGroupItem, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { addParticipant } from '../../store/actions/meeting-action';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    color: white;
  }
`;

const MeetingItem = (props) => {
  const dispatch = useDispatch();
  const meetingId = props.meeting._id;

  return (
    <Col className='d-flex justify-content-center mt-5'>
      <Card style={{ width: '26rem' }}>
        <Card.Body>
          <Card.Title>{props.meeting.title}</Card.Title>
        </Card.Body>
        <ListGroup className='list-group-flush'>
          <ListGroupItem>
            <span className='text-muted'>Organizuoja: </span>{' '}
            {props.meeting.organiser.name} {props.meeting.organiser.surname}
          </ListGroupItem>
          <ListGroupItem>
            <span className='text-muted'>Tikslas: </span>{' '}
            {props.meeting.subject}
          </ListGroupItem>
          <ListGroupItem>
            <span className='text-muted'>Vieta: </span> {props.meeting.location}
          </ListGroupItem>
          <ListGroupItem>
            <span className='text-muted'>Data: </span> {props.meeting.date}
          </ListGroupItem>
          <ListGroupItem>
            <span className='text-muted'>Laikas: </span> {props.meeting.time}
          </ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Button variant='outline-info'>
            <StyledLink to={`/meetings/${props.meeting._id}`}>
              Daugiau informacijos
            </StyledLink>
          </Button>
          <Button
            variant='btn btn-outline-success'
            className='float-end'
            onClick={() => dispatch(addParticipant(meetingId))}
          >
            Dalyvauti
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default MeetingItem;
