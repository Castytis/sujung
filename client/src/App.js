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
import TeacherAccount from './components/account/TeacherAccount';
import ParentAccount from './components/account/ParentAccount';
import MeetingList from './components/meeting/MeetingList';
import MeetingInfo from './components/meeting/MeetingInfo';
import TeachersMeetings from './components/account/TeachersMeetings';
import MeetingForm from './components/meeting/CreateMeeting/MeetingForm';
import ParentsMeetings from './components/account/ParentsMeetings';
import TeachersMeetingList from './components/teacher/teacherMeetings/TeachersMeetingList';
import Notification from './components/layout/Notification';
import ForgotPassword from './components/password/ForgotPassword';
import ResetPassword from './components/password/ResetPassword';

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
            <Notification />
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/teachers' element={<TeacherList />} />
              <Route path='/teachers/me' element={<TeacherAccount />} />
              <Route path='/teachers/:id' element={<Teacher />} />
              <Route path='/parents/me' element={<ParentAccount />} />
              <Route path='/meetings' element={<MeetingList />} />
              <Route path='/meetings/me' element={<TeachersMeetings />} />
              <Route
                path='/meetings/parents/me'
                element={<ParentsMeetings />}
              />
              <Route path='/meetings/:id' element={<MeetingInfo />} />
              <Route path='/create' element={<MeetingForm />} />
              <Route
                path='/teachers/:id/meetings'
                element={<TeachersMeetingList />}
              />
              <Route path='/forgotpassword' element={<ForgotPassword />} />
              <Route
                path='/resetpassword/:resetLink'
                element={<ResetPassword />}
              />
            </Routes>
          </Layout>
        </BrowserRouter>
      </Provider>
    </Fragment>
  );
};

export default App;
