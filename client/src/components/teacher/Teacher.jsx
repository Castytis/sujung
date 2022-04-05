import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherById } from '../../store/actions/teacher-action';

const Teacher = () => {
  let { teacherId } = useParams();
  const dispatch = useDispatch();
  const teacher = useSelector((state) => state.teachers.teachers);

  useEffect(() => {
    dispatch(getTeacherById(teacherId));
  }, [getTeacherById]);

  console.log(teacher);

  return <div>Teacher</div>;
};

export default Teacher;
