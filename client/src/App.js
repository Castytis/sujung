import React, { Fragment, useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Landing from './components/layout/Landing';
import Layout from './components/layout/Layout';
import NavigationBar from './components/layout/NavigationBar';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import { Provider } from 'react-redux';
import store from './store/store';
import setAuthToken from './token/setAuthToken';
import { loadTeacher } from './store/actions/auth-teacher-action';
import { loadParent } from './store/actions/auth-parent-action';
import TeacherList from './components/teacher/TeacherList';

import './App.css';
import Teacher from './components/teacher/Teacher';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadTeacher());
    store.dispatch(loadParent());
  }, []);

  return (
    <Fragment>
      <Provider store={store}>
        <BrowserRouter>
          <NavigationBar />
          <Layout>
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/teachers' element={<TeacherList />} />
              <Route path='/teachers/:id' element={<Teacher />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </Provider>
    </Fragment>
  );
};

export default App;
