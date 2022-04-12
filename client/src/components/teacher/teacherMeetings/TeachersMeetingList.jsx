import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card, ListGroup, ListGroupItem, Col, Row } from 'react-bootstrap';

const TeachersMeetingList = () => {
  const meetings = useSelector((state) => state.meetings.meetings);
  const teacherId = useParams();

  let teachersMeetings = [];

  if (meetings.length > 0) {
    teachersMeetings = meetings.filter((meeting) => {
      return meeting.organiser._id === teacherId.id;
    });
  }

  if (teachersMeetings.length > 0) {
    return (
      <Row xs={1} md={2} className='g-4'>
        {teachersMeetings.map((meeting) => (
          <Col className='d-flex justify-content-center mt-5'>
            <Card style={{ width: '22rem' }}>
              <Card.Body>
                <Card.Title>{meeting.title}</Card.Title>
              </Card.Body>
              <ListGroup className='list-group-flush'>
                <ListGroupItem>
                  <span className='text-muted'>Tikslas:</span> {meeting.subject}
                </ListGroupItem>
                <ListGroupItem>
                  <span className='text-muted'>Data:</span> {meeting.date}
                </ListGroupItem>
                <ListGroupItem>
                  <span className='text-muted'>Laikas:</span> {meeting.time}
                </ListGroupItem>
                <ListGroupItem>
                  <span className='text-muted'>Vieta:</span> {meeting.location}
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
  if (teachersMeetings.length === 0) {
    return (
      <Row className='g-4'>
        <Col className='d-flex justify-content-center mt-5'>
          <Card style={{ width: '22rem' }}>
            <Card.Body>
              <Card.Title>Mokytojas neturi susitikimų</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
};

export default TeachersMeetingList;
