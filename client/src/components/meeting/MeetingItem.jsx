import React from 'react';
import { Col, ListGroup, ListGroupItem, Card, Button } from 'react-bootstrap';

const MeetingItem = (props) => {
  return (
    <Col className='mt-5'>
      <Card style={{ width: '26rem' }}>
        <Card.Body>
          <Card.Title>{props.meeting.title}</Card.Title>
        </Card.Body>
        <ListGroup className='list-group-flush'>
          <ListGroupItem>{props.meeting.organiser.name}</ListGroupItem>
          <ListGroupItem>{props.meeting.subject}</ListGroupItem>
          <ListGroupItem>{props.meeting.location}</ListGroupItem>
          <ListGroupItem>{props.meeting.date}</ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Button variant='outline-info'>Dalyviai</Button>
          <Button variant='btn btn-outline-warning' className='float-end '>
            Dalyvauti
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default MeetingItem;
