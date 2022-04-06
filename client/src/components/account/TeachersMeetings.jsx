import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUsersOrganisedMeetings } from '../../store/actions/meeting-action';
import { getCurrentParticipantsMeetings } from '../../store/actions/meeting-action';
import OrganisedMeetings from './meetings/OrganisedMeetings';
import ParticipatingMeetings from './meetings/ParticipatingMeetings';

const TeachersMeetings = () => {
  const dispatch = useDispatch();
  const organisedMeetings = useSelector((state) => state.meetings.organised);
  const participantMeetings = useSelector((state) => state.meetings.meetings);

  useEffect(() => {
    dispatch(getCurrentUsersOrganisedMeetings());
  }, [getCurrentUsersOrganisedMeetings]);

  useEffect(() => {
    dispatch(getCurrentParticipantsMeetings());
  }, [getCurrentParticipantsMeetings]);

  return (
    <Row xs={1} md={2} className='g-4 m-5'>
      <Col className='d-flex justify-content-center mt-5'>
        <OrganisedMeetings />
      </Col>
      <Col className='d-flex justify-content-center mt-5'>
        <ParticipatingMeetings />
      </Col>
    </Row>
  );
};

export default TeachersMeetings;
