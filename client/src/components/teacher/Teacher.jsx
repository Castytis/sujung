import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherById } from '../../store/actions/teacher-action';
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

const Teacher = () => {
  let teacherId = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const teacher = useSelector((state) => state.teachers.teacher);

  useEffect(() => {
    dispatch(getTeacherById(teacherId.id));
  }, [getTeacherById]);

  if (teacher !== null) {
    return (
      <Col className='d-flex justify-content-center mt-5'>
        <Card style={{ width: '22rem' }}>
          <Card.Body>
            <Card.Title>{teacher.name + ' ' + teacher.surname}</Card.Title>
          </Card.Body>
          <ListGroup className='list-group-flush'>
            <ListGroupItem>
              <span className='text-muted'>Mokomas dalykas:</span>{' '}
              {teacher.subject}.
            </ListGroupItem>
            <ListGroupItem>
              <span className='text-muted'>Priklausančios klasės:</span>{' '}
              {teacher.classes}.
            </ListGroupItem>
            <ListGroupItem>
              <span className='text-muted'>El. paštas:</span> {teacher.email}.
            </ListGroupItem>
            <ListGroupItem>
              <span className='text-muted'>Tel. numeris:</span> {teacher.number}
            </ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Button variant='outline-info' onClick={() => navigate(-1)}>
              Grįžti atgal
            </Button>
            <Button variant='btn btn-outline-warning' className='float-end '>
              <StyledLink to='meetings'>Mokytojo susitikimai</StyledLink>
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  }
};

export default Teacher;
