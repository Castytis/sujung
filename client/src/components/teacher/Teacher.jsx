import React, { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherById } from '../../store/actions/teacher-action';
import { Card, ListGroup, ListGroupItem, Col, Button } from 'react-bootstrap';

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
              <span className='text-muted'>Mokamasis dalykas:</span>{' '}
              {teacher.subject}.
            </ListGroupItem>
            <ListGroupItem>
              <span className='text-muted'>Priklausančios klasės:</span>{' '}
              {teacher.classes}.
            </ListGroupItem>
            <ListGroupItem>
              <span className='text-muted'>El. paštas:</span> {teacher.email}.
            </ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Button variant='outline-info' onClick={() => navigate(-1)}>
              Grįžti atgal
            </Button>
            <Button variant='btn btn-outline-warning' className='float-end '>
              Mokytojo susitikimai
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  }
};

export default Teacher;
