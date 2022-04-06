import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

const MeetingParticipants = (props) => {
  return (
    <ListGroupItem>
      {props.name} {props.surname}
    </ListGroupItem>
  );
};

export default MeetingParticipants;
