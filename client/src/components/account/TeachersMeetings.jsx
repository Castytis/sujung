import React, { useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUsersOrganisedMeetings } from '../../store/actions/meeting-action';
import { getCurrentParticipantsMeetings } from '../../store/actions/meeting-action';
import OrganisedMeetings from './meetings/OrganisedMeetings';
import ParticipatingMeetings from './meetings/ParticipatingMeetings';

const TeachersMeetings = () => {
  const dispatch = useDispatch();
  const organisedMeetings = useSelector((state) => state.meetings.organised);
  const participantMeetings = useSelector(
    (state) => state.meetings.participated
  );

  useEffect(() => {
    dispatch(getCurrentUsersOrganisedMeetings());
  }, [getCurrentUsersOrganisedMeetings]);

  useEffect(() => {
    dispatch(getCurrentParticipantsMeetings());
  }, [getCurrentParticipantsMeetings]);

  return (
    <Row xs={1} md={2} className='g-4 m-5 ' style={{ width: '90rem' }}>
      <Col className='justify-content-center mt-5'>
        <Card style={{ width: '26rem' }}>
          {!organisedMeetings.length > 0 ? (
            <Card.Title className='text-center' style={{ width: '26rem' }}>
              Orgazijuomų susitikimų nėra
            </Card.Title>
          ) : (
            <OrganisedMeetings meeting={organisedMeetings} />
          )}
        </Card>
      </Col>

      <Col className='justify-content-center mt-5'>
        <Card style={{ width: '26rem' }}>
          {!participantMeetings.length > 0 ? (
            <Card.Title className='text-center' style={{ width: '26rem' }}>
              Nėra susitikimų, kuriuose dalyvaujate
            </Card.Title>
          ) : (
            <ParticipatingMeetings meeting={participantMeetings} />
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default TeachersMeetings;
