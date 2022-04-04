import React, { Fragment } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import './App.css';

import Landing from './components/layout/Landing';
import Layout from './components/layout/Layout';
import NavigationBar from './components/layout/NavigationBar';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import ErrorAlert from './components/error/ErrorAlert';

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <NavigationBar />
        <ErrorAlert />
        <Layout>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
