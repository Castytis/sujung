import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentTeacher } from '../../store/actions/teacher-action';
import { Card, ListGroup, ListGroupItem, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    color: white;
  }
`;

const TeacherAccount = () => {
  const dispatch = useDispatch();
  const currentTeacher = useSelector((state) => state.teachers.teacher);

  useEffect(() => {
    dispatch(getCurrentTeacher());
  }, [getCurrentTeacher]);

  if (currentTeacher !== null) {
    return (
      <Col className='d-flex justify-content-center mt-5'>
        <Card style={{ width: '26rem' }}>
          <Card.Body>
            <Card.Title>
              {currentTeacher.name + ' ' + currentTeacher.surname}
            </Card.Title>
          </Card.Body>
          <ListGroup className='list-group-flush'>
            <ListGroupItem>
              <span className='text-muted'>Mokamasis dalykas:</span>{' '}
              {currentTeacher.subject}.
            </ListGroupItem>
            <ListGroupItem>
              <span className='text-muted'>Priklausančios klasės:</span>{' '}
              {currentTeacher.classes}.
            </ListGroupItem>
            <ListGroupItem>
              <span className='text-muted'>El. paštas:</span>{' '}
              {currentTeacher.email}.
            </ListGroupItem>
            <ListGroupItem>
              <span className='text-muted'>Tel. numeris:</span>{' '}
              {currentTeacher.number}
            </ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Button variant='btn btn-outline-warning' className='float-end '>
              <StyledLink to='../meetings/me'>Mano susitikimai</StyledLink>
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  }
};

export default TeacherAccount;
