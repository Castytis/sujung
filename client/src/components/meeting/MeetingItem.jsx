import React from 'react';
import { Col, ListGroup, ListGroupItem, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    color: white;
  }
`;

const MeetingItem = (props) => {
  return (
    <Col className='d-flex justify-content-center mt-5'>
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
          <Button variant='outline-info'>
            <StyledLink to={`/meetings/${props.meeting._id}`}>
              Daugiau informacijos
            </StyledLink>
          </Button>
          <Button variant='btn btn-outline-success' className='float-end '>
            Dalyvauti
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default MeetingItem;
