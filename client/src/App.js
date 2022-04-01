import React, { Fragment } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import './App.css';

import Landing from './components/layout/Landing';
import Layout from './components/layout/Layout';
import NavigationBar from './components/layout/NavigationBar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  return (
    <Fragment>
      <NavigationBar />
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </Fragment>
  );
}

export default App;
