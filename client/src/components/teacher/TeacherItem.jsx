import React from 'react';
import { Card, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AcceptLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    color: white;
  }
`;

const TeacherItem = (props) => {
  return (
    <Col className='mt-5'>
      <Card>
        <Card.Body>
          <Card.Title>
            {props.teacher.name + ' ' + props.teacher.surname}
          </Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>
            {props.teacher.subject}
          </Card.Subtitle>
          <Card.Text>Klasės {props.teacher.classes}</Card.Text>
          <Card.Text className='mb-2 text-muted'>
            El. paštas {props.teacher.email}
          </Card.Text>
          <Button variant='' className='float-end btn btn-outline-warning'>
            <AcceptLink to={`/teachers/${props.teacher._id}`}>
              Daugiau informacijos
            </AcceptLink>
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TeacherItem;
