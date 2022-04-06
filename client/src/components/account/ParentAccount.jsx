import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentParent } from '../../store/actions/parent-actions';
import { Card, ListGroup, ListGroupItem, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ParentAccount = () => {
  const dispatch = useDispatch();
  const currentParent = useSelector((state) => state.parents.parent);

  useEffect(() => {
    dispatch(getCurrentParent());
  }, [getCurrentParent]);

  if (currentParent !== null) {
    return (
      <Col className='d-flex justify-content-center mt-5'>
        <Card style={{ width: '26rem' }}>
          <Card.Body>
            <Card.Title>
              {currentParent.name + ' ' + currentParent.surname}
            </Card.Title>
          </Card.Body>
          <ListGroup className='list-group-flush'>
            <ListGroupItem>
              <span className='text-muted'>Mokyniai</span>{' '}
              {currentParent.childName}.
            </ListGroupItem>
            <ListGroupItem>
              <span className='text-muted'>El. paštas:</span>{' '}
              {currentParent.email}.
            </ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Button variant='outline-info'>Keisti informaciją</Button>
            <Button variant='btn btn-outline-warning' className='float-end '>
              Mokytojo susitikimai
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  }
};

export default ParentAccount;
