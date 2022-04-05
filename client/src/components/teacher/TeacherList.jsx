import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTeachers } from '../../store/actions/teacher-action';
import { Card, Col, Row } from 'react-bootstrap';

const TeacherList = () => {
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.teachers.teachers);

  useEffect(() => {
    dispatch(getAllTeachers());
  }, []);

  return (
    <Row xs={1} md={2} className='g-4'>
      {teachers.map((teacher, index) => (
        <Col className='mt-5'>
          <Card>
            <Card.Body>
              <Card.Title>{teacher.name + ' ' + teacher.surname}</Card.Title>
              <Card.Subtitle className='mb-2 text-muted'>
                {teacher.subject}
              </Card.Subtitle>
              <Card.Text>Klasės {teacher.classes}</Card.Text>
              <Card.Text className='mb-2 text-muted'>
                El. paštas {teacher.email}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default TeacherList;
