import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMeetings } from '../../store/actions/meeting-action';
import MeetingItem from './MeetingItem';
import { Row } from 'react-bootstrap';

const MeetingList = () => {
  const dispatch = useDispatch();
  const meetings = useSelector((state) => state.meetings.meetings);

  useEffect(() => {
    dispatch(getAllMeetings());
  }, []);

  return (
    <Row xs={1} md={2} className='g-4'>
      {meetings.map((meeting) => (
        <MeetingItem key={meeting._id} meeting={meeting} />
      ))}
    </Row>
  );
};

export default MeetingList;
