import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentParent } from '../../store/actions/parent-actions';
import { Card, ListGroup, ListGroupItem, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    color: white;
  }
`;

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
              <span className='text-muted'>El. paštas:</span>{' '}
              {currentParent.email}.
            </ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Button variant='btn btn-outline-warning' className='float-end '>
              <StyledLink to='..//meetings/parents/me'>
                Mano susitikimai
              </StyledLink>
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  }
};

export default ParentAccount;
