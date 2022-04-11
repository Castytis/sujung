import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #4d3e08;
  &:hover {
    color: white;
  }
`;

const Landing = () => {
  return (
    <section className='p-5 p-lg-0 pt-lg-5 text-sm-start'>
      <Container>
        <div className='d-sm-flex align-items-center justify-content-between'>
          <div>
            <h1>
              <span style={{ color: '#f68905' }}>Greitas </span> susitikimų
              planavimas
            </h1>
            <p className='lead my-4'>
              Planuokite susitikimus lengvai ir greitai su{' '}
              <span style={{ color: '#f68905' }}>sujung </span> sistema.
            </p>
            <Button variant='warning' className='btn-lg'>
              <StyledLink to='register'> Registracija </StyledLink>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Landing;
