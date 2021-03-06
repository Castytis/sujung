import React from 'react';
import { Card, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    color: white;
  }
`;

const TeacherItem = (props) => {
  return (
    <Col className='mt-5'>
      <Card style={{ width: '26rem' }}>
        <Card.Body>
          <Card.Title>
            {props.teacher.name + ' ' + props.teacher.surname}
          </Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>
            {props.teacher.subject}
          </Card.Subtitle>
          <Card.Text>Klasės {props.teacher.classes}</Card.Text>
          <Button variant='' className='float-start btn btn-outline-warning'>
            <StyledLink to={`/teachers/${props.teacher._id}`}>
              Daugiau informacijos
            </StyledLink>
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TeacherItem;
