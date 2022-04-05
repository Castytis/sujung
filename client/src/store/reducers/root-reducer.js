import { combineReducers } from 'redux';
import authenticateTeacher from './auth-teacher-reducer';
import authenticateParent from './auth-parent-reducer';

export default combineReducers({
  authenticateTeacher,
  authenticateParent,
});
