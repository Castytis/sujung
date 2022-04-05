import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTeachers } from '../../store/actions/teacher-action';
import { Row } from 'react-bootstrap';
import TeacherItem from './TeacherItem';

const TeacherList = () => {
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.teachers.teachers);

  useEffect(() => {
    dispatch(getAllTeachers());
  }, []);

  return (
    <Row xs={1} md={2} className='g-4'>
      {teachers.map((teacher) => (
        <TeacherItem key={teacher._id} teacher={teacher} />
      ))}
    </Row>
  );
};

export default TeacherList;
