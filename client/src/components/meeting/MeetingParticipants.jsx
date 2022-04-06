import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

const MeetingParticipants = (props) => {
  return <ListGroupItem>{props.participant.name}</ListGroupItem>;
};

export default MeetingParticipants;
