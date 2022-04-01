import React, { Fragment } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Landing from './components/layout/Landing';
import Layout from './components/layout/Layout';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  return (
    <Fragment>
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
