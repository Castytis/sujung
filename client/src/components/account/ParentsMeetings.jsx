import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentParticipantsMeetings } from '../../store/actions/meeting-action';
import ParticipatingMeetings from './meetings/ParticipatingMeetings';
import { Card } from 'react-bootstrap';

const ParentsMeetings = () => {
  const dispatch = useDispatch();
  const participantMeetings = useSelector((state) => state.meetings.meetings);

  useEffect(() => {
    dispatch(getCurrentParticipantsMeetings());
  }, [getCurrentParticipantsMeetings]);

  return (
    <Container className='d-flex justify-content-center mt-5'>
      {!participantMeetings.length > 0 ? (
        <Card.Title className='text-center'>
          Nėra susitikimų, kuriuose dalyvaujate
        </Card.Title>
      ) : (
        <ParticipatingMeetings meeting={participantMeetings} />
      )}
    </Container>
  );
};

export default ParentsMeetings;
